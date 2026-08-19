import agencyCardBanner from './agency_card_banner_1785772861093.jpg';
import agencyPosterDark from './agency_poster_dark_1785772843834.jpg';
import bhutanTigersNest from './bhutan_tigers_nest_1785681037397.jpg';
import darjeelingTeaGardens from './darjeeling_tea_gardens_1785681013467.jpg';
import darjeelingToyTrain from './darjeeling_toy_train_1785681122611.jpg';
import gmbOfficePhoto from './gmb_office_photo_1786168516883.jpg';
import googleReviewBadge from './google_review_badge_1785772879766.jpg';
import innovaCrystaCab from './innova_crysta_cab_1785680577329.jpg';
import innovaMountainDrive from './innova_mountain_drive_1785681104445.jpg';
import nathulaPassSnow from './nathula_pass_snow_1785681052944.jpg';
import ravanglaBuddhaPark from './ravangla_buddha_park_1785680605794.jpg';
import sikkimHeroBanner from './sikkim_hero_banner_1785680563996.jpg';
import yumthangZeroPoint from './yumthang_zero_point_1785680592273.jpg';
import officialLogo from './official_logo.jpg';
import offbeatDestinationLogoSvg from './offbeat_destination_logo.svg';

export {
  agencyCardBanner,
  agencyPosterDark,
  bhutanTigersNest,
  darjeelingTeaGardens,
  darjeelingToyTrain,
  gmbOfficePhoto,
  googleReviewBadge,
  innovaCrystaCab,
  innovaMountainDrive,
  nathulaPassSnow,
  ravanglaBuddhaPark,
  sikkimHeroBanner,
  yumthangZeroPoint,
  officialLogo,
  offbeatDestinationLogoSvg,
};

// Canonical single fallback image for all error states
export const DEFAULT_FALLBACK_IMAGE = innovaCrystaCab;

// Map of image filenames and legacy paths to imported asset URLs
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
  
  // /src/assets/images/ legacy paths
  '/src/assets/images/agency_card_banner_1785772861093.jpg': agencyCardBanner,
  '/src/assets/images/agency_poster_dark_1785772843834.jpg': agencyPosterDark,
  '/src/assets/images/bhutan_tigers_nest_1785681037397.jpg': bhutanTigersNest,
  '/src/assets/images/darjeeling_tea_gardens_1785681013467.jpg': darjeelingTeaGardens,
  '/src/assets/images/darjeeling_toy_train_1785681122611.jpg': darjeelingToyTrain,
  '/src/assets/images/gmb_office_photo_1786168516883.jpg': gmbOfficePhoto,
  '/src/assets/images/google_review_badge_1785772879766.jpg': googleReviewBadge,
  '/src/assets/images/innova_crysta_cab_1785680577329.jpg': innovaCrystaCab,
  '/src/assets/images/innova_mountain_drive_1785681104445.jpg': innovaMountainDrive,
  '/src/assets/images/nathula_pass_snow_1785681052944.jpg': nathulaPassSnow,
  '/src/assets/images/ravangla_buddha_park_1785680605794.jpg': ravanglaBuddhaPark,
  '/src/assets/images/sikkim_hero_banner_1785680563996.jpg': sikkimHeroBanner,
  '/src/assets/images/yumthang_zero_point_1785680592273.jpg': yumthangZeroPoint,
  '/src/assets/images/official_logo.jpg': officialLogo,
  '/src/assets/images/offbeat_destination_logo.svg': offbeatDestinationLogoSvg,
};

/**
 * Safely resolves an image path or returns the imported Vite asset
 */
export const resolveImage = (path?: string | null): string => {
  if (!path) return DEFAULT_FALLBACK_IMAGE;
  if (IMAGE_MAP[path]) return IMAGE_MAP[path];
  
  // Check if filename without path matches
  const filename = path.split('/').pop();
  if (filename && IMAGE_MAP[filename]) return IMAGE_MAP[filename];
  
  return path;
};
