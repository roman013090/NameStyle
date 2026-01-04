
export enum StyleCategory {
  GAMER = 'GAMER',
  AESTHETIC = 'AESTHET',
  BANGLA = 'BANGLA',
  FANCY = 'FANCY',
  ENGLISH = 'ENGLISH',
  ARROW = 'ARROW',
  SYMBOL = 'SYMBOL',
  GRAPHIC = 'GRAPHIC',
  FREE = 'FREE'
}

export interface GeneratedStyle {
  id: string;
  text: string;
  category: StyleCategory;
}

export interface TransformerMap {
  [key: string]: string;
}
