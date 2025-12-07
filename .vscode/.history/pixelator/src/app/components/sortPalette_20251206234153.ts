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
 * 'lsh' を 'luminance' に変更しました。
 */
export type SortAxis = 'saturation' | 'hue' | 'luminance';

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

    const v = Math.max(r, g, b);
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
        h /= 6;
    }

    return { h: h * 360, s, b: v };
};

/**
 * RGB値から人間の視覚に基づいた輝度 (Luminance) を計算します。（Rec. 709標準）
 * @param color - RGB値
 * @returns 輝度 (0〜255の範囲)
 */
const getLuminance = (color: RGB): number => {
    // 輝度の標準的な計算式（Rec. 709標準）
    return 0.2126 * color.r + 0.7152 * color.g + 0.0722 * color.b;
};

/**
 * カラーパレットの配列を指定された軸に基づいて並べ替えます。
 *
 * @param colorPalette - "rgb(r,g,b)" 形式の色の文字列配列
 * @param axis - ソートの基準となる軸 ('saturation', 'hue', 'luminance')
 * @returns ソートされた色の文字列配列
 */
export const sortPalette = (colorPalette: string[], axis: SortAxis): string[] => {
    // 1. 各 RGB 文字列を RGB オブジェクトに変換し、HSB値とLuminanceを計算して格納
    const colorsData = colorPalette.map(rgbString => {
        const match = rgbString.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        if (!match) {
            throw new Error(`Invalid RGB format in palette: ${rgbString}`);
        }

        const rgb: RGB = {
            r: parseInt(match[1]),
            g: parseInt(match[2]),
            b: parseInt(match[3]),
        };

        const hsb = getHsbFromRgb(rgb);
        const luminance = getLuminance(rgb);

        return {
            rgbString: rgbString,
            hsb: hsb,
            luminance: luminance,
        };
    });

    // 2. 指定された軸に基づいてソート
    let sortedColors;

    switch (axis) {
        case 'saturation':
            // 彩度 (s) 降順ソート
            sortedColors = colorsData.sort((a, b) => b.hsb.s - a.hsb.s);
            break;

        case 'hue':
            // 色相 (h) 昇順ソート
            sortedColors = colorsData.sort((a, b) => a.hsb.h - b.hsb.h);
            break;

        case 'luminance': // 💡 'lsh' から 'luminance' に変更
            // 輝度 (Luminance) -> 彩度 (Saturation) -> 色相 (Hue) の複合ソート
            sortedColors = colorsData.sort((a, b) => {
                // 1. 輝度 (Luminance) 降順
                if (b.luminance !== a.luminance) {
                    return b.luminance - a.luminance;
                }

                // 2. 輝度が同じ場合、彩度 (Saturation) 降順
                if (b.hsb.s !== a.hsb.s) {
                    return b.hsb.s - a.hsb.s;
                }

                // 3. 輝度も彩度も同じ場合、色相 (Hue) 昇順
                return a.hsb.h - b.hsb.h;
            });
            break;

        default:
            throw new Error(`Invalid sort axis: ${axis}`);
    }

    // 3. ソートされた元の文字列配列を抽出して返す
    return sortedColors.map(item => item.rgbString);
};