import React, { useState } from 'react';
import { Users, Plus, Phone, Mail, MessageCircle, Calendar, DollarSign, CheckCircle2, Search, X } from 'lucide-react';
import { CustomerRecord } from '../../types';

interface AdminCustomersProps {
  customers: CustomerRecord[];
  onRefresh: () => void;
}

export const AdminCustomers: React.FC<AdminCustomersProps> = ({ customers, onRefresh }) => {
  const [isNewModal, setIsNewModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [saveMessage, setSaveMessage] = useState('');

  const [form, setForm] = useState({
    name: '',
    phone: '',
    whatsappNumber: '',
    email: '',
    city: 'Kolkata',
    notes: 'Prefers 3-star deluxe hotel with valley view.',
  });

  const handleCreate = async () => {
    try {
      const res = await fetch('/api/admin/customers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          tripsBooked: 1,
          totalSpentAmount: 28500,
          travelHistory: ['Gangtok & North Sikkim 5D Tour'],
        }),
      });
      if (res.ok) {
        setSaveMessage('Customer Record Created!');
        setIsNewModal(false);
        onRefresh();
        setTimeout(() => setSaveMessage(''), 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery) ||
      (c.whatsapp && c.whatsapp.includes(searchQuery))
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800">
        <div>
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <Users className="w-5 h-5 text-teal-400" />
            <span>Customer CRM Database</span>
          </h3>
          <p className="text-xs text-slate-400">
            Track repeat guests, travel history, total expenditure & preferences
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search customer name or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-100 w-60"
            />
          </div>

          <button
            onClick={() => setIsNewModal(true)}
            className="btn-luxury-gold text-xs !py-2 !px-4 flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add Guest</span>
          </button>
        </div>
      </div>

      {saveMessage && (
        <div className="p-3 bg-teal-950 text-teal-300 border border-teal-800 rounded-xl text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{saveMessage}</span>
        </div>
      )}

      {/* Customer Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((c) => (
          <div
            key={c.id}
            className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3 shadow-lg hover:border-slate-700 transition-all"
          >
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-bold text-slate-100 text-sm">{c.name}</h4>
                <p className="text-[11px] text-slate-400">{c.city || 'Kolkata, WB'}</p>
              </div>
              <span className="text-[10px] bg-emerald-950 text-emerald-300 font-bold px-2 py-0.5 rounded border border-emerald-800">
                {c.totalTripsBooked || 1} Trips Booked
              </span>
            </div>

            <div className="space-y-1 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-teal-400" />
                <span>{c.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                <span>{c.email || 'N/A'}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
              <div>
                <span className="text-slate-400 text-[10px] block">Total Spent</span>
                <span className="font-bold text-[#D9BC7A]">
                  ₹{(c.totalAmountSpent || 0).toLocaleString('en-IN')}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={async () => {
                    if (confirm(`Are you sure you want to delete customer record for ${c.name}?`)) {
                      await fetch(`/api/admin/customers/${c.id}`, { method: 'DELETE' });
                      onRefresh();
                    }
                  }}
                  className="px-2.5 py-1 bg-rose-950/80 hover:bg-rose-900 text-rose-300 rounded-lg text-[10px] font-bold border border-rose-800 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* New Customer Modal */}
      {isNewModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-slate-100 text-base">Add New Customer Record</h3>
              <button onClick={() => setIsNewModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Guest Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Rahul Sharma"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">WhatsApp Phone Number</label>
                <input
                  type="text"
                  placeholder="+91 98300 00000"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value, whatsappNumber: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Email Address</label>
                <input
                  type="email"
                  placeholder="guest@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">City / Origin State</label>
                <input
                  type="text"
                  placeholder="e.g. Kolkata, West Bengal"
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
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
                <span>Save Customer</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
