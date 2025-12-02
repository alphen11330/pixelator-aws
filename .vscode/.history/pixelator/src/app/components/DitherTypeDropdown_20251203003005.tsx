type Props = {
  ditherType: string;
  setDitherType: React.Dispatch<React.SetStateAction<string>>;
  isJP: boolean;
};

const DitherTypeDropdown: React.FC<Props> = ({
  ditherType,
  setDitherType,
  isJP,
}) => {
  const dithers = [
    { value: "none", label: "ーーーーーー" }, // ディザリングなし
    { value: "bayerMatrixBasic", label: isJP ? "ベーシック" : "Basic" }, //組織的ディザリング
    { value: "bayerMatrixNoise", label: isJP ? "ノイズ" : "Noise" },
    { value: "bayerMatrixPlaid", label: isJP ? "チェック" : "" },
    { value: "bayerMatrixCheckered", label: isJP ? "市松模様" : "Plaid" },
    { value: "bayerMatrixLeadGlass", label: isJP ? "ガラス" : "LeadGlass" },
    { value: "bayerMatrixTile", label: isJP ? "タイル" : "Tile" },
    {
      value: "bayerMatrixCRT_Vertical",
      label: isJP ? "たてじま" : "Vertical stripes",
    },
    {
      value: "bayerMatrixCRT_Horizontal",
      label: isJP ? "よこじま" : "Horizontal stripes",
    },
    {
      value: "bayerMatrixDiagonal",
      label: isJP ? "斜めじま↘" : "diagonal stripes↘",
    },
    { value: "bayerMatrixMeshLight", label: isJP ? "メッシュ１" : "" },
    { value: "bayerMatrixMeshDark", label: isJP ? "メッシュ２" : "" },
    { value: "bayerMatrixPolkadotLight", label: isJP ? "ハーフトーン１" : "" },
    { value: "bayerMatrixPolkadotDark", label: isJP ? "ハーフトーン２" : "" },
  ];

  const label: React.CSSProperties = {
    position: "relative",
    fontSize: "16px",
    marginLeft: "3rem",
    fontWeight: "bold",
    color: " black",
    userSelect: "none",
  };

  const ditherTypeSelect: React.CSSProperties = {
    width: "50x",
    padding: "5px",
    marginTop: "1rem",
    marginBottom: "1rem",
    fontSize: "14px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    outline: "none",
    display: "inline-block",
    textAlign: "center",
    userSelect: "none",
  };

  return (
    <>
      <span style={label}>{isJP ? "ディザリングタイプ" : "Dither Type"}：</span>

      <select
        value={ditherType}
        style={ditherTypeSelect}
        onChange={(e) => setDitherType(e.target.value)}
      >
        {dithers.map((type) => (
          <option key={type.value} value={type.value}>
            {type.label}
          </option>
        ))}
      </select>
    </>
  );
};

export default DitherTypeDropdown;
