import React, { useState } from 'react';
import { FileText, Plus, Share2, Printer, CheckCircle2, DollarSign, Calendar, Users, Car, Building2, X, Trash2 } from 'lucide-react';
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
    internalNotes: 'Guest requested early morning pickup at NJP Railway station.',
  });

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
    const msg = `*OFFBEATDESTINATION TRAVELS - TOUR QUOTATION*\n\n` +
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
                  onClick={() => handleWhatsAppShare(q)}
                  className="px-3 py-1.5 bg-emerald-950 hover:bg-emerald-900 text-emerald-300 rounded-xl text-xs font-bold border border-emerald-800 flex items-center gap-1.5"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>WhatsApp Quote</span>
                </button>

                <button
                  onClick={() => setSelectedQuoteForPrint(q)}
                  className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl transition-colors"
                  title="View / Print Branded Quotation PDF"
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
                <label className="block text-slate-300 font-semibold mb-1">WhatsApp Number</label>
                <input
                  type="text"
                  value={form.whatsappNumber}
                  onChange={(e) => setForm({ ...form, whatsappNumber: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Tour Package Route</label>
                <input
                  type="text"
                  value={form.packageName}
                  onChange={(e) => setForm({ ...form, packageName: e.target.value })}
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
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-slate-800">
              <button
                onClick={() => setIsNewModal(false)}
                className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-bold"
              >
                Cancel
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
                onClick={() => window.print()}
                className="px-4 py-2 bg-[#071A2D] text-white font-bold rounded-xl text-xs flex items-center gap-1.5"
              >
                <Printer className="w-4 h-4" />
                <span>Print / Save as PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
