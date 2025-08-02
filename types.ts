export interface ColorSwatch {
  hex: string;
  r: number;
  g: number;
  b: number;
}

export interface Pigment {
  name: string;
  proportion: number;
}

export interface PaintFormula {
  acrylic: Pigment[];
  oil: Pigment[];
}

export interface TranslatedColor {
  sourceColor: ColorSwatch;
  formula: PaintFormula;
}

export interface Palette {
  id: string;
  name: string;
  colors: TranslatedColor[];
  createdAt: string;
}

export enum AppView {
  LOGIN,
  CREATE_ACCOUNT,
  FORGOT_PASSWORD,
  HOME,
  CAMERA,
  RESULTS,
  PALETTES,
  SETTINGS,
}

export type Language = 'en' | 'es';