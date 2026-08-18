import React, { useState, useEffect } from 'react';
import { NavigationItem } from '../../types';
import { Plus, Trash2, Save, MoveUp, MoveDown, CheckCircle2, Navigation, Layers, RotateCcw } from 'lucide-react';

interface AdminNavigationProps {
  onRefresh?: () => void;
}

export const AdminNavigation: React.FC<AdminNavigationProps> = ({ onRefresh }) => {
  const [navItems, setNavItems] = useState<NavigationItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const [newItem, setNewItem] = useState<{
    label: string;
    tabId: string;
    hasDropdown: boolean;
    dropdownType: 'packages' | 'cabs' | 'destinations' | 'hotels' | 'custom';
    badgeText: string;
  }>({
    label: '',
    tabId: '',
    hasDropdown: false,
    dropdownType: 'custom',
    badgeText: '',
  });

  const fetchNavItems = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/navigation');
      if (res.ok) {
        const data = await res.json();
        setNavItems(data);
      }
    } catch (err) {
      console.error('Error fetching navigation items:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNavItems();
  }, []);

  const handleSaveAll = async () => {
    setSaveSuccess(false);
    setErrorMessage('');
    try {
      const res = await fetch('/api/admin/navigation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ navigation: navItems }),
      });
      if (res.ok) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      } else {
        setErrorMessage('Failed to save navigation links to database.');
      }
    } catch (err) {
      setErrorMessage('Network error saving navigation links.');
    }
  };

  const handleToggleActive = (id: string) => {
    setNavItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, active: !item.active } : item))
    );
  };

  const handleUpdateItem = (id: string, field: keyof NavigationItem, value: any) => {
    setNavItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleMoveOrder = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === navItems.length - 1)
    ) {
      return;
    }
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    const updated = [...navItems];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;

    // Recalculate order values
    const reordered = updated.map((item, idx) => ({ ...item, order: idx }));
    setNavItems(reordered);
  };

  const handleDelete = (id: string) => {
    setNavItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleAddItem = () => {
    if (!newItem.label.trim() || !newItem.tabId.trim()) return;

    const created: NavigationItem = {
      id: `nav-${Date.now()}`,
      label: newItem.label.trim(),
      tabId: newItem.tabId.trim().toLowerCase().replace(/\s+/g, '-'),
      hasDropdown: newItem.hasDropdown,
      dropdownType: newItem.dropdownType,
      active: true,
      order: navItems.length,
      badgeText: newItem.badgeText.trim() || undefined,
    };

    setNavItems((prev) => [...prev, created]);
    setNewItem({
      label: '',
      tabId: '',
      hasDropdown: false,
      dropdownType: 'custom',
      badgeText: '',
    });
  };

  if (isLoading) {
    return (
      <div className="p-8 text-center text-slate-400">
        <div className="w-8 h-8 border-2 border-[#C6A15B] border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
        Loading database navigation links table...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 bg-[#153451]/30 p-4 rounded-xl border border-[#C6A15B]/20">
        <div>
          <h3 className="text-base font-bold text-[#D9BC7A] flex items-center gap-2">
            <Navigation className="w-5 h-5 text-[#C6A15B]" />
            Database Navigation Links Table
          </h3>
          <p className="text-xs text-slate-300 mt-0.5">
            Configure header menu items, dropdown categories, display order, and active states. All changes save directly to the backend database table.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={fetchNavItems}
            className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-semibold rounded-lg flex items-center gap-1 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reload</span>
          </button>
          <button
            onClick={handleSaveAll}
            className="px-4 py-1.5 bg-[#C6A15B] hover:bg-[#b8914b] text-slate-950 font-bold text-xs rounded-lg flex items-center gap-1.5 shadow-md transition-all"
          >
            <Save className="w-4 h-4" />
            <span>Save to Database</span>
          </button>
        </div>
      </div>

      {saveSuccess && (
        <div className="p-3 bg-emerald-950/80 border border-emerald-600/50 rounded-lg text-emerald-300 text-xs flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>Database navigation table updated successfully! Header component will reflect active links.</span>
        </div>
      )}

      {errorMessage && (
        <div className="p-3 bg-rose-950/80 border border-rose-600/50 rounded-lg text-rose-300 text-xs">
          {errorMessage}
        </div>
      )}

      {/* Existing Database Navigation Links Table */}
      <div className="bg-[#071A2D] rounded-xl border border-white/10 overflow-hidden shadow-xl">
        <div className="p-3 bg-[#153451] text-xs font-bold text-[#D9BC7A] flex items-center justify-between border-b border-white/10">
          <span>Active Header Navigation Rows ({navItems.length} Links)</span>
          <span className="text-[10px] text-slate-400 font-normal">Reorder with arrows, edit labels, or toggle visibility</span>
        </div>

        <div className="divide-y divide-white/10">
          {navItems.map((item, index) => (
            <div
              key={item.id}
              className={`p-3.5 flex flex-wrap items-center justify-between gap-3 transition-colors ${
                !item.active ? 'opacity-50 bg-black/20' : 'hover:bg-[#153451]/40'
              }`}
            >
              <div className="flex items-center gap-3 min-w-[240px] flex-1">
                {/* Reorder Buttons */}
                <div className="flex flex-col gap-1">
                  <button
                    disabled={index === 0}
                    onClick={() => handleMoveOrder(index, 'up')}
                    className="p-1 hover:bg-white/10 rounded text-slate-300 disabled:opacity-30 disabled:hover:bg-transparent"
                    title="Move Up"
                  >
                    <MoveUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    disabled={index === navItems.length - 1}
                    onClick={() => handleMoveOrder(index, 'down')}
                    className="p-1 hover:bg-white/10 rounded text-slate-300 disabled:opacity-30 disabled:hover:bg-transparent"
                    title="Move Down"
                  >
                    <MoveDown className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 flex-1">
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-0.5">Label Name</label>
                    <input
                      type="text"
                      value={item.label}
                      onChange={(e) => handleUpdateItem(item.id, 'label', e.target.value)}
                      className="w-full bg-[#071A2D] border border-white/10 rounded px-2.5 py-1 text-xs text-slate-100 font-semibold focus:border-[#C6A15B] outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-0.5">Target Tab ID</label>
                    <input
                      type="text"
                      value={item.tabId}
                      onChange={(e) => handleUpdateItem(item.id, 'tabId', e.target.value)}
                      className="w-full bg-[#071A2D] border border-white/10 rounded px-2.5 py-1 text-xs text-slate-300 font-mono focus:border-[#C6A15B] outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Options */}
              <div className="flex items-center gap-3 text-xs flex-wrap">
                <label className="flex items-center gap-1.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={item.hasDropdown || false}
                    onChange={(e) => handleUpdateItem(item.id, 'hasDropdown', e.target.checked)}
                    className="rounded border-slate-700 bg-slate-900 text-[#C6A15B] focus:ring-0"
                  />
                  <span className="text-slate-300 text-xs">Dropdown Menu</span>
                </label>

                {item.hasDropdown && (
                  <select
                    value={item.dropdownType || 'custom'}
                    onChange={(e) => handleUpdateItem(item.id, 'dropdownType', e.target.value)}
                    className="bg-[#071A2D] border border-white/10 rounded px-2 py-1 text-xs text-slate-200 outline-none"
                  >
                    <option value="packages">Tour Packages DB</option>
                    <option value="cabs">Cab Rentals DB</option>
                    <option value="destinations">Destinations DB</option>
                    <option value="hotels">Hotels DB</option>
                    <option value="custom">Custom Content</option>
                  </select>
                )}

                <button
                  onClick={() => handleToggleActive(item.id)}
                  className={`px-2.5 py-1 rounded text-xs font-bold border transition-colors ${
                    item.active
                      ? 'bg-emerald-950 text-emerald-400 border-emerald-700/50'
                      : 'bg-slate-800 text-slate-400 border-slate-700'
                  }`}
                >
                  {item.active ? 'Active' : 'Hidden'}
                </button>

                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-1.5 text-rose-400 hover:text-rose-200 hover:bg-rose-950/50 rounded transition-colors"
                  title="Delete Navigation Link"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add New Navigation Link Form */}
      <div className="bg-[#153451]/30 p-4 rounded-xl border border-white/10 space-y-3">
        <h4 className="text-xs font-bold text-[#D9BC7A] flex items-center gap-1.5">
          <Plus className="w-4 h-4 text-[#C6A15B]" />
          Add New Navigation Link to Database
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="text-[10px] text-slate-300 block mb-1 font-semibold">Link Label *</label>
            <input
              type="text"
              placeholder="e.g., Sikkim Packages, Silk Route"
              value={newItem.label}
              onChange={(e) => setNewItem({ ...newItem, label: e.target.value })}
              className="w-full bg-[#071A2D] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-slate-100 focus:border-[#C6A15B] outline-none"
            />
          </div>

          <div>
            <label className="text-[10px] text-slate-300 block mb-1 font-semibold font-mono">Target Tab / Page ID *</label>
            <input
              type="text"
              placeholder="e.g., packages, silk-route, cabs"
              value={newItem.tabId}
              onChange={(e) => setNewItem({ ...newItem, tabId: e.target.value })}
              className="w-full bg-[#071A2D] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-slate-100 focus:border-[#C6A15B] outline-none font-mono"
            />
          </div>

          <div>
            <label className="text-[10px] text-slate-300 block mb-1 font-semibold">Dropdown Type</label>
            <div className="flex items-center gap-2">
              <label className="flex items-center gap-1 text-xs text-slate-200">
                <input
                  type="checkbox"
                  checked={newItem.hasDropdown}
                  onChange={(e) => setNewItem({ ...newItem, hasDropdown: e.target.checked })}
                  className="rounded border-slate-700 bg-slate-900 text-[#C6A15B]"
                />
                Enable Dropdown
              </label>

              {newItem.hasDropdown && (
                <select
                  value={newItem.dropdownType}
                  onChange={(e) => setNewItem({ ...newItem, dropdownType: e.target.value as any })}
                  className="bg-[#071A2D] border border-white/10 rounded px-2 py-1 text-xs text-slate-200 outline-none flex-1"
                >
                  <option value="packages">Packages DB</option>
                  <option value="cabs">Cabs DB</option>
                  <option value="destinations">Destinations DB</option>
                  <option value="hotels">Hotels DB</option>
                  <option value="custom">Custom</option>
                </select>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-1">
          <button
            onClick={handleAddItem}
            disabled={!newItem.label.trim() || !newItem.tabId.trim()}
            className="px-4 py-1.5 bg-[#153451] hover:bg-[#1f476e] text-[#D9BC7A] border border-[#C6A15B]/40 text-xs font-bold rounded-lg flex items-center gap-1.5 transition-all disabled:opacity-40"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Row to Table</span>
          </button>
        </div>
      </div>
    </div>
  );
};
