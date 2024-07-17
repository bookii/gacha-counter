/**
 * @param {string} hex
 * @returns {string}
 */
export function shiftColor(hex) {
  const rgb = hexToRgb(hex);
  let [h, s, l] = rgbToHsl(rgb);
  h = (h + 5) % 360
  // 最も明るい色相 (=60) からの距離
  let hueSpecificDarkness = Math.min(Math.abs(h - 60), Math.abs(h - 300)) / 90;
  // 輝度が小さいほど補正を大きくする
  let darknessByLuminousity = (100 - l) / 200 + 0.2;
  l = Math.min(100, l + 10 * (hueSpecificDarkness + darknessByLuminousity));
  console.log(l)
  const newRgb = hslToRgb([h, s, l]);
  return rgbToHex(newRgb);
}

/**
 * @param {string} hex
 * @returns {number[]}
 */
function hexToRgb(hex) {
  hex = hex.replace(/^#/, '');
  const num = parseInt(hex, 16);
  return [num >> 16, (num >> 8) & 255, num & 255];
}

/**
 * @param {number[]} rgb 
 * @returns {string}
 */
function rgbToHex([r, g, b]) {
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
}

/**
 * @param {number[]} rgb
 * @returns {number[]}
 */
function rgbToHsl([r, g, b]) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
      h = s = 0; // achromatic
  } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
          case r: h = (g - b) / d + (g < b ? 6 : 0); break;
          case g: h = (b - r) / d + 2; break;
          case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
  }
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

/**
 * @param {number[]} hsl
 * @returns {number[]}
 */
function hslToRgb([h, s, l]) {
  s /= 100;
  l /= 100;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = l - c / 2;
  let r = 0, g = 0, b = 0;
  if (0 <= h && h < 60) { r = c; g = x; b = 0; }
  else if (60 <= h && h < 120) { r = x; g = c; b = 0; }
  else if (120 <= h && h < 180) { r = 0; g = c; b = x; }
  else if (180 <= h && h < 240) { r = 0; g = x; b = c; }
  else if (240 <= h && h < 300) { r = x; g = 0; b = c; }
  else if (300 <= h && h < 360) { r = c; g = 0; b = x; }
  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);
  return [r, g, b];
}