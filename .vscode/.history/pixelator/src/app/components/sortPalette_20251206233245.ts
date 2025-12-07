// @file: sortPalette.ts

/**
 * RGBの各成分
 */
interface RGB {
    r: number;
    g: number;
    b: number;
}

/**
 * ソートの軸を定義する型
 */
export type SortAxis = 'saturation' | 'brightness' | 'hue';

/**
 * RGBカラーをHSB (HSV) モデルに変換し、必要な成分を計算します。
 * @param color - RGB値
 * @returns HSB値を含むオブジェクト { s: 彩度, b: 明度, h: 色相 }
 */
const getHsbFromRgb = (color: RGB): { s: number; b: number; h: number } => {
    // 0-1の範囲に正規化
    const r = color.r / 255;
    const g = color.g / 255;
    const b = color.b / 255;

    const v = Math.max(r, g, b); // Brightness/Value (明度/輝度: B)
    const min = Math.min(r, g, b);
    const delta = v - min;

    // Saturation (彩度: S)
    const s = v === 0 ? 0 : delta / v;

    let h = 0; // Hue (色相: H)
    if (delta !== 0) {
        if (v === r) {
            h = (g - b) / delta + (g < b ? 6 : 0);
        } else if (v === g) {
            h = (b - r) / delta + 2;
        } else if (v === b) {
            h = (r - g) / delta + 4;
        }
        h /= 6; // 0-1 の範囲に正規化
    }

    // 色相は0-360、彩度と明度は0-1
    return { h: h * 360, s, b: v };
};

/**
 * カラーパレットの配列を指定された軸 (彩度、明度、色相) に基づいて並べ替えます。
 *
 * @param colorPalette - "rgb(r,g,b)" 形式の色の文字列配列
 * @param axis - ソートの基準となる軸 ('saturation', 'brightness', 'hue')
 * @returns ソートされた色の文字列配列
 */
export const sortPalette = (colorPalette: string[], axis: SortAxis): string[] => {
    // 1. 各 RGB 文字列を RGB オブジェクトに変換し、HSB値も計算して格納
    const colorsWithHsb = colorPalette.map(rgbString => {
        const match = rgbString.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        if (!match) {
            // 形式エラーが発生した場合、実行時エラーをスローする
            throw new Error(`Invalid RGB format in palette: ${rgbString}`);
        }

        const rgb: RGB = {
            r: parseInt(match[1]),
            g: parseInt(match[2]),
            b: parseInt(match[3]),
        };

        const hsb = getHsbFromRgb(rgb);

        return {
            rgbString: rgbString,
            hsb: hsb,
        };
    });

    // 2. 指定された軸に基づいてソート
    let sortedColors;

    switch (axis) {
        case 'saturation':
            // 彩度 (s) 降順ソート（彩度が高い色を先に）
            sortedColors = colorsWithHsb.sort((a, b) => b.hsb.s - a.hsb.s);
            break;

        case 'brightness':
            // 明度 (b) 降順ソート（明るい色を先に）
            sortedColors = colorsWithHsb.sort((a, b) => b.hsb.b - a.hsb.b);
            break;

        case 'hue':
            // 色相 (h) 昇順ソート（色相環の順に 0度→360度へ）
            sortedColors = colorsWithHsb.sort((a, b) => a.hsb.h - b.hsb.h);
            break;

        default:
            // TypeScript の SortAxis 型により通常到達しないが、安全のため実装
            throw new Error(`Invalid sort axis: ${axis}`);
    }

    // 3. ソートされた元の文字列配列を抽出して返す
    return sortedColors.map(item => item.rgbString);
};