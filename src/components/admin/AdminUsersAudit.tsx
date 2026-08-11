import React, { useState } from 'react';
import { ShieldCheck, Plus, UserCheck, Activity, Clock, Lock, Key, CheckCircle2, X } from 'lucide-react';
import { StaffUser, AuditLogEntry } from '../../types';

interface AdminUsersAuditProps {
  users: StaffUser[];
  auditLogs: AuditLogEntry[];
  onRefresh: () => void;
}

export const AdminUsersAudit: React.FC<AdminUsersAuditProps> = ({ users, auditLogs, onRefresh }) => {
  const [isNewUserModal, setIsNewUserModal] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const [form, setForm] = useState({
    name: 'Pema Bhutia',
    email: 'pema@offbeatdestination.in',
    role: 'STAFF' as 'OWNER' | 'ADMIN' | 'STAFF' | 'EDITOR',
    phone: '+91 97331 81750',
  });

  const handleCreateUser = async () => {
    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSaveMessage('Staff Account Provisioned!');
        setIsNewUserModal(false);
        onRefresh();
        setTimeout(() => setSaveMessage(''), 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800">
        <div>
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span>Role-Based Access Control & Staff Users</span>
          </h3>
          <p className="text-xs text-slate-400">
            Manage agency administrative permissions (OWNER, ADMIN, STAFF, EDITOR) & view security audit logs
          </p>
        </div>

        <button
          onClick={() => setIsNewUserModal(true)}
          className="btn-luxury-gold text-xs !py-2 !px-4 flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Provision Staff Member</span>
        </button>
      </div>

      {saveMessage && (
        <div className="p-3 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{saveMessage}</span>
        </div>
      )}

      {/* Staff Accounts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((u) => (
          <div
            key={u.id}
            className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-slate-100 text-sm">{u.name}</h4>
                <p className="text-[11px] text-slate-400 font-mono">{u.email}</p>
              </div>

              <span className="text-[10px] bg-emerald-950 text-emerald-400 font-bold px-2 py-0.5 rounded border border-emerald-800 uppercase">
                {u.role}
              </span>
            </div>

            <div className="text-[11px] text-slate-400 flex items-center justify-between border-t border-slate-800 pt-2">
              <span>Status: <strong className="text-emerald-400">{u.status}</strong></span>
              <span>PIN Auth: <strong className="text-amber-300 font-mono">****</strong></span>
            </div>
          </div>
        ))}
      </div>

      {/* System Audit Log History Table */}
      <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h4 className="text-sm font-bold text-slate-200 flex items-center gap-2">
            <Activity className="w-4 h-4 text-teal-400" />
            <span>Complete Audit Log History</span>
          </h4>
          <span className="text-[11px] text-slate-400">{auditLogs.length} total entries</span>
        </div>

        <div className="space-y-2 max-h-80 overflow-y-auto">
          {auditLogs.map((log) => (
            <div
              key={log.id}
              className="p-3 bg-slate-900 rounded-xl border border-slate-800/80 flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-3">
                <span className="px-2 py-0.5 bg-emerald-950 text-emerald-400 font-mono font-bold text-[10px] rounded border border-emerald-800 uppercase">
                  {log.action}
                </span>
                <div>
                  <div className="text-slate-200 font-bold">{log.userName} ({log.role})</div>
                  <div className="text-slate-400 text-[11px]">{log.details}</div>
                </div>
              </div>

              <div className="text-[10px] text-slate-500 font-mono whitespace-nowrap">
                {log.timestamp ? new Date(log.timestamp).toLocaleString() : ''}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* New User Modal */}
      {isNewUserModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-slate-100 text-base">Provision Staff Account</h3>
              <button onClick={() => setIsNewUserModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Full Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Email Address</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Role Permission Level</label>
                <select
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value as any })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100"
                >
                  <option value="STAFF">STAFF (Manage Leads & Quotations)</option>
                  <option value="EDITOR">EDITOR (Manage Packages & FAQs)</option>
                  <option value="ADMIN">ADMIN (Full Operational Access)</option>
                  <option value="OWNER">OWNER (Full Business & Staff Control)</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-slate-800">
              <button
                onClick={() => setIsNewUserModal(false)}
                className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-bold"
              >
                Cancel
              </button>
              <button onClick={handleCreateUser} className="btn-luxury-gold text-xs !py-2 !px-5">
                <span>Provision User</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
