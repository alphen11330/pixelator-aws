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
export type SortAxis = 'saturation' | 'hue' | 'luminance';

/**
 * RGBカラーをHSB (HSV) モデルに変換し、必要な成分を計算します。
 * (省略: getHsbFromRgb のロジックは変更なし)
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
 */
const getLuminance = (color: RGB): number => {
    return 0.2126 * color.r + 0.7152 * color.g + 0.0722 * color.b;
};

// 🎨 新しいヘルパー関数: RGB文字列とHEXコードの両方に対応
/**
 * 💡 HEXコード (#RRGGBB) または RGB文字列 (rgb(r,g,b)) を RGB オブジェクトに変換します。
 * @param colorString - HEXまたはRGB形式の文字列
 * @returns RGB オブジェクト { r, g, b }
 */
const parseColorToRgb = (colorString: string): RGB => {
    // 1. RGB文字列形式のチェック
    const rgbMatch = colorString.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    if (rgbMatch) {
        return {
            r: parseInt(rgbMatch[1], 10),
            g: parseInt(rgbMatch[2], 10),
            b: parseInt(rgbMatch[3], 10),
        };
    }

    // 2. HEXコード形式のチェック
    const hexMatch = colorString.match(/^#?([a-f\d]{6})$/i);
    if (hexMatch) {
        const hex = hexMatch[1];
        return {
            r: parseInt(hex.substring(0, 2), 16),
            g: parseInt(hex.substring(2, 4), 16),
            b: parseInt(hex.substring(4, 6), 16),
        };
    }

    // 3. どちらにも一致しない場合はエラー
    throw new Error(`Invalid color format in palette: ${colorString}. Must be rgb(r,g,b) or #rrggbb.`);
};


/**
 * カラーパレットの配列を指定された軸に基づいて並べ替えます。
 */
export const sortPalette = (colorPalette: string[], axis: SortAxis): string[] => {
    // 1. 各色文字列を RGB オブジェクトに変換し、必要な値を計算して格納
    const colorsData = colorPalette.map(colorString => {
        // 🚨 修正箇所: parseColorToRgb を使用して、HEX/RGB両方に対応
        const rgb = parseColorToRgb(colorString);

        const hsb = getHsbFromRgb(rgb);
        const luminance = getLuminance(rgb);

        return {
            // 元の文字列形式を保持する (rgb(r,g,b)でも#rrggbbでも)
            rgbString: colorString,
            hsb: hsb,
            luminance: luminance,
        };
    });

    // 2. 指定された軸に基づいてソート
    let sortedColors;

    switch (axis) {
        case 'saturation':
            // ...
            sortedColors = colorsData.sort((a, b) => b.hsb.s - a.hsb.s);
            break;

        case 'hue':
            // ...
            sortedColors = colorsData.sort((a, b) => a.hsb.h - b.hsb.h);
            break;

        case 'luminance':
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