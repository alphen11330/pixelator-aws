// ... (中略: getHsbFromRgb 関数まで) ...
// ... (getLuminance 関数を上記に追加) ...

/**
 * カラーパレットの配列を指定された軸に基づいて並べ替えます。
 *
 * @param colorPalette - "rgb(r,g,b)" 形式の色の文字列配列
 * @param axis - ソートの基準となる軸
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
        const luminance = getLuminance(rgb); // 輝度も計算

        return {
            rgbString: rgbString,
            hsb: hsb,
            luminance: luminance, // 新しく追加
        };
    });

    // 2. 指定された軸に基づいてソート
    let sortedColors;

    switch (axis) {
        case 'saturation':
            // 彩度 (s) 降順ソート
            sortedColors = colorsData.sort((a, b) => b.hsb.s - a.hsb.s);
            break;

        case 'brightness':
            // HSBのV (明度) 降順ソート - 元のコードのロジックを維持
            // 視覚的に不安定な場合があるため、代わりに 'luminance' を推奨
            sortedColors = colorsData.sort((a, b) => b.hsb.b - a.hsb.b);
            break;

        case 'luminance':
            // 輝度 (Luminance) 降順ソート - 視覚的に正しい明度ソート
            sortedColors = colorsData.sort((a, b) => b.luminance - a.luminance);
            break;

        case 'hue':
            // 色相 (h) 昇順ソート
            sortedColors = colorsData.sort((a, b) => a.hsb.h - b.hsb.h);
            break;

        default:
            throw new Error(`Invalid sort axis: ${axis}`);
    }

    // 3. ソートされた元の文字列配列を抽出して返す
    return sortedColors.map(item => item.rgbString);
};