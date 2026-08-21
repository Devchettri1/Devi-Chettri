export const agencyCardBanner = '/images/agency_card_banner_1785772861093.jpg';
export const agencyPosterDark = '/images/agency_poster_dark_1785772843834.jpg';
export const bhutanTigersNest = '/images/bhutan_tigers_nest_1785681037397.jpg';
export const darjeelingTeaGardens = '/images/darjeeling_tea_gardens_1785681013467.jpg';
export const darjeelingToyTrain = '/images/darjeeling_toy_train_1785681122611.jpg';
export const gmbOfficePhoto = '/images/gmb_office_photo_1786168516883.jpg';
export const googleReviewBadge = '/images/google_review_badge_1785772879766.jpg';
export const innovaCrystaCab = '/images/innova_crysta_cab_1785680577329.jpg';
export const innovaMountainDrive = '/images/innova_mountain_drive_1785681104445.jpg';
export const nathulaPassSnow = '/images/nathula_pass_snow_1785681052944.jpg';
export const ravanglaBuddhaPark = '/images/ravangla_buddha_park_1785680605794.jpg';
export const sikkimHeroBanner = '/images/sikkim_hero_banner_1785680563996.jpg';
export const yumthangZeroPoint = '/images/yumthang_zero_point_1785680592273.jpg';
export const officialLogo = '/images/official_logo.jpg';
export const offbeatDestinationLogoSvg = '/images/offbeat_destination_logo.svg';
export const placeholderImage = '/images/placeholder.webp';

export {
  agencyCardBanner as defaultAgencyCardBanner,
  placeholderImage as defaultPlaceholder,
};

// Canonical single fallback image for all error states
export const DEFAULT_FALLBACK_IMAGE = '/images/placeholder.webp';

// Map of image filenames and legacy paths to asset URLs
export const IMAGE_MAP: Record<string, string> = {
  'agency_card_banner_1785772861093.jpg': agencyCardBanner,
  'agency_poster_dark_1785772843834.jpg': agencyPosterDark,
  'bhutan_tigers_nest_1785681037397.jpg': bhutanTigersNest,
  'darjeeling_tea_gardens_1785681013467.jpg': darjeelingTeaGardens,
  'darjeeling_toy_train_1785681122611.jpg': darjeelingToyTrain,
  'gmb_office_photo_1786168516883.jpg': gmbOfficePhoto,
  'google_review_badge_1785772879766.jpg': googleReviewBadge,
  'innova_crysta_cab_1785680577329.jpg': innovaCrystaCab,
  'innova_mountain_drive_1785681104445.jpg': innovaMountainDrive,
  'nathula_pass_snow_1785681052944.jpg': nathulaPassSnow,
  'ravangla_buddha_park_1785680605794.jpg': ravanglaBuddhaPark,
  'sikkim_hero_banner_1785680563996.jpg': sikkimHeroBanner,
  'yumthang_zero_point_1785680592273.jpg': yumthangZeroPoint,
  'official_logo.jpg': officialLogo,
  'offbeat_destination_logo.svg': offbeatDestinationLogoSvg,
  'placeholder.webp': placeholderImage,
  'placeholder.svg': '/images/placeholder.svg',

  // Also index with path prefixes
  '/images/agency_card_banner_1785772861093.jpg': agencyCardBanner,
  '/images/agency_poster_dark_1785772843834.jpg': agencyPosterDark,
  '/images/bhutan_tigers_nest_1785681037397.jpg': bhutanTigersNest,
  '/images/darjeeling_tea_gardens_1785681013467.jpg': darjeelingTeaGardens,
  '/images/darjeeling_toy_train_1785681122611.jpg': darjeelingToyTrain,
  '/images/gmb_office_photo_1786168516883.jpg': gmbOfficePhoto,
  '/images/google_review_badge_1785772879766.jpg': googleReviewBadge,
  '/images/innova_crysta_cab_1785680577329.jpg': innovaCrystaCab,
  '/images/innova_mountain_drive_1785681104445.jpg': innovaMountainDrive,
  '/images/nathula_pass_snow_1785681052944.jpg': nathulaPassSnow,
  '/images/ravangla_buddha_park_1785680605794.jpg': ravanglaBuddhaPark,
  '/images/sikkim_hero_banner_1785680563996.jpg': sikkimHeroBanner,
  '/images/yumthang_zero_point_1785680592273.jpg': yumthangZeroPoint,
  '/images/official_logo.jpg': officialLogo,
  '/images/offbeat_destination_logo.svg': offbeatDestinationLogoSvg,
  '/images/placeholder.webp': placeholderImage,
  '/images/placeholder.svg': '/images/placeholder.svg',
};

/**
 * Safely resolves an image path or returns the public asset URL
 */
export const resolveImage = (path?: string | null): string => {
  if (!path) return DEFAULT_FALLBACK_IMAGE;

  // If path is a data URI or blob URI, return as-is
  if (path.startsWith('data:') || path.startsWith('blob:')) {
    return path;
  }

  // Exact lookup in IMAGE_MAP
  if (IMAGE_MAP[path]) return IMAGE_MAP[path];

  // Convert old /src/assets/images/... to /images/...
  if (path.startsWith('/src/assets/images/')) {
    const filename = path.replace('/src/assets/images/', '');
    return `/images/${filename}`;
  }

  // Check if filename without path matches IMAGE_MAP
  const filename = path.split('/').pop();
  if (filename && IMAGE_MAP[filename]) return IMAGE_MAP[filename];

  return path;
};
