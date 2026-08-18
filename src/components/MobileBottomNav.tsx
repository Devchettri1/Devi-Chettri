import React from 'react';
import { Compass, Car, Package, Sparkles, Phone } from 'lucide-react';

interface MobileBottomNavProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  onOpenAIPlanner: () => void;
  onOpenAllPackages?: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  onSelectTab,
  onOpenAIPlanner,
  onOpenAllPackages,
}) => {
  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-[#060B18]/95 backdrop-blur-lg border-t border-slate-800/90 px-3 py-2 pb-safe">
      <div className="flex items-center justify-around">
        
        {/* Home */}
        <button
          id="btn-mobile-nav-home"
          onClick={() => onSelectTab('home')}
          className={`flex flex-col items-center gap-1 transition-all ${
            activeTab === 'home'
              ? 'text-cyan-400 font-semibold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <div className={`p-1 rounded-xl transition-all ${activeTab === 'home' ? 'bg-cyan-950/80 text-cyan-300' : ''}`}>
            <Compass className="w-5 h-5" />
          </div>
          <span className="text-[10px] tracking-tight">Home</span>
        </button>

        {/* Cab Rental (Replacing Destinations) */}
        <button
          id="btn-mobile-nav-cabs"
          onClick={() => onSelectTab('cabs')}
          className={`flex flex-col items-center gap-1 transition-all ${
            activeTab === 'cabs'
              ? 'text-cyan-400 font-semibold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <div className={`p-1 rounded-xl transition-all ${activeTab === 'cabs' ? 'bg-cyan-950/80 text-cyan-300' : ''}`}>
            <Car className="w-5 h-5" />
          </div>
          <span className="text-[10px] tracking-tight">Cab Rental</span>
        </button>

        {/* AI Planner (Center Highlighted) */}
        <button
          id="btn-mobile-nav-ai-planner"
          onClick={onOpenAIPlanner}
          className="flex flex-col items-center gap-1 -mt-4 transition-transform active:scale-95"
        >
          <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-indigo-600 via-blue-500 to-cyan-400 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20 border-2 border-[#060B18]">
            <Sparkles className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-semibold text-cyan-300">AI Plan</span>
        </button>

        {/* Packages (Opens All Tour Packages) */}
        <button
          id="btn-mobile-nav-packages"
          onClick={() => {
            onSelectTab('packages');
            if (onOpenAllPackages) {
              onOpenAllPackages();
            }
          }}
          className={`flex flex-col items-center gap-1 transition-all ${
            activeTab === 'packages'
              ? 'text-cyan-400 font-semibold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <div className={`p-1 rounded-xl transition-all ${activeTab === 'packages' ? 'bg-cyan-950/80 text-cyan-300' : ''}`}>
            <Package className="w-5 h-5" />
          </div>
          <span className="text-[10px] tracking-tight">Packages</span>
        </button>

        {/* Contact */}
        <button
          id="btn-mobile-nav-contact"
          onClick={() => onSelectTab('contact')}
          className={`flex flex-col items-center gap-1 transition-all ${
            activeTab === 'contact'
              ? 'text-cyan-400 font-semibold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <div className={`p-1 rounded-xl transition-all ${activeTab === 'contact' ? 'bg-cyan-950/80 text-cyan-300' : ''}`}>
            <Phone className="w-5 h-5" />
          </div>
          <span className="text-[10px] tracking-tight">Contact</span>
        </button>

      </div>
    </div>
  );
};
