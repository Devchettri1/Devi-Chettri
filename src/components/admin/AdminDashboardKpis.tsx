import React from 'react';
import {
  TrendingUp,
  MessageCircle,
  Package,
  DollarSign,
  Users,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Activity,
  Gauge,
} from 'lucide-react';
import { AuditLogEntry } from '../../types';

interface AdminDashboardKpisProps {
  stats: {
    totalLeads: number;
    newLeads: number;
    bookedLeads: number;
    totalPackages: number;
    totalQuotationValue: number;
    totalCustomers: number;
    totalDestinations: number;
    recentAuditLogs: AuditLogEntry[];
  };
  onNavigateTab: (tabKey: any) => void;
}

export const AdminDashboardKpis: React.FC<AdminDashboardKpisProps> = ({ stats, onNavigateTab }) => {
  const conversionRate = stats.totalLeads > 0 ? Math.round((stats.bookedLeads / stats.totalLeads) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Top Banner KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div
          onClick={() => onNavigateTab('leads')}
          className="bg-slate-950 p-4 rounded-2xl border border-slate-800 hover:border-emerald-500/50 cursor-pointer transition-all shadow-lg"
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">New Enquiries</span>
            <MessageCircle className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-black text-slate-100">{stats.newLeads}</div>
          <p className="text-[11px] text-slate-400 mt-1">out of {stats.totalLeads} total leads captured</p>
        </div>

        <div
          onClick={() => onNavigateTab('quotations')}
          className="bg-slate-950 p-4 rounded-2xl border border-slate-800 hover:border-amber-500/50 cursor-pointer transition-all shadow-lg"
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Estimated Pipeline</span>
            <DollarSign className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-amber-300">
            ₹{(stats.totalQuotationValue || 0).toLocaleString('en-IN')}
          </div>
          <p className="text-[11px] text-slate-400 mt-1">active quotation pipeline value</p>
        </div>

        <div
          onClick={() => onNavigateTab('leads')}
          className="bg-slate-950 p-4 rounded-2xl border border-slate-800 hover:border-teal-500/50 cursor-pointer transition-all shadow-lg"
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Conversion Rate</span>
            <TrendingUp className="w-4 h-4 text-teal-400" />
          </div>
          <div className="text-3xl font-black text-teal-300">{conversionRate}%</div>
          <p className="text-[11px] text-slate-400 mt-1">{stats.bookedLeads} confirmed bookings</p>
        </div>

        <div
          onClick={() => onNavigateTab('packages')}
          className="bg-slate-950 p-4 rounded-2xl border border-slate-800 hover:border-cyan-500/50 cursor-pointer transition-all shadow-lg"
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Active Offerings</span>
            <Package className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-3xl font-black text-slate-100">{stats.totalPackages}</div>
          <p className="text-[11px] text-slate-400 mt-1">live itineraries & destinations</p>
        </div>
      </div>

      {/* Quick Action Hub & System Audit Log Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Hub */}
        <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Backend Action Hub</span>
            </h3>
            <span className="text-[10px] bg-emerald-950 text-emerald-300 font-bold px-2 py-0.5 rounded border border-emerald-800 uppercase">
              Operational
            </span>
          </div>

          <div className="grid grid-cols-1 gap-2.5">
            <button
              onClick={() => onNavigateTab('quotations')}
              className="p-3 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl text-left flex items-center justify-between transition-colors group"
            >
              <div>
                <div className="text-xs font-bold text-amber-300 group-hover:text-amber-200">
                  Generate Branded Quotation
                </div>
                <div className="text-[11px] text-slate-400">Create itemized quote for guest</div>
              </div>
              <FileText className="w-4 h-4 text-amber-400" />
            </button>

            <button
              onClick={() => onNavigateTab('destinations')}
              className="p-3 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl text-left flex items-center justify-between transition-colors group"
            >
              <div>
                <div className="text-xs font-bold text-emerald-300 group-hover:text-emerald-200">
                  Manage Sikkim Destinations
                </div>
                <div className="text-[11px] text-slate-400">Update attractions & hero banners</div>
              </div>
              <MapPin className="w-4 h-4 text-emerald-400" />
            </button>

            <button
              onClick={() => onNavigateTab('hotels')}
              className="p-3 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl text-left flex items-center justify-between transition-colors group"
            >
              <div>
                <div className="text-xs font-bold text-teal-300 group-hover:text-teal-200">
                  Hotels & Room Categories
                </div>
                <div className="text-[11px] text-slate-400">Configure base & seasonal rates</div>
              </div>
              <Users className="w-4 h-4 text-teal-400" />
            </button>

            <button
              onClick={() => onNavigateTab('performance')}
              className="p-3 bg-indigo-950/40 hover:bg-indigo-900/60 border border-indigo-700/60 rounded-xl text-left flex items-center justify-between transition-colors group"
            >
              <div>
                <div className="text-xs font-bold text-indigo-300 group-hover:text-indigo-200 flex items-center gap-1.5">
                  <span>Speed & Web Vitals</span>
                  <span className="text-[9px] bg-indigo-900 text-indigo-200 px-1.5 py-0.2 rounded font-mono font-bold">
                    Monitor
                  </span>
                </div>
                <div className="text-[11px] text-slate-400">Track Core Web Vitals & heavy images</div>
              </div>
              <Gauge className="w-4 h-4 text-indigo-400" />
            </button>
          </div>
        </div>

        {/* Realtime System Audit Log Feed */}
        <div className="lg:col-span-2 bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
              <Activity className="w-4 h-4 text-teal-400" />
              <span>Realtime Administrative Audit Trail</span>
            </h3>
            <span className="text-[10px] text-slate-400 font-mono">
              {stats.recentAuditLogs.length} events logged
            </span>
          </div>

          <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
            {stats.recentAuditLogs.length === 0 ? (
              <div className="text-xs text-slate-500 py-6 text-center">No recent administrative actions logged.</div>
            ) : (
              stats.recentAuditLogs.map((log) => (
                <div
                  key={log.id}
                  className="p-3 bg-slate-900/80 rounded-xl border border-slate-800/80 flex items-start gap-3 text-xs"
                >
                  <div className="p-1.5 bg-emerald-950 text-emerald-400 rounded-lg font-mono font-bold text-[10px] mt-0.5">
                    {log.action}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between text-slate-300">
                      <span className="font-bold text-slate-200">{log.userName}</span>
                      <span className="text-[10px] text-slate-500 font-mono">
                        {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p className="text-slate-400 text-[11px] mt-0.5 truncate">{log.details}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
