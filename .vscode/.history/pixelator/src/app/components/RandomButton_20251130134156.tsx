import style from "../util.module.css";

type Props = {
  setColorCollection: React.Dispatch<React.SetStateAction<boolean>>;
  setEdgeEnhancement: React.Dispatch<React.SetStateAction<boolean>>;
  setColorReduction: React.Dispatch<React.SetStateAction<boolean>>;
  setContrast: React.Dispatch<React.SetStateAction<boolean>>;
  setIsHue: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSaturation: React.Dispatch<React.SetStateAction<boolean>>;

  setPixelLength: React.Dispatch<React.SetStateAction<number>>;
  setContrastLevel: React.Dispatch<React.SetStateAction<number>>;
  setHue: React.Dispatch<React.SetStateAction<number>>;
  setSaturation: React.Dispatch<React.SetStateAction<number>>;
  setWhiteSize: React.Dispatch<React.SetStateAction<number>>;
  setDitherStrength: React.Dispatch<React.SetStateAction<number>>;
  setColorPalette: React.Dispatch<React.SetStateAction<string[]>>;
  setDitherType: React.Dispatch<React.SetStateAction<string>>;
};

const dithers = [
  { value: "none", label: "ーーーーーー" }, // ディザリングなし
  { value: "bayerMatrixBasic", label: "ベーシック" }, //組織的ディザリング
  { value: "bayerMatrixNoise", label: "ノイズパターン" },
  { value: "bayerMatrixPlaid", label: "チェック" },
  { value: "bayerMatrixCheckered", label: "市松模様" },
  { value: "bayerMatrixLeadGlass", label: "ガラス" },
  { value: "bayerMatrixCRT_Vertical", label: "たてじま" },
  { value: "bayerMatrixCRT_Horizontal", label: "よこじま" },
  { value: "bayerMatrixDiagonal", label: "斜めストライプ" },
  { value: "bayerMatrixMeshLight", label: "メッシュ（明）" },
  { value: "bayerMatrixMeshDark", label: "メッシュ（暗）" },
  { value: "bayerMatrixPolkadotLight", label: "ハーフトーン（明）" },
  { value: "bayerMatrixPolkadotDark", label: "ハーフトーン（暗）" },
];

const RandomButton: React.FC<Props> = ({
  setColorCollection,
  setEdgeEnhancement,
  setColorReduction,
  setContrast,
  setIsHue,
  setIsSaturation,

  setPixelLength,
  setContrastLevel,
  setHue,
  setSaturation,
  setWhiteSize,
  setDitherStrength,
  setColorPalette,
  setDitherType,
}) => {
  const setRandom = () => {
    setColorCollection(true); //色調補正オン
    setEdgeEnhancement(true); //輪郭線協調オン
    setColorReduction(true); //減色オン
    setContrast(true);
    setIsHue(true);
    setIsSaturation(true);

    // Pixel Length: 128～512の8の倍数
    const randomLength =
      Math.floor(Math.random() * ((512 - 128) / 8 + 1)) * 8 + 128;
    setPixelLength(randomLength);

    // Contrast Level: 0.8～1.2 (0.1刻み)
    const randomContrastLevel =
      Math.floor(Math.random() * ((1.2 - 0.8) / 0.1 + 1)) * 0.1 + 0.8;
    setContrastLevel(randomContrastLevel);

    // Hue: 0～179 (1刻み)
    const randomHue = Math.floor(Math.random() * 180);
    setHue(randomHue);

    // Saturation: -30～90 (1刻み)
    const randomSaturation = Math.floor(Math.random() * (90 - -30 + 1)) - 30;
    setSaturation(randomSaturation);

    // WhiteSize: -2～3 (1刻み)
    const randomWhiteSize = Math.floor(Math.random() * (3 - -2 + 1)) + -2;
    setWhiteSize(randomWhiteSize);

    // DitherStrength: 0～0.5(0.01刻み)
    const randomDitherStrength = Math.floor(Math.random() * 51) * 0.01;
    setDitherStrength(parseFloat(randomDitherStrength.toFixed(2)));

    // DitherType: dithers の中からランダムに1つ選ぶ
    const randomDither = dithers[Math.floor(Math.random() * dithers.length)];
    setDitherType(randomDither.value);

    // ColorPalette: 長さは [2, 4, 8, 16, 32, 64] のいずれかをランダムに選ぶ
    const paletteSizes = [2, 4, 8, 16, 32, 64];
    const randomSize =
      paletteSizes[Math.floor(Math.random() * paletteSizes.length)];

    // RGB文字列と輝度をセットで保持する配列を作成
    const getRandomRGBWithLuminance = () => {
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
      return { rgb: `rgb(${r},${g},${b})`, luminance };
    };

    // ランダムな色を作成し、輝度順にソートしてからRGBだけ取り出す
    const randomPalette = Array.from(
      { length: randomSize },
      getRandomRGBWithLuminance
    )
      .sort((a, b) => b.luminance - a.luminance) // 輝度の高い順
      .map((item) => item.rgb);

    setColorPalette(randomPalette);
  };

  return (
    <>
      <button
        // style={{
        //   display: "inline-flex",
        //   justifyContent: "center",
        //   alignItems: "center",
        //   marginLeft: "1rem",
        // }}
        className={style.rainbowButton}
        onClick={() => setRandom()}
      ></button>
    </>
  );
};

export default RandomButton;
