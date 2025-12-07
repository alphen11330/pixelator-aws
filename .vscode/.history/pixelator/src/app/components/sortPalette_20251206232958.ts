// @file: sortPaletteBySaturation.ts

/**
 * RGBの各成分
 */
interface RGB {
    r: number;
    g: number;
    b: number;
}

/**
 * HSB/HSV (色相、彩度、明度/輝度) モデルの彩度 (Saturation) 成分
 */
interface HSB {
    s: number; // Saturation (彩度): 0-1
}

/**
 * RGBカラーをHSB (HSV) モデルに変換し、彩度 (s) のみを返します。
 * @param color - RGB値
 * @returns 彩度 (0〜1)
 */
const getSaturationFromRgb = (color: RGB): number => {
    const r = color.r / 255;
    const g = color.g / 255;
    const b = color.b / 255;

    const v = Math.max(r, g, b); // 明度/輝度
    const min = Math.min(r, g, b);
    const delta = v - min;

    // Saturation (彩度) を計算
    // 明度 (v) が 0 の場合（真っ黒）は、彩度は 0
    return v === 0 ? 0 : delta / v;
};

/**
 * カラーパレットの配列を彩度 (Saturation) に基づいて並べ替えます。
 *
 * @param colorPalette - "rgb(r,g,b)" 形式の色の文字列配列
 * @returns 彩度に基づいて降順（高い順）にソートされた色の文字列配列
 */
export const sortPalette = (colorPalette: string[]): string[] => {
    // 1. 各 RGB 文字列を RGB オブジェクトに変換し、彩度を計算して格納
    const colorsWithSaturation = colorPalette.map(rgbString => {
        // "rgb(r,g,b)" から数値部分を抽出
        const match = rgbString.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        if (!match) {
            // 不正な形式の場合は、エラーを出して処理を中断するか、デフォルト値を返す
            console.error(`Invalid RGB format: ${rgbString}`);
            throw new Error(`Invalid RGB format in palette: ${rgbString}`);
        }

        const rgb: RGB = {
            r: parseInt(match[1]),
            g: parseInt(match[2]),
            b: parseInt(match[3]),
        };

        const saturation = getSaturationFromRgb(rgb);

        return {
            rgbString: rgbString,
            saturation: saturation,
        };
    });

    // 2. 彩度 (saturation) の値に基づいて**降順**にソート
    // (b.saturation - a.saturation) により、彩度が高い色 (b) が前に来ます。
    colorsWithSaturation.sort((a, b) => {
        return b.saturation - a.saturation;
    });

    // 3. ソートされた元の文字列配列を抽出して返す
    return colorsWithSaturation.map(item => item.rgbString);
};
