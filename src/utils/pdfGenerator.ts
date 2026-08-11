import { jsPDF } from 'jspdf';
import { GeneratedItinerary, GeneratedItineraryDay } from '../types';
import { AGENCY_DETAILS } from '../data/travelData';

export const generateItineraryPDF = (itinerary: GeneratedItinerary) => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;
  let yPos = margin;

  const checkPageBreak = (neededHeight: number) => {
    if (yPos + neededHeight > pageHeight - margin) {
      doc.addPage();
      yPos = margin;
      addHeaderFooter(false);
    }
  };

  const addHeaderFooter = (isFirstPage: boolean) => {
    if (isFirstPage) {
      // Header Banner
      doc.setFillColor(15, 23, 42); // slate-900
      doc.rect(0, 0, pageWidth, 32, 'F');

      doc.setTextColor(245, 158, 11); // amber-500
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(16);
      doc.text(AGENCY_DETAILS.name.toUpperCase(), margin, 12);

      doc.setTextColor(203, 213, 225); // slate-300
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(9);
      doc.text(`"${AGENCY_DETAILS.tagline}"`, margin, 17);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(148, 163, 184); // slate-400
      doc.text(`Govt. Regd: ${AGENCY_DETAILS.licenseNo} | Tel: ${AGENCY_DETAILS.phonePrimary}`, margin, 22);
      doc.text(`Address: ${AGENCY_DETAILS.location}`, margin, 26);

      // Gold Accent Strip
      doc.setFillColor(217, 119, 6);
      doc.rect(0, 31, pageWidth, 1.5, 'F');

      yPos = 38;
    }

    // Page Footer
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    doc.text(
      `OffbeatDestination Travels — Gangtok, Sikkim | Phone: +91 62961 02341 | Email: ${AGENCY_DETAILS.email}`,
      margin,
      pageHeight - 6
    );
  };

  addHeaderFooter(true);

  // Title Block
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(15, 23, 42);
  const titleLines = doc.splitTextToSize(itinerary.title, contentWidth);
  doc.text(titleLines, margin, yPos);
  yPos += titleLines.length * 6 + 2;

  // Overview box
  doc.setFillColor(241, 245, 249); // slate-100
  doc.setDrawColor(203, 213, 225);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(51, 65, 85);

  const overviewLines = doc.splitTextToSize(itinerary.overview, contentWidth - 8);
  const overviewBoxHeight = overviewLines.length * 4.5 + 8;

  checkPageBreak(overviewBoxHeight + 10);
  doc.roundedRect(margin, yPos, contentWidth, overviewBoxHeight, 2, 2, 'FD');
  doc.text(overviewLines, margin + 4, yPos + 6);
  yPos += overviewBoxHeight + 6;

  // Mandatory 2-Night Lachung Warning if applicable
  const isNorthSikkim =
    itinerary.hasNorthSikkim ||
    itinerary.lachungMandatory2NightsApplied ||
    itinerary.title.toLowerCase().includes('north') ||
    itinerary.title.toLowerCase().includes('lachung');

  if (isNorthSikkim) {
    checkPageBreak(18);
    doc.setFillColor(254, 243, 199); // amber-100
    doc.setDrawColor(245, 158, 11); // amber-500
    doc.roundedRect(margin, yPos, contentWidth, 14, 2, 2, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(180, 83, 9); // amber-700
    doc.text('PERMIT REGULATION NOTICE: Mandatory 2-Night Lachung Stay Included', margin + 4, yPos + 5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(120, 53, 15);
    doc.text(
      'As per official Sikkim Tourism & Army licensing regulations, all North Sikkim trips mandatorily feature 2 Nights in Lachung for high-altitude acclimatization.',
      margin + 4,
      yPos + 10
    );

    yPos += 18;
  }

  // Summary Metrics Table
  checkPageBreak(24);
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(margin, yPos, contentWidth, 20, 2, 2, 'FD');

  const colW = contentWidth / 3;
  
  // Col 1: Duration & Budget
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text('DURATION & TIER', margin + 4, yPos + 5);
  doc.setFontSize(9);
  doc.setTextColor(15, 23, 42);
  doc.text(`${itinerary.duration}`, margin + 4, yPos + 10);
  doc.setFontSize(8);
  doc.setTextColor(16, 185, 129); // emerald
  doc.text(`${itinerary.budgetTier || 'Deluxe Plan'}`, margin + 4, yPos + 15);

  // Col 2: Price
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text('ESTIMATED COST', margin + colW + 4, yPos + 5);
  doc.setFontSize(10);
  doc.setTextColor(5, 150, 105);
  doc.text(`${itinerary.estimatedCostPerPerson} / person`, margin + colW + 4, yPos + 11);
  if (itinerary.totalEstimatedCost) {
    doc.setFontSize(7.5);
    doc.setTextColor(100, 116, 139);
    doc.text(`Total: ${itinerary.totalEstimatedCost}`, margin + colW + 4, yPos + 16);
  }

  // Col 3: Vehicle
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text('PRIVATE VEHICLE', margin + colW * 2 + 4, yPos + 5);
  doc.setFontSize(8.5);
  doc.setTextColor(30, 41, 59);
  const vehText = doc.splitTextToSize(itinerary.vehicleRecommended || 'Toyota Innova Crysta / Scorpio 4x4', colW - 6);
  doc.text(vehText, margin + colW * 2 + 4, yPos + 10);

  yPos += 26;

  // Day by Day Section Title
  checkPageBreak(12);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text('DETAILED DAY-BY-DAY ITINERARY', margin, yPos);
  doc.setLineWidth(0.4);
  doc.setDrawColor(16, 185, 129);
  doc.line(margin, yPos + 2, margin + 65, yPos + 2);
  yPos += 8;

  // Loop Days
  itinerary.dayByDay.forEach((day: GeneratedItineraryDay) => {
    // Estimate Day height
    const detailLines = doc.splitTextToSize(day.details, contentWidth - 12);
    const dayHeight = 12 + detailLines.length * 4 + 14;

    checkPageBreak(dayHeight);

    // Day Header Box
    doc.setFillColor(15, 23, 42);
    doc.roundedRect(margin, yPos, 14, 6, 1, 1, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.text(`DAY ${day.day}`, margin + 2, yPos + 4.2);

    doc.setTextColor(15, 23, 42);
    doc.setFontSize(9.5);
    doc.text(day.title, margin + 17, yPos + 4.5);

    yPos += 8;

    // Day details
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(51, 65, 85);
    doc.text(detailLines, margin + 2, yPos);
    yPos += detailLines.length * 4 + 2;

    // Highlights
    if (day.popularHighlights && day.popularHighlights.length > 0) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(14, 116, 144); // cyan-700
      doc.text(`Popular Sights: ${day.popularHighlights.join(' • ')}`, margin + 2, yPos);
      yPos += 4;
    }

    if (day.offbeatHighlights && day.offbeatHighlights.length > 0) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(180, 83, 9); // amber-700
      doc.text(`Offbeat Spots: ${day.offbeatHighlights.join(' • ')}`, margin + 2, yPos);
      yPos += 4;
    }

    // Overnight & Meals
    if (day.overnightStay || day.mealsIncluded) {
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(7.5);
      doc.setTextColor(100, 116, 139);
      const stayMealStr = `Stay: ${day.overnightStay || 'Hotel'} | Meals: ${day.mealsIncluded || 'As per plan'}`;
      doc.text(stayMealStr, margin + 2, yPos);
      yPos += 4;
    }

    // Subtle divider
    doc.setDrawColor(226, 232, 240);
    doc.line(margin, yPos, pageWidth - margin, yPos);
    yPos += 5;
  });

  // Inclusions Box
  checkPageBreak(30);
  yPos += 2;
  doc.setFillColor(241, 245, 249);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(margin, yPos, contentWidth, 24, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(15, 23, 42);
  doc.text('PACKAGE INCLUSIONS & PERMIT ASSISTANCE:', margin + 4, yPos + 5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(51, 65, 85);

  let incY = yPos + 9;
  itinerary.inclusions.slice(0, 5).forEach((inc) => {
    doc.text(`• ${inc}`, margin + 4, incY);
    incY += 3.5;
  });

  yPos += 28;

  // Booking Callout Box
  checkPageBreak(20);
  doc.setFillColor(236, 253, 245); // emerald-50
  doc.setDrawColor(16, 185, 129);
  doc.roundedRect(margin, yPos, contentWidth, 16, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(4, 120, 87); // emerald-700
  doc.text('HOW TO LOCK IN YOUR DATES & RESERVE VEHICLE:', margin + 4, yPos + 5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(15, 23, 42);
  doc.text(`Contact OffbeatDestination Travels on WhatsApp: +91 62961 02341 or +91 98513 70773`, margin + 4, yPos + 10);
  doc.text(`Email: info@offbeatdestination.in | Office: Rashmi Prasad Alley Margh, Gangtok, Sikkim`, margin + 4, yPos + 14);

  // Save the PDF
  const filename = `${itinerary.title.replace(/[^a-zA-Z0-9]/g, '_')}_Itinerary.pdf`;
  doc.save(filename);
};
