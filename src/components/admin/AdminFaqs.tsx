import React, { useState } from 'react';
import { HelpCircle, Plus, Trash2, Edit2, Save, X, CheckCircle2 } from 'lucide-react';
import { FaqItem } from '../../types';

interface AdminFaqsProps {
  faqs: FaqItem[];
  onRefresh: () => void;
}

export const AdminFaqs: React.FC<AdminFaqsProps> = ({ faqs, onRefresh }) => {
  const [editingFaq, setEditingFaq] = useState<FaqItem | null>(null);
  const [isNewModal, setIsNewModal] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const [form, setForm] = useState({
    category: 'Permits & Documents',
    question: '',
    answer: '',
  });

  const handleCreate = async () => {
    try {
      const res = await fetch('/api/admin/faqs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSaveMessage('FAQ Created & Published!');
        setIsNewModal(false);
        onRefresh();
        setTimeout(() => setSaveMessage(''), 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async () => {
    if (!editingFaq) return;
    try {
      const res = await fetch(`/api/admin/faqs/${editingFaq.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingFaq),
      });
      if (res.ok) {
        setSaveMessage('FAQ Updated!');
        setEditingFaq(null);
        onRefresh();
        setTimeout(() => setSaveMessage(''), 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this FAQ entry?')) {
      try {
        const res = await fetch(`/api/admin/faqs/${id}`, { method: 'DELETE' });
        if (res.ok) onRefresh();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800">
        <div>
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-teal-400" />
            <span>FAQ Management CMS</span>
          </h3>
          <p className="text-xs text-slate-400">
            Edit answers regarding permits, pickup locations, weather & Gangtok travel policies
          </p>
        </div>

        <button
          onClick={() => setIsNewModal(true)}
          className="btn-luxury-gold text-xs !py-2 !px-4 flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Add FAQ Item</span>
        </button>
      </div>

      {saveMessage && (
        <div className="p-3 bg-teal-950 text-teal-300 border border-teal-800 rounded-xl text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{saveMessage}</span>
        </div>
      )}

      {/* FAQs List */}
      <div className="space-y-3">
        {faqs.map((f) => (
          <div
            key={f.id}
            className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2 relative group"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-[10px] bg-slate-900 text-teal-300 font-bold px-2 py-0.5 rounded border border-slate-800 uppercase">
                  {f.category}
                </span>
                <h4 className="font-bold text-slate-100 text-sm mt-1">{f.question}</h4>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setEditingFaq(f)}
                  className="p-1.5 text-slate-400 hover:text-slate-100 bg-slate-900 rounded-lg transition-colors"
                >
                  <Edit2 className="w-4 h-4 text-[#C6A15B]" />
                </button>
                <button
                  onClick={() => handleDelete(f.id)}
                  className="p-1.5 text-rose-400 hover:text-rose-200 bg-rose-950/40 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">{f.answer}</p>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingFaq && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-slate-100 text-base">Edit FAQ</h3>
              <button onClick={() => setEditingFaq(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Question</label>
                <input
                  type="text"
                  value={editingFaq.question}
                  onChange={(e) => setEditingFaq({ ...editingFaq, question: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Answer</label>
                <textarea
                  rows={4}
                  value={editingFaq.answer}
                  onChange={(e) => setEditingFaq({ ...editingFaq, answer: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-slate-800">
              <button
                onClick={() => setEditingFaq(null)}
                className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-bold"
              >
                Cancel
              </button>
              <button onClick={handleUpdate} className="btn-luxury-gold text-xs !py-2 !px-5">
                <span>Save FAQ</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Modal */}
      {isNewModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-slate-100 text-base">Add New FAQ Item</h3>
              <button onClick={() => setIsNewModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Category</label>
                <input
                  type="text"
                  placeholder="e.g. Permits & Documents"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Question</label>
                <input
                  type="text"
                  placeholder="e.g. Do I need passport photos for Nathula Pass permit?"
                  value={form.question}
                  onChange={(e) => setForm({ ...form, question: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Detailed Answer</label>
                <textarea
                  rows={4}
                  placeholder="Provide clear, human-designed answer..."
                  value={form.answer}
                  onChange={(e) => setForm({ ...form, answer: e.target.value })}
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
                <span>Create FAQ</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
