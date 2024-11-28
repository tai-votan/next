import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);

  const regex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
  const result = regex.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

function getLuminance({
  r,
  g,
  b,
}: {
  r: number;
  g: number;
  b: number;
}): number {
  const a = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

export function isLightOrDark(hex: string): 'light' | 'dark' {
  const rgb = hexToRgb(hex);
  if (!rgb) {
    console.error('Invalid hex color');
    return 'light';
  }
  const luminance = getLuminance(rgb);
  return luminance > 0.5 ? 'light' : 'dark';
}

export function hyphenateFontName(fontName: string) {
  return fontName.replace(/\s/g, '+');
}

export function getGoogleFontUrl(fontFamily: string, fontVariants: string) {
  return `https://fonts.googleapis.com/css2?family=${hyphenateFontName(
    fontFamily,
  )}:ital,wght@${fontVariants}&display=swap`;
}
