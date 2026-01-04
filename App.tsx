import React, { useState, useMemo, useCallback, useDeferredValue } from 'react';
import Header from './components/Header';
import StyleCard from './components/StyleCard';
import { generateAllStyles } from './services/styleEngine';
import { StyleCategory } from './types';
import { SYMBOLS_GAMER, SYMBOLS_AESTHETIC, FONT_MAPS, SYMBOLS_ARROW } from './constants';

const MemoizedStyleCard = React.memo(StyleCard);

const App: React.FC = () => {
  const [inputText, setInputText] = useState('Your Name');
  const deferredInputText = useDeferredValue(inputText);
  
  const [activeCategory, setActiveCategory] = useState<StyleCategory | 'ALL' | 'CUSTOM'>('ALL');
  const [visibleCount, setVisibleCount] = useState(200);
  const [refreshKey, setRefreshKey] = useState(0);

  const [customPrefix, setCustomPrefix] = useState('🏹');
  const [customSuffix, setCustomSuffix] = useState('🏹');
  const [customFont, setCustomFont] = useState<string | null>(null);

  // Re-generates all styles whenever refreshKey or text changes
  const allGeneratedStyles = useMemo(() => generateAllStyles(deferredInputText), [deferredInputText, refreshKey]);

  const filteredStyles = useMemo(() => {
    if (activeCategory === 'ALL') return allGeneratedStyles;
    if (activeCategory === 'CUSTOM') return [];
    return allGeneratedStyles.filter(s => s.category === activeCategory);
  }, [allGeneratedStyles, activeCategory]);

  const displayedStyles = useMemo(() => filteredStyles.slice(0, visibleCount), [filteredStyles, visibleCount]);

  const handleGenerateRefresh = useCallback(() => {
    setRefreshKey(prev => prev + 1);
    setVisibleCount(200);
  }, []);

  const categories = useMemo(() => [
    { label: 'ALL', value: 'ALL', icon: '✨' },
    { label: 'ARROW', value: StyleCategory.ARROW, icon: '🏹' },
    { label: 'GAMER', value: StyleCategory.GAMER, icon: '🎮' },
    { label: 'BANGLA', value: StyleCategory.BANGLA, icon: '✒️' },
    { label: 'ENGLISH', value: StyleCategory.ENGLISH, icon: '🟦' },
    { label: 'GRAPHIC', value: StyleCategory.GRAPHIC, icon: '🎨' },
    { label: 'FREE', value: StyleCategory.FREE, icon: '💼' },
    { label: 'FANCY', value: StyleCategory.FANCY, icon: '🌟' },
    { label: 'AESTHET', value: StyleCategory.AESTHETIC, icon: '🎀' },
    { label: 'SYMBOL', value: StyleCategory.SYMBOL, icon: '🔱' },
    { label: 'CUSTOM', value: 'CUSTOM', icon: '🛠️' }
  ], []);

  const transformText = useCallback((text: string, mapName: string | null): string => {
    if (!mapName) return text;
    const map = (FONT_MAPS as any)[mapName];
    if (!map) return text;
    return text.split('').map((char: string) => map[char] || char).join('');
  }, []);

  const customPreview = useMemo(() => `${customPrefix}${transformText(inputText, customFont)}${customSuffix}`, [customPrefix, inputText, customFont, customSuffix, transformText]);

  return (
    <div className="flex flex-col min-h-screen bg-[#020617] text-slate-100 pb-32">
      <Header onGenerate={handleGenerateRefresh} />
      
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        
        {/* Banner Ad Box Removed */}

        <section className="text-center mb-10">
          <header>
            <h2 className="text-4xl md:text-7xl font-black mb-8 text-white tracking-tighter neon-glow uppercase">
              UNLIMITED <span className="brand-text">STYLE</span>
            </h2>
          </header>
          <div className="max-w-4xl mx-auto relative group">
            <input
              type="text"
              value={inputText}
              onChange={(e) => {
                setInputText(e.target.value);
                setVisibleCount(200);
              }}
              placeholder="Enter Your Name..."
              className="w-full bg-slate-950 border-4 border-slate-900 focus:border-indigo-600 rounded-[2.5rem] py-10 px-8 text-3xl md:text-6xl outline-none transition-all shadow-2xl text-center font-black placeholder:text-slate-800"
            />
            {inputText !== deferredInputText && (
               <div className="absolute right-10 top-1/2 -translate-y-1/2 text-indigo-500 font-black animate-pulse uppercase text-[10px] tracking-widest">Generating...</div>
            )}
          </div>
        </section>

        {/* 11 OPTION CATEGORY BAR */}
        <section className="mb-12 bg-black/80 backdrop-blur-3xl p-6 md:p-8 rounded-[3rem] shadow-4xl border border-white/5 mx-auto max-w-5xl">
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => {
                  setActiveCategory(cat.value as any);
                  setVisibleCount(200);
                }}
                className={`category-btn flex flex-col items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-2xl md:rounded-[2.5rem] ${activeCategory === cat.value ? 'active' : ''}`}
              >
                <span className="text-2xl md:text-3xl mb-1">{cat.icon}</span>
                <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest opacity-90">{cat.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Native Ad Box Removed */}

        {activeCategory === 'CUSTOM' ? (
          <section className="card-glass p-12 rounded-[4rem] animate-fade-in border-indigo-500/10">
             <div className="flex items-center gap-6 mb-16">
                <div className="w-16 h-16 bg-indigo-600 rounded-3xl flex items-center justify-center text-3xl">🛠️</div>
                <h3 className="text-4xl md:text-6xl font-black brand-text uppercase tracking-tighter">Elite Engine</h3>
             </div>
             <div className="grid lg:grid-cols-2 gap-16">
                <div className="space-y-12">
                   <div>
                      <label className="block text-indigo-400 text-[10px] font-black mb-6 uppercase tracking-[0.4em]">1. Select Pro Font</label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        <button onClick={() => setCustomFont(null)} className={`p-4 text-[11px] font-black rounded-2xl border-2 transition-all ${!customFont ? 'bg-indigo-600 border-indigo-400 shadow-lg' : 'bg-slate-900 border-white/5'}`}>ORIGINAL</button>
                        {Object.keys(FONT_MAPS).map(f => (
                           <button key={f} onClick={() => setCustomFont(f)} className={`p-4 text-[11px] font-black rounded-2xl border-2 uppercase transition-all ${customFont === f ? 'bg-indigo-600 border-indigo-400 shadow-lg' : 'bg-slate-900 border-white/5'}`}>{f}</button>
                        ))}
                      </div>
                   </div>
                   <div className="grid grid-cols-2 gap-8">
                      <div>
                        <label className="block text-indigo-400 text-[10px] font-black mb-6 uppercase tracking-[0.4em]">2. Prefix Symbol</label>
                        <div className="grid grid-cols-4 gap-3 h-52 overflow-y-auto bg-black/40 p-4 rounded-3xl custom-scrollbar border border-white/5">
                           {[...SYMBOLS_ARROW, ...SYMBOLS_GAMER, ...SYMBOLS_AESTHETIC].map((s, i) => (
                              <button key={i} onClick={() => setCustomPrefix(s)} className={`text-2xl p-2 rounded-xl transition-colors ${customPrefix === s ? 'bg-indigo-600' : 'hover:bg-slate-800'}`}>{s}</button>
                           ))}
                        </div>
                      </div>
                      <div>
                        <label className="block text-indigo-400 text-[10px] font-black mb-6 uppercase tracking-[0.4em]">3. Suffix Symbol</label>
                        <div className="grid grid-cols-4 gap-3 h-52 overflow-y-auto bg-black/40 p-4 rounded-3xl custom-scrollbar border border-white/5">
                           {[...SYMBOLS_ARROW, ...SYMBOLS_GAMER, ...SYMBOLS_AESTHETIC].map((s, i) => (
                              <button key={i} onClick={() => setCustomSuffix(s)} className={`text-2xl p-2 rounded-xl transition-colors ${customSuffix === s ? 'bg-indigo-600' : 'hover:bg-slate-800'}`}>{s}</button>
                           ))}
                        </div>
                      </div>
                   </div>
                </div>
                <div className="flex flex-col items-center justify-center bg-slate-950/50 p-12 rounded-[4rem] border-2 border-indigo-500/20 shadow-inner relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 blur-[100px] rounded-full"></div>
                   <p className="text-indigo-400 text-[10px] font-black mb-8 uppercase tracking-[0.6em] opacity-60">Elite Preview</p>
                   <div className="text-4xl md:text-7xl font-black text-center whitespace-pre-wrap break-all mb-12 text-white drop-shadow-2xl">{customPreview}</div>
                   <button onClick={() => navigator.clipboard.writeText(customPreview)} className="group relative w-full py-8 bg-indigo-600 text-white font-black rounded-3xl text-2xl overflow-hidden transition-transform hover:scale-[1.02] active:scale-95 shadow-2xl shadow-indigo-600/40">
                      <span className="relative z-10">COPY CUSTOM DESIGN ⚡</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                   </button>
                </div>
             </div>
          </section>
        ) : (
          <>
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
              {displayedStyles.map((style) => (
                <React.Fragment key={style.id}>
                   <MemoizedStyleCard text={style.text} category={style.category} />
                </React.Fragment>
              ))}
            </section>

            {visibleCount < filteredStyles.length && (
              <div className="mt-16 flex flex-col items-center gap-12">
                <button
                  onClick={handleGenerateRefresh}
                  className="px-20 py-8 bg-slate-950 border-4 border-indigo-600 text-white font-black text-2xl md:text-3xl rounded-[3rem] hover:bg-indigo-600 transition-all shadow-4xl hover:shadow-indigo-600/50 scale-100 hover:scale-105 active:scale-95 uppercase tracking-tighter"
                >
                  Generate Unlimited Designs ⚡
                </button>
              </div>
            )}
          </>
        )}
      </main>

      {/* SocialBar Ad Box Removed */}

      <footer className="bg-slate-950 border-t-4 border-indigo-500/5 py-24 px-12">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-16">
           <div className="max-w-xl">
              <h4 className="text-3xl font-black brand-text mb-6 tracking-tighter uppercase">Unlimited Style Factory</h4>
              <p className="text-slate-500 font-bold leading-relaxed text-base">The global gold standard for professional gaming nicknames and font decorations. Supporting unlimited permutations for PUBG, Free Fire, and Social Media. Engineered for speed and high visibility.</p>
           </div>
           <div className="flex flex-wrap gap-4 justify-center">
              {['#UnlimitedStyles', '#ProNames', '#FFDesign', '#EliteFonts', '#Aesthetic', '#SocialBio'].map(tag => (
                <span key={tag} className="px-6 py-2 bg-indigo-600/10 text-indigo-400 rounded-full text-[10px] font-black border border-indigo-500/20 uppercase tracking-[0.2em]">{tag}</span>
              ))}
           </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
