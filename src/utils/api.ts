export interface RetryOptions {
  /** Maximum number of retry attempts (default: 3) */
  retries?: number;
  /** Initial backoff delay in milliseconds (default: 1000) */
  initialDelayMs?: number;
  /** Exponential backoff multiplier factor (default: 2) */
  backoffFactor?: number;
  /** Maximum delay cap in milliseconds (default: 10000) */
  maxDelayMs?: number;
  /** HTTP status codes that trigger a retry (default: 429, 500, 502, 503, 504) */
  retryOnStatusCodes?: number[];
  /** Optional callback fired before each retry attempt */
  onRetry?: (attempt: number, error: unknown, delayMs: number) => void;
}

/**
 * Executes a network fetch request with automatic exponential backoff retry logic.
 * Handles transient network hiccups, server 5xx errors, and rate-limit HTTP 429 responses.
 */
export async function fetchWithRetry(
  url: string,
  options: RequestInit = {},
  retryOptions: RetryOptions = {}
): Promise<Response> {
  const {
    retries = 3,
    initialDelayMs = 1000,
    backoffFactor = 2,
    maxDelayMs = 10000,
    retryOnStatusCodes = [429, 500, 502, 503, 504],
    onRetry,
  } = retryOptions;

  let attempt = 0;
  let currentDelay = initialDelayMs;

  while (true) {
    try {
      const response = await fetch(url, options);

      // If response is successful, or if it's a non-retryable status code, or if retries are exhausted
      if (response.ok || !retryOnStatusCodes.includes(response.status) || attempt >= retries) {
        return response;
      }

      attempt++;
      const delay = Math.min(currentDelay, maxDelayMs);
      if (onRetry) {
        onRetry(attempt, new Error(`HTTP ${response.status}: ${response.statusText}`), delay);
      } else {
        console.warn(`[fetchWithRetry] Attempt ${attempt}/${retries} failed (${response.status}). Retrying in ${delay}ms...`);
      }
      await new Promise((resolve) => setTimeout(resolve, delay));
      currentDelay *= backoffFactor;
    } catch (err) {
      if (attempt >= retries) {
        throw err;
      }

      attempt++;
      const delay = Math.min(currentDelay, maxDelayMs);
      if (onRetry) {
        onRetry(attempt, err, delay);
      } else {
        console.warn(`[fetchWithRetry] Attempt ${attempt}/${retries} network error. Retrying in ${delay}ms...`, err);
      }
      await new Promise((resolve) => setTimeout(resolve, delay));
      currentDelay *= backoffFactor;
    }
  }
}
