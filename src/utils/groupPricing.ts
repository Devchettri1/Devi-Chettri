export type GroupSizeOption = 'solo' | 'couple' | 'family' | 'large_group';

export interface GroupSizeConfig {
  id: GroupSizeOption;
  label: string;
  shortLabel: string;
  paxCount: number;
  paxLabel: string;
  description: string;
  priceMultiplier: number;
  savingsPercent: number;
  vehicleType: string;
  roomsDescription: string;
  badge?: string;
  minPaxNotice?: string;
}

export const GROUP_SIZE_CONFIGS: Record<GroupSizeOption, GroupSizeConfig> = {
  solo: {
    id: 'solo',
    label: 'Solo Traveler',
    shortLabel: 'Solo (Min 2pax Base)',
    paxCount: 2, // Minimum 2 Pax Base
    paxLabel: '1 Pax (Min 2pax Base)',
    description: 'Permits & private vehicle require Min. 2 Pax base (or join shared cab)',
    priceMultiplier: 1.08,
    savingsPercent: 0,
    vehicleType: 'Private Sedan / Shared SUV',
    roomsDescription: '1 Single/Double Room',
    badge: 'Min 2pax Base',
    minPaxNotice: 'Minimum 2 Pax base applies for private vehicle & border permits',
  },
  couple: {
    id: 'couple',
    label: 'Couple / Duo',
    shortLabel: 'Couple (2 Pax)',
    paxCount: 2,
    paxLabel: '2 Adults (Standard Base)',
    description: 'Standard private tour with dedicated SUV & 1 Double Room',
    priceMultiplier: 1.0,
    savingsPercent: 0,
    vehicleType: 'Dedicated Innova / Xylo / Dzire',
    roomsDescription: '1 Double Room (Twin Sharing)',
    badge: 'Standard 2 Pax Base',
    minPaxNotice: 'Standard 2 Pax base',
  },
  family: {
    id: 'family',
    label: 'Small Family',
    shortLabel: 'Family (3–4 Pax)',
    paxCount: 4,
    paxLabel: '3–4 Travelers',
    description: 'Vehicle cost split across 4 pax + 2 Double Rooms / Family Suite',
    priceMultiplier: 0.86,
    savingsPercent: 14,
    vehicleType: 'Dedicated Toyota Innova Crysta',
    roomsDescription: '2 Double Rooms',
    badge: 'Save 14%',
    minPaxNotice: 'Economical 4 Pax group tier',
  },
  large_group: {
    id: 'large_group',
    label: 'Large Group',
    shortLabel: 'Large Group (5–8+ Pax)',
    paxCount: 7,
    paxLabel: '5–8+ Travelers',
    description: 'Max volume savings on luxury SUV fleet / Tempo Traveller',
    priceMultiplier: 0.76,
    savingsPercent: 24,
    vehicleType: 'Innova Crystas / Luxury Tempo Traveller',
    roomsDescription: '3–4 Double Rooms',
    badge: 'Save 24%',
    minPaxNotice: 'Maximum group savings tier',
  },
};

export function calculateGroupPrice(basePrice: number, groupSize: GroupSizeOption): number {
  if (!basePrice || isNaN(basePrice)) return 0;
  const config = GROUP_SIZE_CONFIGS[groupSize] || GROUP_SIZE_CONFIGS.couple;
  return Math.round((basePrice * config.priceMultiplier) / 50) * 50;
}

export function calculateTotalGroupCost(perPersonPrice: number, groupSize: GroupSizeOption): number {
  if (!perPersonPrice || isNaN(perPersonPrice)) return 0;
  const config = GROUP_SIZE_CONFIGS[groupSize] || GROUP_SIZE_CONFIGS.couple;
  return perPersonPrice * config.paxCount;
}
