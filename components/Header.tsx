
import React from 'react';

interface HeaderProps {
  onGenerate?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onGenerate }) => {
  return (
    <header className="py-6 px-6 md:px-12 flex items-center justify-between border-b border-indigo-500/10 bg-slate-950/60 backdrop-blur-3xl sticky top-0 z-50">
      <div className="flex items-center gap-4 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <div className="w-12 h-12 bg-gradient-to-tr from-indigo-700 to-pink-600 rounded-2xl flex items-center justify-center font-black text-2xl shadow-2xl shadow-indigo-600/20 border border-white/20 transition-transform group-hover:rotate-12">
          N
        </div>
        <div className="flex flex-col">
          <h1 className="text-2xl md:text-3xl font-black tracking-tighter brand-text neon-glow leading-none">
            NameStyle
          </h1>
          <span className="text-[9px] text-slate-500 font-bold uppercase tracking-[0.3em] mt-1">
            40,000+ Advance Designs
          </span>
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        <button 
          onClick={onGenerate}
          className="px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-indigo-600 to-indigo-800 hover:from-indigo-500 hover:to-indigo-700 border border-indigo-400/30 rounded-full text-[9px] md:text-[11px] font-black text-white uppercase tracking-widest shadow-lg shadow-indigo-900/40 transition-all hover:scale-105 active:scale-95"
        >
          Generate 40,000+ Styles
        </button>
      </div>
    </header>
  );
};

export default Header;
