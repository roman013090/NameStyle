
import { GeneratedStyle, StyleCategory } from '../types';
import { FONT_MAPS, SYMBOLS_GAMER, SYMBOLS_AESTHETIC, SYMBOL_COMBINATIONS, SYMBOLS_ARROW, SYMBOLS_BANGLA } from '../constants';

const transformText = (text: string, mapName: string): string => {
  const map = FONT_MAPS[mapName];
  if (!map) return text;
  let result = '';
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    result += map[char] || char;
  }
  return result;
};

// Helper for deep randomization
const getRandomElement = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

export const generateAllStyles = (inputText: string): GeneratedStyle[] => {
  if (!inputText || inputText.length === 0) return [];
  
  const results: GeneratedStyle[] = [];
  const text = inputText.trim();
  const fontKeys = [null, ...Object.keys(FONT_MAPS)];
  let idCounter = 0;

  const categories = Object.values(StyleCategory);
  const targetTotal = 42000;
  const perCategory = Math.ceil(targetTotal / categories.length);

  categories.forEach(cat => {
    for (let i = 0; i < perCategory; i++) {
      const rFont = getRandomElement(fontKeys);
      const styled = rFont ? transformText(text, rFont) : text;
      
      const rArrow = getRandomElement(SYMBOLS_ARROW);
      const rGamer = getRandomElement(SYMBOLS_GAMER);
      const rAest = getRandomElement(SYMBOLS_AESTHETIC);
      const rCombo = getRandomElement(SYMBOL_COMBINATIONS);
      const rBan = getRandomElement(SYMBOLS_BANGLA);

      let final = styled;
      
      switch(cat) {
        case StyleCategory.ARROW:
          final = `${rArrow} ${styled} ${rArrow}`;
          break;
        case StyleCategory.GAMER:
          const gamerTemplates = [
            `★${styled.toUpperCase()}★࿐ff`,
            `༄MR ᭄ ${styled} ☯࿐`,
            `BOss ᭄ ${styled} ★࿐`,
            `☆☬ ${styled.toUpperCase()} ☬☆`,
            `꧁— ${styled.toUpperCase()} —꧂`,
            `☯${styled.toUpperCase()}☯࿐`,
            `亗AB ♕ ${styled.toUpperCase()} ࿐`,
            `༄᭄${styled}࿐`,
            `TN ᭄ ${styled} ࿐★018 ind`,
            `MR ╳ ${styled} BOss`,
            `R O M A N`, 
            `BS~${styled}™`,
            `꧁ 👑 ${styled} 👑 ꧂`,
            `༒ ⚔️ ${styled} ⚔️ ༒`,
            `༄ᶦᶰᵈ᭄ ${styled} ࿐`,
            `𓆩 ${styled} 𓆪`,
            `亗 ${styled} 亗`,
            `『 ${styled} 』`,
            `꧁༺ ${styled} ༻꧂`,
            `꧁ ☬ ${styled.toUpperCase()} ☬ ꧂`,
            `⚔️ ${styled} ⚔️`,
            `🔥 ${styled} 🔥`,
            `${rGamer} ${styled} ${rGamer}`,
            `༄ᶦᶰᵈ᭄ ${styled} ࿐`,
            `╰‿╯ ${styled} ╰‿╯`,
            `꧁ 𓊈𒆜 ${styled} 𒆜𓊉 ꧂`,
            `꧁— ${styled} —꧂`
          ];
          final = getRandomElement(gamerTemplates);
          break;
        case StyleCategory.BANGLA:
          final = `${rBan} ${styled} ${rBan}`;
          break;
        case StyleCategory.ENGLISH:
          final = `『 ${styled} 』`;
          break;
        case StyleCategory.GRAPHIC:
          final = `🎨 ${rCombo[0]}${styled}${rCombo[1]} 🎨`;
          break;
        case StyleCategory.FREE:
          final = `💼 ${styled} 💼`;
          break;
        case StyleCategory.FANCY:
          final = `✨ ${rCombo[0]}${styled}${rCombo[1]} ✨`;
          break;
        case StyleCategory.AESTHETIC:
          final = `${rAest} ${styled} ${rAest}`;
          break;
        case StyleCategory.SYMBOL:
          final = `🔱 ${styled} 🔱`;
          break;
      }

      results.push({
        id: `s-${cat}-${idCounter++}-${Math.random()}`,
        text: final,
        category: cat
      });
    }
  });

  // Reshuffle for max variety
  for (let i = results.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [results[i], results[j]] = [results[j], results[i]];
  }

  return results;
};
