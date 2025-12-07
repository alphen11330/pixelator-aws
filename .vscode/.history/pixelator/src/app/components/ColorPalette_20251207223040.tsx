import { useEffect, useState } from "react";
import style from "../util.module.css";
import { createPalette } from "./createPalette";
import SelectPrePalette from "./SelectPrePalette";
import { moveCursor } from "readline";
import { sortPalette } from "./sortPalette";

const randomId = (length = 8): string => {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
};

// JASC-PAL をパースする関数
const parsePalFile = async (file: File): Promise<string[]> => {
  const text = await file.text();
  const lines = text.trim().split(/\r?\n/);

  if (lines[0].trim() !== "JASC-PAL") {
    throw new Error("Not a JASC-PAL file");
  }

  const count = parseInt(lines[2].trim(), 10);
  const palette: string[] = [];

  for (let i = 3; i < 3 + count; i++) {
    const parts = lines[i].trim().split(/\s+/).map(Number);
    const [r, g, b] = parts;
    const hex =
      "#" + [r, g, b].map((n) => n.toString(16).padStart(2, "0")).join("");
    palette.push(hex);
  }

  return palette;
};
// JASC-PALテキスト変換関数
const generatePalText = (palette: string[]): string => {
  const lines = ["JASC-PAL", "0100", palette.length.toString()];

  for (const hex of palette) {
    const [r, g, b] = hexToRgb(hex);
    lines.push(`${r} ${g} ${b}`);
  }

  return lines.join("\n");
};

// JASC-PALダウンロード
const downloadPal = (palette: string[]) => {
  const palText = generatePalText(palette);
  const blob = new Blob([palText], { type: "text/plain" });
  const url = URL.createObjectURL(blob);

  const id = randomId(8);

  const a = document.createElement("a");
  a.href = url;
  a.download = `pixelatorPallet_${id}.pal`;
  a.click();

  URL.revokeObjectURL(url);
};

