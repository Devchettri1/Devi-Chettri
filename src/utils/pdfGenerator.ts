import { jsPDF } from 'jspdf';
import { TourPackage, GeneratedItinerary, GeneratedItineraryDay, QuotationItem } from '../types';
import { AGENCY_DETAILS } from '../data/travelData';

export interface PDFCustomOptions {
  travelerName?: string;
  travelerPhone?: string;
  travelerEmail?: string;
  travelDates?: string;
  travelersCount?: number;
  hotelTier?: 'deluxe' | 'premium' | 'luxury' | string;
  vehiclePreference?: string;
  mealPreference?: string;
  specialRequests?: string;
  calculatedPricePerPerson?: number;
  totalGroupPrice?: number;
}

// Helper to sanitize filenames
function sanitizeFileName(title: string): string {
  return `${title.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 40)}_OffbeatDestination_Itinerary.pdf`;
}

// Draw the master luxury header on any page
function drawBrandHeader(doc: jsPDF, pageWidth: number, margin: number, isFirstPage: boolean) {
  if (isFirstPage) {
    // Primary Midnight Blue Top Banner
    doc.setFillColor(10, 17, 40); // #0A1128
    doc.rect(0, 0, pageWidth, 36, 'F');

    // Golden Accent Line below header
    doc.setFillColor(245, 158, 11); // #F59E0B
    doc.rect(0, 36, pageWidth, 1.8, 'F');

    // Brand Title
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text('OFFBEAT DESTINATION TRAVELS', margin, 13);

    // Tagline in Golden Amber
    doc.setTextColor(253, 224, 71); // amber-300
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(9);
    doc.text('— "A Better Way to Explore" —', margin, 19);

    // Registration & Contact Details
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(203, 213, 225); // slate-300
    doc.text(`Govt. Regd. Travel Agency: ${AGENCY_DETAILS.licenseNo} | Gangtok Head Office`, margin, 25);
    doc.text(`24x7 Concierge: ${AGENCY_DETAILS.phonePrimary} | WhatsApp: +91 62961 02341 | Email: ${AGENCY_DETAILS.email}`, margin, 30);

    // Official Certified Stamp Badge on right side
    const stampX = pageWidth - margin - 42;
    doc.setFillColor(6, 182, 212); // cyan-500
    doc.roundedRect(stampX, 7, 42, 22, 2, 2, 'F');
    
    doc.setFillColor(10, 17, 40);
    doc.roundedRect(stampX + 0.8, 7.8, 40.4, 20.4, 1.6, 1.6, 'F');

    doc.setTextColor(6, 182, 212);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.text('OFFICIAL ITINERARY', stampX + 21, 13, { align: 'center' });

    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.text('VERIFIED TRIP', stampX + 21, 18, { align: 'center' });

    doc.setTextColor(253, 224, 71);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.5);
    doc.text('100% PERMIT CLEARANCE', stampX + 21, 23, { align: 'center' });
  }
}

// Draw Page Footer with page numbering
function drawBrandFooter(doc: jsPDF, pageWidth: number, pageHeight: number, margin: number, pageNum: number, totalPages: number) {
  // Footer divider line
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.4);
  doc.line(margin, pageHeight - 12, pageWidth - margin, pageHeight - 12);

  // Footer text
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(100, 116, 139);
  doc.text(
    `OffbeatDestination Travels • Rashmi Prasad Alley Margh, Gangtok, Sikkim 737101 • Helpline: +91 62961 02341`,
    margin,
    pageHeight - 7
  );

  doc.setFont('helvetica', 'bold');
  doc.text(`Page ${pageNum} of ${totalPages}`, pageWidth - margin, pageHeight - 7, { align: 'right' });
}

/**
 * Generate a pristine, branded PDF for a standard or customized Tour Package
 */
