import React, { useState } from 'react';
import { FileText, Plus, Share2, Printer, CheckCircle2, DollarSign, Calendar, Users, Car, Building2, X, Trash2, Download } from 'lucide-react';
import { jsPDF } from 'jspdf';
import { QuotationItem, TourPackage, CabOption } from '../../types';

interface AdminQuotationsProps {
  quotations: QuotationItem[];
  packages: TourPackage[];
  cabs: CabOption[];
  onRefresh: () => void;
}

export const AdminQuotations: React.FC<AdminQuotationsProps> = ({ quotations, packages, cabs, onRefresh }) => {
  const [isNewModal, setIsNewModal] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [selectedQuoteForPrint, setSelectedQuoteForPrint] = useState<QuotationItem | null>(null);

  const [form, setForm] = useState({
    customerName: 'Anand Kumar',
    whatsappNumber: '+91 98300 12345',
    email: 'anand.k@example.com',
    packageName: packages[0]?.title || '5D Gangtok & North Sikkim Experience',
    travelDates: '15th May - 20th May 2026',
    durationNights: 5,
    adultsCount: 2,
    childrenCount: 1,
    hotelCategory: '3★ Premium Deluxe',
    vehicleModel: 'Toyota Innova Crysta',
    cabDays: 5,
    totalCabCost: 22500,
    totalHotelCost: 17500,
    permitsFee: 1500,
    discountAmount: 1500,
    gstPercentage: 5,
    itinerarySummary: `Day 1: Arrival at NJP Railway / Bagdogra Airport -> Scenic transfer to Gangtok (Hotel Check-in & Evening stroll at MG Marg)
Day 2: Gangtok Sightseeing -> Tsomgo Lake, Baba Harbhajan Singh Mandir & Nathula Pass Army Clearance
Day 3: Gangtok to Lachen via Seven Sisters Waterfall, Singhik Viewpoint & Chungthang Confluence
Day 4: Lachen -> Excursion to Chopta Valley & Gurudongmar Lake (17,800 ft) -> Transfer to Lachung
Day 5: Lachung -> Yumthang Valley of Flowers & Zero Point -> Return Transfer to Gangtok
Day 6: Gangtok Hotel Check-out -> Transfer back to NJP / Bagdogra Airport for Departure`,
    inclusions: `• Exclusive private non-AC vehicle (${cabs[0]?.model || 'Toyota Innova'}) with professional mountain driver, fuel, toll & parking charges.
• Hotel accommodations on MAP plan (Daily Breakfast & Dinner) for all nights.
• All Protected Area Permits (North Sikkim & Nathula Pass Army Clearances).
• 24x7 local ground assistance and emergency coordination in Gangtok.`,
    exclusions: `• Flight / Train tickets to and from NJP / Bagdogra.
• Personal expenses, laundry, tips, room heater charges & entry pass fees.
• Extra vehicle detention or itinerary changes requested by guest outside agreed schedule.`,
    paymentTerms: `• 30% advance deposit required for booking confirmation & hotel blocking.
• Balance 70% payable upon arrival in Gangtok prior to tour departure.
• Cancellation Policy: 100% refund if cancelled 15+ days prior; 50% refund if 7-14 days prior.
• Mandatory Documents: Original Voter ID / Passport and 4 passport size photos required for Army permit clearances.`,
    internalNotes: 'Guest requested early morning pickup at NJP Railway station.',
  });

  const handleSelectPackagePreset = (pkgTitle: string) => {
    const selectedPkg = packages.find((p) => p.title === pkgTitle);
    if (selectedPkg) {
      const daysCount = selectedPkg.duration ? parseInt(selectedPkg.duration) || 5 : 5;
      const itineraryText = selectedPkg.itinerary
        ? selectedPkg.itinerary.map((item) => `Day ${item.day}: ${item.title} - ${item.description}`).join('\n')
        : '';

      setForm((prev) => ({
        ...prev,
        packageName: selectedPkg.title,
        durationNights: daysCount,
        cabDays: daysCount,
        itinerarySummary: itineraryText || prev.itinerarySummary,
      }));
    } else {
      setForm((prev) => ({ ...prev, packageName: pkgTitle }));
    }
  };

  const handleCreate = async () => {
    const subtotal = form.totalCabCost + form.totalHotelCost + form.permitsFee - form.discountAmount;
    const gstTax = Math.round(subtotal * (form.gstPercentage / 100));
    const totalFinalAmount = subtotal + gstTax;

    const payload = {
      ...form,
      subtotal,
      gstTax,
      totalFinalAmount,
      itemizedBreakdown: [
        { description: `Private ${form.vehicleModel} Cab (${form.cabDays} Days)`, cost: form.totalCabCost },
        { description: `${form.durationNights} Nights Hotel Stay (${form.hotelCategory})`, cost: form.totalHotelCost },
        { description: 'Protected Area Permits (North Sikkim & Nathula Pass)', cost: form.permitsFee },
      ],
    };

    try {
      const res = await fetch('/api/admin/quotations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setSaveMessage('Official Quotation Generated & Saved!');
        setIsNewModal(false);
        onRefresh();
        setTimeout(() => setSaveMessage(''), 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleWhatsAppShare = (q: QuotationItem) => {
    const msg =
      `*OFFBEATDESTINATION TRAVELS - TOUR QUOTATION*\n\n` +
      `Dear ${q.customerName},\n` +
      `Thank you for contacting us! Here is your official itemized tour quote:\n\n` +
      `*Package:* ${q.packageName}\n` +
      `*Travel Dates:* ${q.travelDates}\n` +
      `*Guests:* ${q.adultsCount} Adults, ${q.childrenCount} Children\n` +
      `*Hotel Category:* ${q.hotelCategory}\n` +
      `*Private Vehicle:* ${q.vehicleModel}\n\n` +
      `*Total Package Price:* ₹${(q.totalFinalAmount || 0).toLocaleString('en-IN')} (incl. GST & Permits)\n` +
      `*Quote Ref:* ${q.quoteNumber}\n\n` +
      `Book now by replying to this message or calling us at +91 97331 81750.\n` +
      `Website: https://offbeatdestination.in`;

    const url = `https://wa.me/${q.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  const downloadPdfQuote = (q: Partial<QuotationItem> & { customerName: string; quoteNumber: string }) => {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const subtotal = q.subtotal ?? ((q.totalCabCost || 0) + (q.totalHotelCost || 0) + (q.permitsFee || 0) - (q.discountAmount || 0));
    const gstPercentage = q.gstPercentage ?? 5;
    const gstTax = q.gstTax ?? Math.round(subtotal * (gstPercentage / 100));
    const totalFinalAmount = q.totalFinalAmount ?? (subtotal + gstTax);

    let pageNum = 1;

    const renderHeader = () => {
      // Top Header Dark Navy Banner
      doc.setFillColor(7, 26, 45); // #071A2D
      doc.rect(0, 0, 210, 42, 'F');

      // Agency Brand Title
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(18);
      doc.text('OFFBEATDESTINATION TRAVELS', 15, 18);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(217, 188, 122); // #D9BC7A Gold Accent
      doc.text('A Better Way to Explore | Govt Reg: 1750/DoT&CAv/Gtk/25/TA', 15, 25);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(200, 215, 230);
      doc.text('Arithang, Gangtok, Sikkim - 737102 | Phone: +91 97331 81750 | info@offbeatdestination.in', 15, 32);

      // Right Gold Reference Badge
      doc.setFillColor(217, 188, 122);
      doc.rect(142, 10, 53, 22, 'F');

      doc.setTextColor(7, 26, 45);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.text('TOUR QUOTATION', 145, 18);
      doc.setFontSize(9);
      doc.text(`REF: ${q.quoteNumber}`, 145, 25);
    };

    const renderFooter = () => {
      doc.setFillColor(7, 26, 45);
      doc.rect(0, 282, 210, 15, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.text(`Thank you for choosing OffbeatDestination Travels! — www.offbeatdestination.in  (Page ${pageNum})`, 105, 290, { align: 'center' });
    };

    renderHeader();

    let y = 50;

    const checkPageBreak = (neededHeight: number) => {
      if (y + neededHeight > 275) {
        renderFooter();
        doc.addPage();
        pageNum++;
        // Header on subsequent pages
        doc.setFillColor(7, 26, 45);
        doc.rect(0, 0, 210, 16, 'F');
        doc.setTextColor(217, 188, 122);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9);
        doc.text(`OFFBEATDESTINATION TRAVELS — QUOTATION REF: ${q.quoteNumber}`, 15, 11);
        y = 25;
      }
    };

    // Customer & Travel Details Box
    doc.setFillColor(248, 250, 252);
    doc.rect(15, y, 180, 36, 'F');
    doc.setDrawColor(226, 232, 240);
    doc.rect(15, y, 180, 36, 'S');

    doc.setFontSize(10);
    doc.setTextColor(7, 26, 45);
    doc.setFont('helvetica', 'bold');
    doc.text('GUEST & TOUR ITINERARY DETAILS', 20, y + 8);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(51, 65, 85);

    doc.text(`Guest Name: ${q.customerName}`, 20, y + 17);
    doc.text(`WhatsApp: ${q.whatsappNumber || 'N/A'}`, 115, y + 17);

    doc.text(`Tour Route: ${q.packageName || 'Custom Sikkim & Darjeeling Package'}`, 20, y + 24);
    doc.text(`Travel Dates: ${q.travelDates || 'Flexible'}`, 115, y + 24);

    doc.text(`Guests: ${q.adultsCount || 2} Adults, ${q.childrenCount || 0} Children`, 20, y + 30);
    doc.text(`Vehicle: ${q.vehicleModel || 'Private Vehicle'} | Stay: ${q.hotelCategory || 'Deluxe'}`, 115, y + 30);

    y += 44;

    // Itemized Table Header
    checkPageBreak(30);
    doc.setFillColor(7, 26, 45);
    doc.rect(15, y, 180, 8, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(255, 255, 255);
    doc.text('ITEMIZED PRICING DESCRIPTION', 20, y + 5.5);
    doc.text('AMOUNT (INR)', 160, y + 5.5);

    y += 8;

    // Item rows
    const items = [
      { desc: `Private Vehicle & Driver Tariffs (${q.vehicleModel || 'Cab'}, ${q.cabDays || 5} Days)`, cost: q.totalCabCost || 0 },
      { desc: `Hotel Accommodations & Meals (${q.hotelCategory || 'Deluxe'}, ${q.durationNights || 5} Nights)`, cost: q.totalHotelCost || 0 },
      { desc: 'Protected Area Permits (North Sikkim & Nathula Pass Clearances)', cost: q.permitsFee || 0 },
    ];

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(30, 41, 59);

    items.forEach((item, idx) => {
      if (idx % 2 === 1) {
        doc.setFillColor(241, 245, 249);
        doc.rect(15, y, 180, 8, 'F');
      }
      doc.text(item.desc, 20, y + 5.5);
      doc.text(`Rs. ${(item.cost || 0).toLocaleString('en-IN')}`, 160, y + 5.5);
      y += 8;
    });

    if (q.discountAmount && q.discountAmount > 0) {
      doc.setTextColor(16, 122, 80);
      doc.setFont('helvetica', 'bold');
      doc.text('Special Agency Discount', 20, y + 5.5);
      doc.text(`- Rs. ${(q.discountAmount || 0).toLocaleString('en-IN')}`, 160, y + 5.5);
      y += 8;
    }

    // Divider Line
    doc.setDrawColor(203, 213, 225);
    doc.line(15, y, 195, y);
    y += 4;

    // Subtotal & Taxes
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    doc.text('Subtotal:', 125, y + 4);
    doc.text(`Rs. ${subtotal.toLocaleString('en-IN')}`, 160, y + 4);
    y += 6;

    doc.text(`GST Tax (${gstPercentage}%):`, 125, y + 4);
    doc.text(`Rs. ${gstTax.toLocaleString('en-IN')}`, 160, y + 4);
    y += 8;

    // Total Highlight Box
    doc.setFillColor(254, 252, 232); // Light gold tint
    doc.rect(115, y, 80, 13, 'F');
    doc.setDrawColor(217, 188, 122);
    doc.rect(115, y, 80, 13, 'S');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(7, 26, 45);
    doc.text('TOTAL PAYABLE:', 119, y + 8.5);

    doc.setTextColor(180, 120, 20);
    doc.setFontSize(11);
    doc.text(`Rs. ${totalFinalAmount.toLocaleString('en-IN')}`, 158, y + 8.5);

    y += 20;

    // Day-by-Day Itinerary Section
    if (q.itinerarySummary) {
      checkPageBreak(30);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(7, 26, 45);
      doc.text('DAY-BY-DAY TOUR ITINERARY:', 15, y);
      y += 6;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(51, 65, 85);

      const itinLines = q.itinerarySummary.split('\n');
      itinLines.forEach((line) => {
        if (!line.trim()) return;
        const wrapped = doc.splitTextToSize(line.trim(), 180);
        checkPageBreak(wrapped.length * 5 + 3);

        doc.setFont('helvetica', 'bold');
        doc.text('•', 15, y);
        doc.setFont('helvetica', 'normal');
        doc.text(wrapped, 20, y);
        y += wrapped.length * 4.5 + 2;
      });

      y += 4;
    }

    // Inclusions & Exclusions
    checkPageBreak(35);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(7, 26, 45);
    doc.text('PACKAGE INCLUSIONS:', 15, y);
    y += 5;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(71, 85, 105);

    const incList = (q.inclusions ||
      `• Dedicated non-AC private vehicle with experienced mountain driver, fuel, toll, and parking fees.
• Accommodation on twin/triple sharing basis with daily breakfast and dinner.
• All Protected Area Permits (North Sikkim / Nathula Pass) & Army clearances.
• 24x7 local ground support and emergency tour coordination in Gangtok.`).split('\n');

    incList.forEach((inc) => {
      if (!inc.trim()) return;
      const wrapped = doc.splitTextToSize(inc.trim(), 180);
      checkPageBreak(wrapped.length * 4.5);
      doc.text(wrapped, 15, y);
      y += wrapped.length * 4.2 + 1;
    });

    y += 4;

    if (q.exclusions) {
      checkPageBreak(25);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(7, 26, 45);
      doc.text('PACKAGE EXCLUSIONS:', 15, y);
      y += 5;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(71, 85, 105);

      const excList = q.exclusions.split('\n');
      excList.forEach((exc) => {
        if (!exc.trim()) return;
        const wrapped = doc.splitTextToSize(exc.trim(), 180);
        checkPageBreak(wrapped.length * 4.5);
        doc.text(wrapped, 15, y);
        y += wrapped.length * 4.2 + 1;
      });

      y += 4;
    }

    // Payment Terms & Bank Transfer Details
    checkPageBreak(35);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(7, 26, 45);
    doc.text('BANK TRANSFER & PAYMENT TERMS:', 15, y);
    y += 5;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(71, 85, 105);

    const payList = (q.paymentTerms ||
      `• 30% advance deposit required for booking confirmation & hotel blocking.
• Balance 70% payable upon arrival in Gangtok prior to tour departure.
• Bank Account: OffbeatDestination Travels | HDFC Bank Gangtok | A/C: 50200084729102 | IFSC: HDFC0001750`).split('\n');

    payList.forEach((pay) => {
      if (!pay.trim()) return;
      const wrapped = doc.splitTextToSize(pay.trim(), 180);
      checkPageBreak(wrapped.length * 4.5);
      doc.text(wrapped, 15, y);
      y += wrapped.length * 4.2 + 1;
    });

    renderFooter();

    doc.save(`Quotation_${q.quoteNumber}_${q.customerName.replace(/\s+/g, '_')}.pdf`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800">
        <div>
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <FileText className="w-5 h-5 text-amber-400" />
            <span>Quotation System Generator</span>
          </h3>
          <p className="text-xs text-slate-400">
            Generate itemized PDF & WhatsApp quotations with custom discounts, GST tax calculations & permit fee inclusions
          </p>
        </div>

        <button
          onClick={() => setIsNewModal(true)}
          className="btn-luxury-gold text-xs !py-2 !px-4 flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>New Custom Quotation</span>
        </button>
      </div>

      {saveMessage && (
        <div className="p-3 bg-amber-950 text-amber-300 border border-amber-800 rounded-xl text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{saveMessage}</span>
        </div>
      )}

      {/* Quotations List */}
      <div className="space-y-3">
        {quotations.map((q) => (
          <div
            key={q.id}
            className="bg-slate-950 p-4 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all flex flex-wrap items-center justify-between gap-4"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-[#D9BC7A]">{q.quoteNumber}</span>
                <span className="text-[10px] bg-slate-900 text-slate-300 font-bold px-2 py-0.5 rounded border border-slate-800">
                  {q.status}
                </span>
              </div>
              <h4 className="font-bold text-slate-100 text-sm">{q.customerName} - {q.packageName}</h4>
              <p className="text-xs text-slate-400">
                {q.travelDates} • {q.adultsCount} Adults • {q.vehicleModel}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <span className="text-[10px] text-slate-400 block uppercase font-bold">Total Final Quote</span>
                <span className="text-lg font-black text-amber-300">₹{(q.totalFinalAmount || 0).toLocaleString('en-IN')}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => downloadPdfQuote(q)}
                  className="px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 rounded-xl text-xs font-bold border border-amber-500/30 flex items-center gap-1.5 transition-colors"
                  title="Download Branded PDF Quotation Document"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF Quote</span>
                </button>

                <button
                  onClick={() => handleWhatsAppShare(q)}
                  className="px-3 py-1.5 bg-emerald-950 hover:bg-emerald-900 text-emerald-300 rounded-xl text-xs font-bold border border-emerald-800 flex items-center gap-1.5 transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </button>

                <button
                  onClick={() => setSelectedQuoteForPrint(q)}
                  className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl transition-colors"
                  title="View / Print Branded Quotation"
                >
                  <Printer className="w-4 h-4" />
                </button>

                <button
                  onClick={async () => {
                    if (confirm(`Delete quotation ${q.quoteNumber} for ${q.customerName}?`)) {
                      await fetch(`/api/admin/quotations/${q.id}`, { method: 'DELETE' });
                      onRefresh();
                    }
                  }}
                  className="p-2 bg-rose-950/80 hover:bg-rose-900 text-rose-300 rounded-xl transition-colors border border-rose-800"
                  title="Delete Quotation"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* New Quotation Modal */}
      {isNewModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-slate-100 text-base">Generate Official Tour Quotation</h3>
              <button onClick={() => setIsNewModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="sm:col-span-2 bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2">
                <label className="block text-amber-400 font-bold">Select Tour Package Preset</label>
                <select
                  value={form.packageName}
                  onChange={(e) => handleSelectPackagePreset(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 font-medium"
                >
                  {packages.map((pkg) => (
                    <option key={pkg.id} value={pkg.title}>
                      {pkg.title} ({pkg.duration})
                    </option>
                  ))}
                  <option value="Custom Sikkim & Darjeeling Circuit">Custom Sikkim & Darjeeling Circuit (Custom)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Customer Full Name</label>
                <input
                  type="text"
                  value={form.customerName}
                  onChange={(e) => setForm({ ...form, customerName: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">WhatsApp Phone Number</label>
                <input
                  type="text"
                  value={form.whatsappNumber}
                  onChange={(e) => setForm({ ...form, whatsappNumber: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Guest Email (Optional)</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Travel Dates</label>
                <input
                  type="text"
                  value={form.travelDates}
                  onChange={(e) => setForm({ ...form, travelDates: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Adults Count</label>
                <input
                  type="number"
                  min="1"
                  value={form.adultsCount}
                  onChange={(e) => setForm({ ...form, adultsCount: Number(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Children Count</label>
                <input
                  type="number"
                  min="0"
                  value={form.childrenCount}
                  onChange={(e) => setForm({ ...form, childrenCount: Number(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Vehicle Model Assigned</label>
                <input
                  type="text"
                  value={form.vehicleModel}
                  onChange={(e) => setForm({ ...form, vehicleModel: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100"
                  placeholder="e.g. Toyota Innova Crysta / Mahindra XUV700"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Hotel Accommodations Category</label>
                <input
                  type="text"
                  value={form.hotelCategory}
                  onChange={(e) => setForm({ ...form, hotelCategory: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100"
                  placeholder="e.g. 3★ Premium Deluxe / 4★ Luxury"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Cab Rental Cost (₹)</label>
                <input
                  type="number"
                  value={form.totalCabCost}
                  onChange={(e) => setForm({ ...form, totalCabCost: Number(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Hotel Accommodations Cost (₹)</label>
                <input
                  type="number"
                  value={form.totalHotelCost}
                  onChange={(e) => setForm({ ...form, totalHotelCost: Number(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Permits & Army Charges (₹)</label>
                <input
                  type="number"
                  value={form.permitsFee}
                  onChange={(e) => setForm({ ...form, permitsFee: Number(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Special Agency Discount (₹)</label>
                <input
                  type="number"
                  value={form.discountAmount}
                  onChange={(e) => setForm({ ...form, discountAmount: Number(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100"
                />
              </div>

              <div className="sm:col-span-2 bg-slate-950/80 p-3 rounded-xl border border-amber-500/30 flex flex-wrap items-center justify-between gap-2 text-xs">
                <div>
                  <span className="text-slate-400">Subtotal: </span>
                  <span className="font-bold text-slate-200">
                    ₹{(form.totalCabCost + form.totalHotelCost + form.permitsFee - form.discountAmount).toLocaleString('en-IN')}
                  </span>
                  <span className="text-slate-500 mx-2">|</span>
                  <span className="text-slate-400">GST (5%): </span>
                  <span className="font-bold text-slate-200">
                    ₹{Math.round((form.totalCabCost + form.totalHotelCost + form.permitsFee - form.discountAmount) * 0.05).toLocaleString('en-IN')}
                  </span>
                </div>
                <div>
                  <span className="text-amber-400 font-bold uppercase text-[10px] block">Live Calculated Total</span>
                  <span className="text-base font-black text-amber-300">
                    ₹
                    {(
                      form.totalCabCost +
                      form.totalHotelCost +
                      form.permitsFee -
                      form.discountAmount +
                      Math.round((form.totalCabCost + form.totalHotelCost + form.permitsFee - form.discountAmount) * 0.05)
                    ).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-slate-300 font-semibold mb-1">Day-by-Day Itinerary Summary</label>
                <textarea
                  rows={4}
                  value={form.itinerarySummary}
                  onChange={(e) => setForm({ ...form, itinerarySummary: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-100 font-mono text-[11px]"
                  placeholder="Enter day-by-day itinerary breakdown..."
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-slate-300 font-semibold mb-1">Package Inclusions</label>
                <textarea
                  rows={3}
                  value={form.inclusions}
                  onChange={(e) => setForm({ ...form, inclusions: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-100 text-[11px]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-slate-300 font-semibold mb-1">Package Exclusions</label>
                <textarea
                  rows={2}
                  value={form.exclusions}
                  onChange={(e) => setForm({ ...form, exclusions: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-100 text-[11px]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-slate-300 font-semibold mb-1">Payment Schedule & Terms</label>
                <textarea
                  rows={3}
                  value={form.paymentTerms}
                  onChange={(e) => setForm({ ...form, paymentTerms: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-100 text-[11px]"
                />
              </div>
            </div>

            <div className="flex flex-wrap justify-end gap-2 pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setIsNewModal(false)}
                className="px-4 py-2 bg-slate-800 text-slate-300 hover:bg-slate-700 rounded-xl text-xs font-bold transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  const subtotal = form.totalCabCost + form.totalHotelCost + form.permitsFee - form.discountAmount;
                  const gstTax = Math.round(subtotal * (form.gstPercentage / 100));
                  const totalFinalAmount = subtotal + gstTax;
                  downloadPdfQuote({
                    id: 'draft',
                    quoteNumber: 'Q-DRAFT-' + Math.floor(1000 + Math.random() * 9000),
                    createdAt: new Date().toISOString(),
                    customerName: form.customerName,
                    whatsappNumber: form.whatsappNumber,
                    email: form.email,
                    packageName: form.packageName,
                    travelDates: form.travelDates,
                    adultsCount: form.adultsCount,
                    childrenCount: form.childrenCount,
                    durationNights: form.durationNights,
                    cabDays: form.cabDays,
                    hotelCategory: form.hotelCategory,
                    vehicleModel: form.vehicleModel,
                    totalCabCost: form.totalCabCost,
                    totalHotelCost: form.totalHotelCost,
                    permitsFee: form.permitsFee,
                    discountAmount: form.discountAmount,
                    gstPercentage: form.gstPercentage,
                    subtotal,
                    gstTax,
                    totalFinalAmount,
                    itinerarySummary: form.itinerarySummary,
                    inclusions: form.inclusions,
                    exclusions: form.exclusions,
                    paymentTerms: form.paymentTerms,
                    status: 'Draft',
                  });
                }}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs flex items-center gap-1.5 shadow-lg shadow-amber-500/20 transition-all border border-amber-400"
              >
                <Download className="w-4 h-4" />
                <span>Download as PDF</span>
              </button>
              <button onClick={handleCreate} className="btn-luxury-gold text-xs !py-2 !px-5">
                <span>Save Quotation</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Printable Quotation View */}
      {selectedQuoteForPrint && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white text-slate-900 rounded-2xl max-w-xl w-full p-6 space-y-6 shadow-2xl relative my-auto">
            <button
              onClick={() => setSelectedQuoteForPrint(null)}
              className="absolute top-4 right-4 p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="border-b border-slate-200 pb-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold font-serif text-[#071A2D]">OffbeatDestination Travels</h2>
                <p className="text-xs text-slate-500 font-medium">Govt Reg: WBT/4885/2024 • Gangtok, Sikkim</p>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono font-bold text-[#C6A15B]">{selectedQuoteForPrint.quoteNumber}</span>
                <p className="text-[10px] text-slate-400">{new Date(selectedQuoteForPrint.createdAt).toLocaleDateString()}</p>
              </div>
            </div>

            {/* Details */}
            <div className="bg-slate-50 p-4 rounded-xl space-y-1 text-xs">
              <p><strong>Guest Name:</strong> {selectedQuoteForPrint.customerName}</p>
              <p><strong>Package Route:</strong> {selectedQuoteForPrint.packageName}</p>
              <p><strong>Travel Dates:</strong> {selectedQuoteForPrint.travelDates}</p>
              <p><strong>Vehicle Assigned:</strong> {selectedQuoteForPrint.vehicleModel}</p>
            </div>

            {/* Breakdown */}
            <div className="space-y-2 text-xs">
              <h4 className="font-bold text-slate-900 border-b pb-1">Itemized Price Breakdown</h4>
              <div className="flex justify-between py-1">
                <span>Cab & Driver Transfers</span>
                <span className="font-semibold">₹{(selectedQuoteForPrint.totalCabCost || 0).toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Hotel Stay Accommodations</span>
                <span className="font-semibold">₹{(selectedQuoteForPrint.totalHotelCost || 0).toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Permits & Army Sanctions</span>
                <span className="font-semibold">₹{(selectedQuoteForPrint.permitsFee || 0).toLocaleString('en-IN')}</span>
              </div>
              {selectedQuoteForPrint.discountAmount > 0 && (
                <div className="flex justify-between py-1 text-emerald-600 font-semibold">
                  <span>Special Discount Applied</span>
                  <span>-₹{(selectedQuoteForPrint.discountAmount || 0).toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between py-2 border-t font-black text-sm text-[#071A2D]">
                <span>Total Amount Payable (incl. GST)</span>
                <span className="text-[#C6A15B]">₹{(selectedQuoteForPrint.totalFinalAmount || 0).toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={() => downloadPdfQuote(selectedQuoteForPrint)}
                className="px-4 py-2 bg-[#C6A15B] hover:bg-[#b08d4b] text-[#071A2D] font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-md transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF Quote</span>
              </button>

              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-[#071A2D] hover:bg-[#0c2a48] text-white font-bold rounded-xl text-xs flex items-center gap-1.5 transition-colors"
              >
                <Printer className="w-4 h-4" />
                <span>Print / Browser PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
