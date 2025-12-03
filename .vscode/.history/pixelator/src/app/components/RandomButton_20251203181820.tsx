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

  setColorLevels: React.Dispatch<React.SetStateAction<number>>;
  colorLevels: number;
  setLockPalette: React.Dispatch<React.SetStateAction<boolean>>;
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
  { value: "bayerMatrixDiagonal1", label: "斜めストライプ" },
  { value: "bayerMatrixDiagonal2", label: "斜めストライプ" },
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

  setColorLevels,
  colorLevels,
  setLockPalette,
}) => {
  const setRandomNatural = () => {
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
    const randomDitherStrength = Math.floor(Math.random() * 31) * 0.01;
    setDitherStrength(parseFloat(randomDitherStrength.toFixed(2)));

    // DitherType: dithers の中からランダムに1つ選ぶ
    const randomDither = dithers[Math.floor(Math.random() * dithers.length)];
    setDitherType(randomDither.value);

    const randomColorLevels = Math.floor(Math.random() * 6) + 2;
    setColorLevels(randomColorLevels);

    setLockPalette(false);
  };

  const setRandomDynamic = () => {
    setColorCollection(true); //色調補正オン
    setEdgeEnhancement(true); //輪郭線協調オン
    setColorReduction(true); //減色オン
    setContrast(true);
    setIsHue(true);
    setIsSaturation(true);

    // パレット固定
    setLockPalette(true);

    // ColorLevels: 1～8ビット
    const randomColorLevels = Math.floor(Math.random() * 7) + 1;
    setColorLevels(randomColorLevels);

    // Hue: 0～179 (1刻み)
    const randomHue = Math.floor(Math.random() * 180);
    setHue(randomHue);

    // Pixel Length: 128～512の8の倍数
    const randomLength =
      Math.floor(Math.random() * ((512 - 128) / 8 + 1)) * 8 + 128;
    setPixelLength(randomLength);

    // Contrast Level: 0.8～1.2 (0.1刻み)
    const randomContrastLevel =
      Math.floor(Math.random() * ((1.2 - 0.8) / 0.1 + 1)) * 0.1 + 0.8;
    setContrastLevel(randomContrastLevel);

    // Saturation: -30～90 (1刻み)
    const randomSaturation = Math.floor(Math.random() * (90 - -30 + 1)) - 30;
    setSaturation(randomSaturation);

    // WhiteSize: -2～3 (1刻み)
    const randomWhiteSize = Math.floor(Math.random() * (3 - -2 + 1)) + -2;
    setWhiteSize(randomWhiteSize);

    // DitherStrength: 0～0.3(0.01刻み)
    const randomDitherStrength = Math.floor(Math.random() * 51) * 0.01;
    setDitherStrength(parseFloat(randomDitherStrength.toFixed(2)));

    // DitherType: dithers の中からランダムに1つ選ぶ
    const randomDither = dithers[Math.floor(Math.random() * dithers.length)];
    setDitherType(randomDither.value);

    // ColorPalette: 長さは [2, 4, 8, 16, 32, 64] のいずれかをランダムに選ぶ
    // const paletteSizes = [2, 4, 8, 16, 32, 64];
    // const randomSize =
    //   paletteSizes[Math.floor(Math.random() * paletteSizes.length)];

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
      { length: 2 ** randomColorLevels },
      getRandomRGBWithLuminance
    )
      .sort((a, b) => b.luminance - a.luminance) // 輝度の高い順
      .map((item) => item.rgb);

    setColorPalette(randomPalette);
  };

  return (
    <>
      <button
        style={{
          display: "inline-flex",
          justifyContent: "center",
          alignItems: "center",
          width: "40%",
        }}
        className={style.rainbowButton}
        onClick={() => setRandomNatural()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-6"
        >
          <path
            fillRule="evenodd"
            d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813A3.75 3.75 0 0 0 7.466 7.89l.813-2.846A.75.75 0 0 1 9 4.5ZM18 1.5a.75.75 0 0 1 .728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 0 1 0 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 0 1-1.456 0l-.258-1.036a2.625 2.625 0 0 0-1.91-1.91l-1.036-.258a.75.75 0 0 1 0-1.456l1.036-.258a2.625 2.625 0 0 0 1.91-1.91l.258-1.036A.75.75 0 0 1 18 1.5ZM16.5 15a.75.75 0 0 1 .712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 0 1 0 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 0 1-1.422 0l-.395-1.183a1.5 1.5 0 0 0-.948-.948l-1.183-.395a.75.75 0 0 1 0-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0 1 16.5 15Z"
            clipRule="evenodd"
            stroke="rgb(0, 179, 249)"
            strokeWidth="1.5px"
          />
        </svg>
      </button>
      <button
        style={{
          display: "inline-flex",
          justifyContent: "center",
          alignItems: "center",
          width: "40%",
        }}
        className={style.rainbowButton}
        onClick={() => setRandomDynamic()}
      >
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M447.1 332.7C446.9 296 463.5 268.3 497.1 247.9C478.3 221 449.9 206.2 412.4 203.3C376.9 200.5 338.1 224 323.9 224C308.9 224 274.5 204.3 247.5 204.3C191.7 205.2 132.4 248.8 132.4 337.5C132.4 363.7 137.2 390.8 146.8 418.7C159.6 455.4 205.8 545.4 254 543.9C279.2 543.3 297 526 329.8 526C361.6 526 378.1 543.9 406.2 543.9C454.8 543.2 496.6 461.4 508.8 424.6C443.6 393.9 447.1 334.6 447.1 332.7zM390.5 168.5C417.8 136.1 415.3 106.6 414.5 96C390.4 97.4 362.5 112.4 346.6 130.9C329.1 150.7 318.8 175.2 321 202.8C347.1 204.8 370.9 191.4 390.5 168.5z"/></svg>
      </button>
    </>
  );
};

export default RandomButton;