export const generatePackageItineraryPDF = (
  pkg: TourPackage,
  options?: PDFCustomOptions
) => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;
  let yPos = 44;

  const checkPageBreak = (neededHeight: number) => {
    if (yPos + neededHeight > pageHeight - 16) {
      doc.addPage();
      yPos = 18;
      // Secondary page subtle header
      doc.setFillColor(10, 17, 40);
      doc.rect(0, 0, pageWidth, 10, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.text(`OffbeatDestination Travels — ${pkg.title}`, margin, 7);
      doc.setTextColor(245, 158, 11);
      doc.text(`Booking: +91 62961 02341`, pageWidth - margin, 7, { align: 'right' });
      yPos = 16;
    }
  };

  // Draw Header
  drawBrandHeader(doc, pageWidth, margin, true);

  // 1. Tour Package Title Banner
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(15);
  doc.setTextColor(15, 23, 42); // slate-900
  const titleLines = doc.splitTextToSize(pkg.title, contentWidth);
  doc.text(titleLines, margin, yPos);
  yPos += titleLines.length * 6 + 1;

  // Subtitle / Location & Duration
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(71, 85, 105);
  doc.text(`Destination: ${pkg.location}  |  Duration: ${pkg.duration}  |  Category: ${pkg.category}`, margin, yPos);
  yPos += 6;

  // 2. Client Customization & Trip Summary Box
  checkPageBreak(32);
  doc.setFillColor(248, 250, 252); // slate-50
  doc.setDrawColor(203, 213, 225); // slate-300
  doc.setLineWidth(0.3);
  doc.roundedRect(margin, yPos, contentWidth, 26, 2, 2, 'FD');

  const colWidth = contentWidth / 3;

  // Col 1: Traveler Details
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text('TRAVELER PROFILE', margin + 4, yPos + 5);
  
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(15, 23, 42);
  doc.text(options?.travelerName || 'Valued Traveler', margin + 4, yPos + 10);
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(71, 85, 105);
  doc.text(`Dates: ${options?.travelDates || 'Flexible / As Confirmed'}`, margin + 4, yPos + 15);
  doc.text(`Group Size: ${options?.travelersCount || 2} Persons`, margin + 4, yPos + 20);

  // Col 2: Accommodation & Meal Plan
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text('HOTEL & MEAL PLAN', margin + colWidth + 4, yPos + 5);

  const selectedTierName = options?.hotelTier
    ? `${options.hotelTier.toUpperCase()} CATEGORY`
    : 'PREMIUM 3★ CATEGORY';

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(6, 95, 70); // emerald-800
  doc.text(selectedTierName, margin + colWidth + 4, yPos + 10);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(71, 85, 105);
  doc.text(`Meals: ${options?.mealPreference || 'MAP (Breakfast & Dinner)'}`, margin + colWidth + 4, yPos + 15);
  doc.text('Hotel Type: Mountain View Deluxe / Luxury', margin + colWidth + 4, yPos + 20);

  // Col 3: Vehicle & Price Estimate
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text('VEHICLE & TARIFF ESTIMATE', margin + colWidth * 2 + 4, yPos + 5);

  const perPersonPrice = options?.calculatedPricePerPerson || pkg.priceStarting;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(3, 105, 161); // cyan-700
  doc.text(`₹${perPersonPrice.toLocaleString('en-IN')} / person`, margin + colWidth * 2 + 4, yPos + 10);

  const groupTotal = options?.totalGroupPrice || perPersonPrice * (options?.travelersCount || 2);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(71, 85, 105);
  doc.text(`Group Total: ₹${groupTotal.toLocaleString('en-IN')} (incl. tax)`, margin + colWidth * 2 + 4, yPos + 15);
  doc.text(`Cab: ${options?.vehiclePreference || 'Toyota Innova Crysta / Scorpio'}`, margin + colWidth * 2 + 4, yPos + 20);

  yPos += 30;

  // 3. Mandatory High-Altitude / Permit Notice if applicable
  const isNorthSikkim =
    pkg.title.toLowerCase().includes('north') ||
    pkg.title.toLowerCase().includes('lachung') ||
    pkg.title.toLowerCase().includes('gurudongmar') ||
    pkg.location.toLowerCase().includes('north');

  if (isNorthSikkim || pkg.permitsRequired) {
    checkPageBreak(16);
    doc.setFillColor(254, 243, 199); // amber-100
    doc.setDrawColor(245, 158, 11); // amber-500
    doc.setLineWidth(0.3);
    doc.roundedRect(margin, yPos, contentWidth, 13, 1.5, 1.5, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(180, 83, 9); // amber-700
    doc.text('OFFICIAL SIKKIM TOURISM & ARMY PERMIT PROTOCOL:', margin + 4, yPos + 4.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(120, 53, 15);
    doc.text(
      'Protected Area Permits (PAP) for Tsomgo Lake, Nathula Pass, Lachen & Lachung are arranged 100% by our Gangtok office. All travelers must carry original Voter ID or Passport + 4 passport photos.',
      margin + 4,
      yPos + 8.5
    );

    yPos += 16;
  }

  // 4. Tour Highlights Pill Summary
  if (pkg.highlights && pkg.highlights.length > 0) {
    checkPageBreak(18);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(15, 23, 42);
    doc.text('SIGNATURE TOUR HIGHLIGHTS', margin, yPos);
    yPos += 4;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(51, 65, 85);

    const highlightsText = pkg.highlights.map(h => `• ${h}`).join('   ');
    const hlLines = doc.splitTextToSize(highlightsText, contentWidth);
    doc.text(hlLines, margin, yPos);
    yPos += hlLines.length * 4 + 4;
  }

  // 5. Detailed Day-by-Day Itinerary
  checkPageBreak(12);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(15, 23, 42);
  doc.text('DETAILED DAY-WISE ITINERARY', margin, yPos);
  doc.setDrawColor(6, 182, 212); // cyan-500
  doc.setLineWidth(0.6);
  doc.line(margin, yPos + 1.5, margin + 55, yPos + 1.5);
  yPos += 7;

  pkg.itinerary.forEach((day) => {
    const descLines = doc.splitTextToSize(day.description, contentWidth - 14);
    const neededDayHeight = 8 + descLines.length * 3.8 + 6;

    checkPageBreak(neededDayHeight);

    // Day Number Badge
    doc.setFillColor(10, 17, 40); // slate-900
    doc.roundedRect(margin, yPos, 14, 5.5, 1, 1, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.text(`DAY ${day.day}`, margin + 2, yPos + 3.8);

    // Day Title
    doc.setTextColor(15, 23, 42);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    const dayTitleTruncated = doc.splitTextToSize(day.title, contentWidth - 18)[0] || day.title;
    doc.text(dayTitleTruncated, margin + 17, yPos + 4);

    yPos += 7;

    // Day Description
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.8);
    doc.setTextColor(51, 65, 85);
    doc.text(descLines, margin + 3, yPos);
    yPos += descLines.length * 3.8 + 2;

    // Subtle divider between days
    doc.setDrawColor(241, 245, 249);
    doc.line(margin, yPos, pageWidth - margin, yPos);
    yPos += 4;
  });

  // 6. Inclusions & Exclusions Box
  checkPageBreak(36);
  yPos += 2;
  doc.setFillColor(241, 245, 249);
  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(0.3);
  doc.roundedRect(margin, yPos, contentWidth, 32, 2, 2, 'FD');

  const halfWidth = (contentWidth - 6) / 2;

  // Inclusions Column
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(5, 150, 105); // emerald-600
  doc.text('WHAT IS INCLUDED:', margin + 4, yPos + 5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(51, 65, 85);

  const incList = pkg.included.length > 0
    ? pkg.included.slice(0, 5)
    : [
        'Selected Hotel Stay with daily Breakfast & Dinner',
        'Exclusive Private Vehicle with Experienced Mountain Driver',
        'All Fuel, Toll Taxes, Parking Charges & Driver Allowance',
        'Protected Area Permits & Border Checkpost Clearances',
        '24x7 Gangtok Operations Desk Emergency Assistance',
      ];

  let incY = yPos + 9;
  incList.forEach((inc) => {
    const incText = doc.splitTextToSize(`✓ ${inc}`, halfWidth - 4)[0];
    doc.text(incText, margin + 4, incY);
    incY += 4;
  });

  // Exclusions Column
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(225, 29, 72); // rose-600
  doc.text('EXCLUSIONS & NOTES:', margin + halfWidth + 4, yPos + 5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(51, 65, 85);

  const excList = [
    'Airfare / Train tickets to NJP / Bagdogra',
    'Personal expenses, laundry, tips & room heater charges',
    'Optional Nathula Pass vehicle permit charges (if taken)',
    'Entry tickets to monasteries, ropeway & skywalk',
    'Anything not specifically mentioned in inclusions',
  ];

  let excY = yPos + 9;
  excList.forEach((exc) => {
    const excText = doc.splitTextToSize(`✗ ${exc}`, halfWidth - 4)[0];
    doc.text(excText, margin + halfWidth + 4, excY);
    excY += 4;
  });

  yPos += 36;

  // 7. Mountain Travel Guidelines & Essential Packing
  checkPageBreak(24);
  doc.setFillColor(236, 253, 245); // emerald-50
  doc.setDrawColor(52, 211, 153); // emerald-400
  doc.roundedRect(margin, yPos, contentWidth, 20, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(6, 95, 70);
  doc.text('HIMALAYAN MOUNTAIN TRAVEL GUIDELINES:', margin + 4, yPos + 4.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.8);
  doc.setTextColor(30, 41, 59);
  doc.text('• High Altitude Acclimatization: Stay hydrated, drink warm water, avoid alcohol at heights above 10,000 ft.', margin + 4, yPos + 8.5);
  doc.text('• Essential Documents: Carry 4 physical passport-sized photos and Original Voter ID / Passport (Aadhaar has restrictions).', margin + 4, yPos + 12);
  doc.text('• Remote Area Cash: ATMs are scarce beyond Gangtok. Carry adequate physical cash for snacks & souvenirs.', margin + 4, yPos + 15.5);

  yPos += 24;

  // 8. Direct Booking Helpline & Office Address
  checkPageBreak(18);
  doc.setFillColor(10, 17, 40);
  doc.roundedRect(margin, yPos, contentWidth, 15, 2, 2, 'F');

  doc.setTextColor(253, 224, 71);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.text('HOW TO LOCK IN YOUR DATES & RESERVE YOUR VEHICLE:', margin + 4, yPos + 4.5);

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.text(`Direct WhatsApp / Call: +91 62961 02341 / +91 98513 70773 | Email: ${AGENCY_DETAILS.email}`, margin + 4, yPos + 8.5);
  doc.text(`Official Office: Rashmi Prasad Alley Margh, Gangtok, Sikkim 737101 | 100% Safe Payments & GST Invoices`, margin + 4, yPos + 12);

  // Add Page Footers across all generated pages
  const totalPages = doc.internal.pages.length - 1;
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    drawBrandFooter(doc, pageWidth, pageHeight, margin, i, totalPages);
  }

  // Trigger download
  const filename = sanitizeFileName(pkg.title);
  doc.save(filename);
};

/**
 * Generate a PDF from a custom AI Generated Itinerary
 */
export const generateItineraryPDF = (
  itinerary: GeneratedItinerary,
  options?: PDFCustomOptions
) => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;
  let yPos = 44;

  const checkPageBreak = (neededHeight: number) => {
    if (yPos + neededHeight > pageHeight - 16) {
      doc.addPage();
      yPos = 18;
      // Header for subsequent pages
      doc.setFillColor(10, 17, 40);
      doc.rect(0, 0, pageWidth, 10, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.text(`OffbeatDestination Travels — ${itinerary.title}`, margin, 7);
      doc.setTextColor(245, 158, 11);
      doc.text(`WhatsApp: +91 62961 02341`, pageWidth - margin, 7, { align: 'right' });
      yPos = 16;
    }
  };

  // Draw Brand Header
  drawBrandHeader(doc, pageWidth, margin, true);

  // 1. Itinerary Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14.5);
  doc.setTextColor(15, 23, 42);
  const titleLines = doc.splitTextToSize(itinerary.title, contentWidth);
  doc.text(titleLines, margin, yPos);
  yPos += titleLines.length * 6 + 1;

  // Overview box
  if (itinerary.overview) {
    checkPageBreak(20);
    doc.setFillColor(241, 245, 249);
    doc.setDrawColor(203, 213, 225);
    doc.setLineWidth(0.3);
    const overviewLines = doc.splitTextToSize(itinerary.overview, contentWidth - 8);
    const boxHeight = overviewLines.length * 3.8 + 6;
    doc.roundedRect(margin, yPos, contentWidth, boxHeight, 1.5, 1.5, 'FD');

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.8);
    doc.setTextColor(51, 65, 85);
    doc.text(overviewLines, margin + 4, yPos + 4.5);
    yPos += boxHeight + 4;
  }

  // 2. Metrics & Pricing Grid
  checkPageBreak(24);
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(margin, yPos, contentWidth, 22, 2, 2, 'FD');

  const colW = contentWidth / 3;

  // Col 1: Duration & Tier
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text('DURATION & TIER', margin + 4, yPos + 5);
  doc.setFontSize(9);
  doc.setTextColor(15, 23, 42);
  doc.text(`${itinerary.duration}`, margin + 4, yPos + 10.5);
  doc.setFontSize(7.5);
  doc.setTextColor(16, 185, 129);
  doc.text(`${itinerary.budgetTier || 'Deluxe Plan'}`, margin + 4, yPos + 15.5);

  // Col 2: Price
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text('ESTIMATED TARIFF', margin + colW + 4, yPos + 5);
  doc.setFontSize(9.5);
  doc.setTextColor(5, 150, 105);
  doc.text(`${itinerary.estimatedCostPerPerson} / person`, margin + colW + 4, yPos + 11);
  if (itinerary.totalEstimatedCost) {
    doc.setFontSize(7);
    doc.setTextColor(100, 116, 139);
    doc.text(`Group Total: ${itinerary.totalEstimatedCost}`, margin + colW + 4, yPos + 16);
  }

  // Col 3: Vehicle
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text('PRIVATE VEHICLE', margin + colW * 2 + 4, yPos + 5);
  doc.setFontSize(8);
  doc.setTextColor(30, 41, 59);
  const vehText = doc.splitTextToSize(itinerary.vehicleRecommended || 'Toyota Innova Crysta / Scorpio 4x4', colW - 6);
  doc.text(vehText, margin + colW * 2 + 4, yPos + 10.5);

  yPos += 26;

  // Mandatory 2-Night Lachung Stay rule for North Sikkim
  const isNorthSikkim =
    itinerary.hasNorthSikkim ||
    itinerary.lachungMandatory2NightsApplied ||
    itinerary.title.toLowerCase().includes('north') ||
    itinerary.title.toLowerCase().includes('lachung');

  if (isNorthSikkim) {
    checkPageBreak(15);
    doc.setFillColor(254, 243, 199);
    doc.setDrawColor(245, 158, 11);
    doc.roundedRect(margin, yPos, contentWidth, 12, 1.5, 1.5, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(180, 83, 9);
    doc.text('PERMIT REGULATION: Mandatory 2-Night Lachung Stay Included', margin + 4, yPos + 4.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.8);
    doc.setTextColor(120, 53, 15);
    doc.text(
      'As per Sikkim Tourism regulations, all North Sikkim trips mandatorily feature 2 Nights in Lachung for high-altitude acclimatization & snow route clearance.',
      margin + 4,
      yPos + 8.5
    );

    yPos += 15;
  }

  // Day by Day Plan
  checkPageBreak(12);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(15, 23, 42);
  doc.text('DETAILED DAY-BY-DAY ITINERARY', margin, yPos);
  doc.setLineWidth(0.5);
  doc.setDrawColor(16, 185, 129);
  doc.line(margin, yPos + 1.5, margin + 55, yPos + 1.5);
  yPos += 7;

  itinerary.dayByDay.forEach((day: GeneratedItineraryDay) => {
    const detailLines = doc.splitTextToSize(day.details, contentWidth - 14);
    const dayHeight = 10 + detailLines.length * 3.8 + 8;

    checkPageBreak(dayHeight);

    // Day Header Box
    doc.setFillColor(15, 23, 42);
    doc.roundedRect(margin, yPos, 14, 5.5, 1, 1, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.text(`DAY ${day.day}`, margin + 2, yPos + 3.8);

    doc.setTextColor(15, 23, 42);
    doc.setFontSize(8.5);
    doc.text(day.title, margin + 17, yPos + 4);

    yPos += 7;

    // Day details
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.8);
    doc.setTextColor(51, 65, 85);
    doc.text(detailLines, margin + 2, yPos);
    yPos += detailLines.length * 3.8 + 2;

    // Highlights
    if (day.popularHighlights && day.popularHighlights.length > 0) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7);
      doc.setTextColor(14, 116, 144); // cyan-700
      doc.text(`Popular Sights: ${day.popularHighlights.join(' • ')}`, margin + 2, yPos);
      yPos += 3.5;
    }

    if (day.offbeatHighlights && day.offbeatHighlights.length > 0) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7);
      doc.setTextColor(180, 83, 9); // amber-700
      doc.text(`Offbeat Spots: ${day.offbeatHighlights.join(' • ')}`, margin + 2, yPos);
      yPos += 3.5;
    }

    if (day.overnightStay || day.mealsIncluded) {
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(7);
      doc.setTextColor(100, 116, 139);
      doc.text(`Stay: ${day.overnightStay || 'Hotel'} | Meals: ${day.mealsIncluded || 'As per plan'}`, margin + 2, yPos);
      yPos += 3.5;
    }

    // Divider
    doc.setDrawColor(226, 232, 240);
    doc.line(margin, yPos, pageWidth - margin, yPos);
    yPos += 4;
  });

  // Inclusions Box
  if (itinerary.inclusions && itinerary.inclusions.length > 0) {
    checkPageBreak(26);
    yPos += 2;
    doc.setFillColor(241, 245, 249);
    doc.setDrawColor(203, 213, 225);
    doc.roundedRect(margin, yPos, contentWidth, 22, 2, 2, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(15, 23, 42);
    doc.text('PACKAGE INCLUSIONS & PERMIT ASSISTANCE:', margin + 4, yPos + 4.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(51, 65, 85);

    let incY = yPos + 8.5;
    itinerary.inclusions.slice(0, 5).forEach((inc) => {
      doc.text(`✓ ${inc}`, margin + 4, incY);
      incY += 3.2;
    });

    yPos += 26;
  }

  // Booking Callout Box
  checkPageBreak(18);
  doc.setFillColor(236, 253, 245);
  doc.setDrawColor(16, 185, 129);
  doc.roundedRect(margin, yPos, contentWidth, 15, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(4, 120, 87);
  doc.text('HOW TO LOCK IN YOUR DATES & RESERVE VEHICLE:', margin + 4, yPos + 4.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.2);
  doc.setTextColor(15, 23, 42);
  doc.text(`Contact OffbeatDestination Travels on WhatsApp: +91 62961 02341 or +91 98513 70773`, margin + 4, yPos + 8.5);
  doc.text(`Email: ${AGENCY_DETAILS.email} | Office: Rashmi Prasad Alley Margh, Gangtok, Sikkim`, margin + 4, yPos + 12);

  // Add Page Footers across all generated pages
  const totalPages = doc.internal.pages.length - 1;
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    drawBrandFooter(doc, pageWidth, pageHeight, margin, i, totalPages);
  }

  const filename = sanitizeFileName(itinerary.title);
  doc.save(filename);
};

/**
 * Generate a Formal Quotation / Bill Estimate PDF
 */
export const generateQuotationPDF = (quote: QuotationItem) => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;
  let yPos = 44;

  drawBrandHeader(doc, pageWidth, margin, true);

  // Quote Header
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(15, 23, 42);
  doc.text(`OFFICIAL TOUR QUOTATION #${quote.quoteNumber}`, margin, yPos);
  yPos += 6;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text(`Generated Date: ${quote.createdAt}  |  Valid Until: ${quote.validUntil}`, margin, yPos);
  yPos += 8;

  // Customer Summary Table
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(margin, yPos, contentWidth, 26, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(15, 23, 42);
  doc.text(`Client: ${quote.customerName}`, margin + 4, yPos + 6);
  doc.setFont('helvetica', 'normal');
  doc.text(`WhatsApp: ${quote.whatsappNumber}`, margin + 4, yPos + 11);
  doc.text(`Travel Dates: ${quote.travelDates}`, margin + 4, yPos + 16);
  doc.text(`Travelers: ${quote.adultsCount} Adults, ${quote.childrenCount} Children`, margin + 4, yPos + 21);

  const colW = contentWidth / 2;
  doc.setFont('helvetica', 'bold');
  doc.text(`Package / Route: ${quote.packageName || quote.packageTitle || 'Custom Circuit'}`, margin + colW + 4, yPos + 6);
  doc.setFont('helvetica', 'normal');
  doc.text(`Vehicle: ${quote.vehicleModel}`, margin + colW + 4, yPos + 11);
  doc.text(`Hotel Category: ${quote.hotelCategory}`, margin + colW + 4, yPos + 16);
  doc.text(`Status: ${quote.status}`, margin + colW + 4, yPos + 21);

  yPos += 32;

  // Itemized Tariff Table
  doc.setFillColor(10, 17, 40);
  doc.rect(margin, yPos, contentWidth, 7, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.text('DESCRIPTION', margin + 4, yPos + 5);
  doc.text('AMOUNT (INR)', pageWidth - margin - 4, yPos + 5, { align: 'right' });
  yPos += 8;

  const rows = [
    { desc: `Hotel Accommodation (${quote.hotelCategory})`, amt: quote.totalHotelCost || Math.round(quote.totalFinalAmount * 0.55) },
    { desc: `Dedicated Private Vehicle (${quote.vehicleModel}) incl. Fuel & Tolls`, amt: quote.totalCabCost || Math.round(quote.totalFinalAmount * 0.35) },
    { desc: `Protected Area Permits & Checkpost Formalities`, amt: quote.permitCharges || quote.permitsFee || 1500 },
    { desc: `GST & Government Taxes (5%)`, amt: quote.gstTax || Math.round(quote.totalFinalAmount * 0.05) },
  ];

  rows.forEach((r, idx) => {
    if (idx % 2 === 0) {
      doc.setFillColor(248, 250, 252);
      doc.rect(margin, yPos - 1, contentWidth, 6, 'F');
    }
    doc.setTextColor(51, 65, 85);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.text(r.desc, margin + 4, yPos + 3.5);
    doc.setFont('helvetica', 'bold');
    doc.text(`₹${(r.amt || 0).toLocaleString('en-IN')}`, pageWidth - margin - 4, yPos + 3.5, { align: 'right' });
    yPos += 6;
  });

  // Final Total
  yPos += 3;
  doc.setFillColor(6, 182, 212);
  doc.rect(margin, yPos, contentWidth, 8, 'F');
  doc.setTextColor(10, 17, 40);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.text('TOTAL NET AMOUNT (ALL INCLUSIVE):', margin + 4, yPos + 5.5);
  doc.text(`₹${quote.totalFinalAmount.toLocaleString('en-IN')}`, pageWidth - margin - 4, yPos + 5.5, { align: 'right' });
  yPos += 16;

  // Payment instructions
  doc.setFillColor(236, 253, 245);
  doc.setDrawColor(52, 211, 153);
  doc.roundedRect(margin, yPos, contentWidth, 20, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(6, 95, 70);
  doc.text('PAYMENT & RESERVATION POLICY:', margin + 4, yPos + 5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(15, 23, 42);
  doc.text('• 30% Advance Deposit required to confirm vehicle allocation & hotel booking.', margin + 4, yPos + 9.5);
  doc.text('• 70% Balance payable upon arrival in Gangtok.', margin + 4, yPos + 13.5);
  doc.text(`• For booking confirmation, WhatsApp this quote to +91 62961 02341.`, margin + 4, yPos + 17.5);

  drawBrandFooter(doc, pageWidth, pageHeight, margin, 1, 1);

  doc.save(`Quotation_${quote.quoteNumber}_OffbeatDestination.pdf`);
};

export interface ChecklistExportItem {
  id: string;
  category: string;
  title: string;
  description: string;
  essential: boolean;
  isChecked: boolean;
  recommendedQty?: string;
}

export interface ChecklistPDFOptions {
  travelerName?: string;
  tripDuration: string; // e.g. '3 Nights / 4 Days', '5 Nights / 6 Days', '7 Nights / 8 Days', '10+ Days'
  travelSeason: string; // e.g. 'Autumn & Spring (Oct-Apr)', 'Winter & Snow (Dec-Feb)', 'Monsoon & Summer (May-Sep)'
  destinationTag: string; // 'All' | 'Sikkim' | 'North Sikkim' | 'Bhutan'
  travelerType?: string; // 'Family with Kids', 'Couple / Honeymoon', 'Senior Citizens', 'Adventure / Photography'
  items: ChecklistExportItem[];
  customItems?: string[];
  dietaryPreference?: string;
}

/**
 * Generates an executive, branded Himalayan Travel Packing & Permit Checklist PDF
 */
export const generateChecklistPDF = (options: ChecklistPDFOptions): { blobUrl: string; fileName: string } => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;
  let yPos = 42;
  let pageNum = 1;

  const travelerName = options.travelerName?.trim() || 'Valued Himalayan Traveler';
  const fileName = `Sikkim_Packing_Checklist_${travelerName.replace(/[^a-zA-Z0-9]/g, '_')}_OffbeatDestination.pdf`;

  // Draw header
  drawBrandHeader(doc, pageWidth, margin, true);

  // Title Banner
  doc.setFillColor(15, 23, 42); // slate-900
  doc.roundedRect(margin, yPos, contentWidth, 14, 2, 2, 'F');
  
  // Left side: Document Title
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('HIMALAYAN TRAVEL PREPARATION & PACKING CHECKLIST', margin + 4, yPos + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(6, 182, 212); // cyan-400
  doc.text(`Curated for Sikkim, North Sikkim (15,300 ft), Silk Route & Bhutan Travel`, margin + 4, yPos + 10.5);

  // Right side: Date
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(245, 158, 11); // amber-400
  const dateStr = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  doc.text(`Generated: ${dateStr}`, pageWidth - margin - 4, yPos + 8.5, { align: 'right' });

  yPos += 18;

  // Traveler & Trip Metadata Grid
  doc.setFillColor(248, 250, 252); // slate-50
  doc.setDrawColor(203, 213, 225); // slate-300
  doc.roundedRect(margin, yPos, contentWidth, 22, 2, 2, 'FD');

  const col1 = margin + 4;
  const col2 = margin + 55;
  const col3 = margin + 115;

  // Row 1
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text('TRAVELER NAME:', col1, yPos + 5.5);
  doc.text('TRIP DURATION:', col2, yPos + 5.5);
  doc.text('SEASON / WEATHER:', col3, yPos + 5.5);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(15, 23, 42);
  doc.text(travelerName, col1, yPos + 10);
  doc.text(options.tripDuration, col2, yPos + 10);
  doc.text(options.travelSeason, col3, yPos + 10);

  // Row 2
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text('TARGET DESTINATIONS:', col1, yPos + 15.5);
  doc.text('TRAVELER PROFILE:', col2, yPos + 15.5);
  doc.text('READINESS SCORE:', col3, yPos + 15.5);

  const totalItems = options.items.length;
  const completedItems = options.items.filter((i) => i.isChecked).length;
  const pct = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(15, 23, 42);
  doc.text(options.destinationTag === 'All' ? 'Sikkim + North Sikkim + Darjeeling' : options.destinationTag, col1, yPos + 19.5);
  doc.text(options.travelerType || 'Family / Leisure', col2, yPos + 19.5);

  // Score color
  if (pct >= 80) {
    doc.setTextColor(5, 150, 105); // emerald-600
  } else if (pct >= 50) {
    doc.setTextColor(217, 119, 6); // amber-600
  } else {
    doc.setTextColor(225, 29, 72); // rose-600
  }
  doc.text(`${completedItems}/${totalItems} Ready (${pct}%)`, col3, yPos + 19.5);

  yPos += 26;

  // Group items by category
  const categories = Array.from(new Set(options.items.map((i) => i.category)));

  const checkPageBreak = (neededHeight: number) => {
    if (yPos + neededHeight > pageHeight - 18) {
      drawBrandFooter(doc, pageWidth, pageHeight, margin, pageNum, 2); // estimate 2 pages
      doc.addPage();
      pageNum++;
      yPos = 20;
      drawBrandHeader(doc, pageWidth, margin, false);
      
      // Page continuation indicator
      doc.setFillColor(15, 23, 42);
      doc.rect(margin, yPos, contentWidth, 6, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.text(`CHECKLIST (CONTINUED) — ${travelerName} • ${options.tripDuration}`, margin + 4, yPos + 4.2);
      yPos += 9;
    }
  };

  categories.forEach((cat) => {
    const catItems = options.items.filter((i) => i.category === cat);
    if (catItems.length === 0) return;

    checkPageBreak(16);

    // Category Section Header Bar
    doc.setFillColor(10, 17, 40); // midnight blue
    doc.roundedRect(margin, yPos, contentWidth, 7, 1.5, 1.5, 'F');

    doc.setTextColor(6, 182, 212); // cyan-400
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.text(cat.toUpperCase(), margin + 4, yPos + 4.8);

    const catCompleted = catItems.filter((i) => i.isChecked).length;
    doc.setTextColor(253, 224, 71); // amber-300
    doc.setFontSize(7);
    doc.text(`${catCompleted}/${catItems.length} Packed`, pageWidth - margin - 4, yPos + 4.8, { align: 'right' });

    yPos += 9;

    // Items inside category
    catItems.forEach((item) => {
      checkPageBreak(12);

      const isChecked = item.isChecked;

      // Item container box
      if (isChecked) {
        doc.setFillColor(240, 253, 244); // light emerald
        doc.setDrawColor(187, 247, 208);
      } else {
        doc.setFillColor(255, 255, 255);
        doc.setDrawColor(226, 232, 240);
      }
      doc.roundedRect(margin, yPos, contentWidth, 10, 1, 1, 'FD');

      // Checkbox Box
      const boxSize = 4.2;
      const boxX = margin + 3;
      const boxY = yPos + 2.8;

      if (isChecked) {
        doc.setFillColor(5, 150, 105); // emerald-600
        doc.roundedRect(boxX, boxY, boxSize, boxSize, 0.8, 0.8, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(7);
        doc.text('✓', boxX + 1.1, boxY + 3.2);
      } else {
        doc.setFillColor(255, 255, 255);
        doc.setDrawColor(148, 163, 184);
        doc.roundedRect(boxX, boxY, boxSize, boxSize, 0.8, 0.8, 'FD');
      }

      // Title & Quantity
      const textStartX = boxX + boxSize + 3;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      if (isChecked) {
        doc.setTextColor(51, 65, 85);
      } else {
        doc.setTextColor(15, 23, 42);
      }
      
      let itemHeading = item.title;
      doc.text(itemHeading, textStartX, yPos + 4.5);

      // Badges
      let badgeX = textStartX + doc.getTextWidth(itemHeading) + 3;
      if (item.essential) {
        doc.setFillColor(255, 228, 230); // light rose
        doc.roundedRect(badgeX, yPos + 1.8, 18, 3.8, 0.8, 0.8, 'F');
        doc.setTextColor(190, 18, 60);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(5.5);
        doc.text('MANDATORY', badgeX + 2, yPos + 4.4);
        badgeX += 21;
      }

      if (item.recommendedQty) {
        doc.setFillColor(238, 242, 255); // light indigo
        doc.roundedRect(badgeX, yPos + 1.8, doc.getTextWidth(item.recommendedQty) + 4, 3.8, 0.8, 0.8, 'F');
        doc.setTextColor(67, 56, 202);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(5.5);
        doc.text(item.recommendedQty, badgeX + 2, yPos + 4.4);
      }

      // Description
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(6.5);
      if (isChecked) {
        doc.setTextColor(100, 116, 139);
      } else {
        doc.setTextColor(71, 85, 105);
      }
      const cleanDesc = item.description.length > 105 ? `${item.description.substring(0, 102)}...` : item.description;
      doc.text(cleanDesc, textStartX, yPos + 8.2);

      yPos += 11.5;
    });

    yPos += 2;
  });

  // Custom Notes or User Added Items if present
  if (options.customItems && options.customItems.length > 0) {
    checkPageBreak(18);
    doc.setFillColor(241, 245, 249);
    doc.setDrawColor(203, 213, 225);
    doc.roundedRect(margin, yPos, contentWidth, 6 + options.customItems.length * 5, 1.5, 1.5, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(15, 23, 42);
    doc.text('ADDITIONAL PERSONAL ITEMS & MEDS:', margin + 4, yPos + 4.5);

    options.customItems.forEach((cItem, cIdx) => {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7);
      doc.setTextColor(51, 65, 85);
      doc.text(`[   ]  ${cItem}`, margin + 6, yPos + 9 + cIdx * 5);
    });

    yPos += 10 + options.customItems.length * 5;
  }

  // Emergency & Permit Protocol Box
  checkPageBreak(24);
  doc.setFillColor(254, 242, 242); // light red/rose
  doc.setDrawColor(251, 113, 133);
  doc.roundedRect(margin, yPos, contentWidth, 20, 1.5, 1.5, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(159, 18, 57);
  doc.text('CRITICAL SIKKIM ARMY PERMIT & ALTITUDE PROTOCOL:', margin + 4, yPos + 4.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(76, 5, 25);
  doc.text('1. Aadhaar Card is NOT accepted at high-altitude army checkposts (Nathula / Zero Point). Carry Original Passport or Voter ID + 6 photos.', margin + 4, yPos + 8.2);
  doc.text('2. Above 12,000 ft, stay hydrated with warm water. Diamox should be started 24 hrs prior to Lachung ascent after physician approval.', margin + 4, yPos + 11.7);
  doc.text('3. WhatsApp document photos to our Gangtok desk (+91 62961 02341) 48 hrs in advance for instant pre-cleared military pass issuance.', margin + 4, yPos + 15.2);

  yPos += 24;

  // Draw footer on all pages
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    drawBrandFooter(doc, pageWidth, pageHeight, margin, i, totalPages);
  }

  // Generate output
  doc.save(fileName);
  const blob = doc.output('blob');
  const blobUrl = URL.createObjectURL(blob);

  return { blobUrl, fileName };
};