// RGB形式の色をHEX形式に変換する関数
const rgbToHex = (rgb: string): string => {
  const match = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  if (!match) return rgb;
  const [, r, g, b] = match.map(Number);
  return (
    "#" +
    [r, g, b]
      .map((x) => {
        const hex = x.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("")
  );
};

// HEX形式の色をRGB形式に変換する関数
const hexToRgb = (color: string): [number, number, number] => {
  // #RRGGBB
  if (color.startsWith("#")) {
    const clean = color.replace("#", "");
    const r = parseInt(clean.substring(0, 2), 16);
    const g = parseInt(clean.substring(2, 4), 16);
    const b = parseInt(clean.substring(4, 6), 16);
    return [r, g, b];
  }

  // rgb(r, g, b)
  const rgbMatch = color.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  if (rgbMatch) {
    return [
      parseInt(rgbMatch[1], 10),
      parseInt(rgbMatch[2], 10),
      parseInt(rgbMatch[3], 10),
    ];
  }

  // 不明な形式なら黒にする(エラー回避)
  console.warn("Unknown color format:", color);
  return [0, 0, 0];
};

// 画像を読み込んでリサイズする関数
const readImage = (
  event: React.ChangeEvent<HTMLInputElement>,
  setImageToForPalette: React.Dispatch<React.SetStateAction<string | null>>
) => {
  const MAX_SIZE = 1024;

  const file = event.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    if (e.target?.result) {
      const img = new Image();
      img.src = e.target.result as string;
      img.onload = () => {
        const { width, height } = img;
        let newWidth = width;
        let newHeight = height;

        // 大きすぎる画像をリサイズ
        if (width > MAX_SIZE || height > MAX_SIZE) {
          if (width > height) {
            newWidth = MAX_SIZE;
            newHeight = (height / width) * MAX_SIZE;
          } else {
            newHeight = MAX_SIZE;
            newWidth = (width / height) * MAX_SIZE;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = newWidth;
        canvas.height = newHeight;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0, newWidth, newHeight);
          const resizedDataUrl = canvas.toDataURL("image/png");
          setImageToForPalette(resizedDataUrl);

          const inputElement = event.target as HTMLInputElement;
          inputElement.value = "";
        }
      };
    }
  };
  reader.readAsDataURL(file);
};

const readPalOrImage = async (
  event: React.ChangeEvent<HTMLInputElement>,
  setImageToForPalette: React.Dispatch<React.SetStateAction<string | null>>,
  setColorPalette: React.Dispatch<React.SetStateAction<string[]>>
) => {
  const file = event.target.files?.[0];
  if (!file) return;

  const ext = file.name.split(".").pop()?.toLowerCase();

  // PAL ファイルならパレットを読み込み
  if (ext === "pal") {
    try {
      const palette = await parsePalFile(file);
      setColorPalette(palette);
    } catch (err) {
      console.error(err);
      alert("PALファイルの読み込みに失敗しました");
    }
    event.target.value = "";
    return;
  }

  // それ以外は画像として扱う
  readImage(event, setImageToForPalette);
};

type Props = {
  colorReduction: boolean;
  colorPalette: string[];
  setColorPalette: React.Dispatch<React.SetStateAction<string[]>>;
  smoothImageSrc: string | null;
  colorLevels: number;
  imageSrc: string | null;
  lockPalette: boolean;
  setLockPalette: React.Dispatch<React.SetStateAction<boolean>>;
  isJP: boolean;
};

const ColorPalette: React.FC<Props> = ({
  colorReduction,
  colorPalette,
  setColorPalette,
  smoothImageSrc,
  colorLevels,
  imageSrc,
  lockPalette,
  setLockPalette,
  isJP,
}) => {
  const [imageForPalette, setImageForPalette] = useState<string | null>(null);
  const [menuState, setMenuState] = useState<{
    visible: boolean;
    index: number;
    x: number;
    y: number;
  } | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  // カラーパレットの生成
  const fetchPalette = async (img: string | null) => {
    if (img) {
      const palette = await createPalette(img, colorLevels);
      setColorPalette(palette);
    }
  };

  // 減色数を変更したときに編集画像からパレットを作成
  useEffect(() => {
    if (!lockPalette) fetchPalette(smoothImageSrc);
  }, [colorLevels, smoothImageSrc, lockPalette]);

  // パレット用画像からパレットを作成
  useEffect(() => {
    if (imageForPalette) {
      fetchPalette(imageForPalette);
      setImageForPalette(null);
    }
  }, [imageForPalette]);

  // メニュー外クリックで閉じる

  // カラーボックスのクリックハンドラー
  const handleColorClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    setMenuState({
      visible: true,
      index,
      x: rect.left + rect.width / 2,
      y: rect.top,
    });
  };

  // メニュー選択時のハンドラー
  const handleMenuAction = (action: "duplicate" | "edit" | "delete") => {
    if (!menuState) return;
    const { index } = menuState;

    switch (action) {
      case "duplicate":
        const newPalette = [...colorPalette];
        newPalette.splice(index + 1, 0, colorPalette[index]);
        setColorPalette(newPalette);
        break;
      case "edit":
        setEditingIndex(index);
        break;
      case "delete":
        if (colorPalette.length > 1) {
          setColorPalette(colorPalette.filter((_, i) => i !== index));
        }
        break;
    }
    setMenuState(null);
  };

  // 色変更ハンドラー
  const handleColorChange = (index: number, newColor: string) => {
    const updatedPalette = [...colorPalette];
    updatedPalette[index] = newColor;
    setColorPalette(updatedPalette);
  };

  // color inputのクリックをトリガー
  useEffect(() => {
    if (editingIndex !== null) {
      const input = document.getElementById(
        `color-input-${editingIndex}`
      ) as HTMLInputElement;
      if (input) {
        input.click();
      }
    }
  }, [editingIndex]);

  const colorPaletteStyle: React.CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    marginTop: "1rem",
    marginInline: "auto",
    width: "80%",
  };

  const buttonContainer: React.CSSProperties = {
    display: "flex",
    width: "calc(80% - 3px)",
    marginInline: "auto",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const colorInputStyle: React.CSSProperties = {
    width: "calc(100% / 8 - 3px)",
    paddingTop: "10%",
    marginInline: "1.5px",
    marginBottom: "3px",
    borderRadius: "4px",
    border: "solid 1px rgb(184, 184, 184)",
    cursor: "pointer",
    backgroundColor: "rgb(255, 255, 255)",
  };

  const alignmentButtonStyle = {
    width: "20%",
    height: "2rem",
    background: "rgb(255, 255, 255)",
    fontSize: "16px",
    border: "solid 1.5px rgb(0,0,0)",
    borderRadius: "5px",
    cursor: "pointer",
  };

  const menuStyle: React.CSSProperties = {
    position: "fixed",
    left: menuState ? `${menuState.x}px` : "0",
    top: menuState ? `${menuState.y}px` : "0",
    transform: "translate(-50%, -100%)",
    marginTop: "-8px",
    backgroundColor: "white",
    border: "2px solid black",
    borderRadius: "8px",
    padding: "0.5rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.25rem",
    zIndex: 1000,
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  };

  const menuButtonStyle: React.CSSProperties = {
    padding: "0.5rem 1rem",
    border: "1px solid black",
    borderRadius: "4px",
    backgroundColor: "white",
    cursor: "pointer",
    fontSize: "14px",
    whiteSpace: "nowrap",
  };

  return (
    <>
      {colorReduction && (
        <>
          <div style={buttonContainer}>
            <label
              htmlFor="fileForPalette-upload"
              className={style.createPaletteButton}
              style={{
                marginRight: "1rem",
              }}
            >
              <div>{isJP ? "画像｜palから配色" : "IMG｜pal to pallete"}</div>
            </label>
            <button
              className={style.downloadButton}
              style={{
                display: "inline-flex",
                justifyContent: "center",
                alignItems: "center",
                marginRight: "auto",
              }}
              onClick={() => downloadPal(colorPalette)}
            >
              {isJP ? "pal" : "pal"}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="ml-1 size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                />
              </svg>
            </button>

            <input
              id="fileForPalette-upload"
              type="file"
              accept="image/*,.pal"
              style={{ display: "none" }}
              onChange={(e) =>
                readPalOrImage(e, setImageForPalette, setColorPalette)
              }
            />
            <button onClick={() => setLockPalette(!lockPalette)}>
              <img
                src={lockPalette ? "/locked.png" : "/unlocked.png"}
                style={{
                  userSelect: "none",
                  pointerEvents: "none",
                }}
                width={30}
              />
            </button>
          </div>
          <SelectPrePalette setColorPalette={setColorPalette} isJP={isJP} />
        </>
      )}

      <div
        style={{
          ...buttonContainer,
          justifyContent: "left",
          gap: "1rem",
          marginTop: "1rem",
        }}
      >
        <button
          style={alignmentButtonStyle}
          onClick={() => {
            setColorPalette(sortPalette(colorPalette, "luminance"));
          }}
        >
          輝度
        </button>

        <button
          style={alignmentButtonStyle}
          onClick={() => {
            setColorPalette(sortPalette(colorPalette, "saturation"));
          }}
        >
          彩度
        </button>

        <button
          style={alignmentButtonStyle}
          onClick={() => {
            setColorPalette(sortPalette(colorPalette, "hue"));
          }}
        >
          色相
        </button>
      </div>

      {/* カラーパレットを配置 */}
      <div style={colorPaletteStyle}>
        {colorPalette.map((color, index) => (
          <button
            key={`color-${index}-${color}`}
            style={{
              position: "relative",
              ...colorInputStyle,
              backgroundColor: color,
            }}
            onClick={(e) => handleColorClick(e, index)}
          >
            {editingIndex === index && (
              <input
                id={`color-input-${index}`}
                type="color"
                value={rgbToHex(color)}
                title={color}
                onChange={(e) => {
                  handleColorChange(index, e.target.value);
                  setEditingIndex(null);
                }}
                onBlur={() => setEditingIndex(null)}
                onClick={(e) => e.stopPropagation()}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  opacity: 0,
                  cursor: "pointer",
                }}
              />
            )}
          </button>
        ))}
      </div>

      {/* メニュー */}
      {menuState && (
        <div style={menuStyle} onClick={(e) => e.stopPropagation()}>
          <button
            style={menuButtonStyle}
            onClick={() => handleMenuAction("duplicate")}
          >
            {isJP ? "複製" : "Duplicate"}
          </button>
          <button
            style={menuButtonStyle}
            onClick={() => handleMenuAction("edit")}
          >
            {isJP ? "変更" : "Edit"}
          </button>
          <button
            style={menuButtonStyle}
            onClick={() => handleMenuAction("delete")}
          >
            {isJP ? "削除" : "Delete"}
          </button>
        </div>
      )}
    </>
  );
};

export default ColorPalette;
