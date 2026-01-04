
import React, { useState, useCallback } from 'react';

interface StyleCardProps {
  text: string;
  category: string;
}

const StyleCard: React.FC<StyleCardProps> = ({ text, category }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [text]);

  return (
    <div 
      onClick={handleCopy}
      role="button"
      className="card-glass p-6 md:p-8 rounded-[1.5rem] flex flex-col justify-between items-center text-center cursor-pointer transition-all duration-300 hover:scale-[1.03] active:scale-95 relative overflow-visible group h-auto min-h-[160px] md:min-h-[200px] w-full border border-white/5 hover:border-indigo-500/30"
    >
      {/* Category Tag */}
      <span className="absolute top-3 left-4 text-[8px] uppercase font-black text-indigo-400/70 tracking-widest bg-slate-900/90 px-2 py-0.5 rounded-md border border-white/5 z-20">
        {category}
      </span>
      
      {/* Primary Display Area - Optimized for PC/Mobile Visibility */}
      <div className="flex-1 flex items-center justify-center w-full mt-8 mb-4 overflow-visible">
        <span className="text-lg md:text-2xl font-bold whitespace-pre-wrap break-words px-1 leading-normal text-white group-hover:text-indigo-200 transition-colors w-full drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
          {text}
        </span>
      </div>

      {/* Action Footer */}
      <div className="w-full mt-auto pt-4 z-10">
        <div className={`w-full py-2.5 px-3 rounded-xl text-[9px] md:text-[11px] font-black uppercase tracking-tighter transition-all duration-300 transform ${
          copied 
            ? 'bg-green-600 text-white shadow-[0_0_15px_rgba(22,163,74,0.3)]' 
            : 'bg-indigo-600/5 text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white group-hover:shadow-[0_0_20px_rgba(79,70,229,0.3)]'
        }`}>
          {copied ? '✓ COPIED' : 'COPY STYLE'}
        </div>
      </div>

      {/* Hover Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-indigo-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-[1.5rem]" />
    </div>
  );
};

export default StyleCard;
