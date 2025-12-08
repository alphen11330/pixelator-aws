"use client";
import Link from "next/link";
import DeviceChecker from "./deviceChecker";
import { pupupuFont } from "./fonts/pupupuFont";

type Props = {
  isJP: boolean;
  setIsJP: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header: React.FC<Props> = ({ isJP, setIsJP }) => {
  const isPC = DeviceChecker();

  const header: React.CSSProperties = {
    position: "relative",
    top: "0",
    width: "100%",
    height: "50px",
    backgroundColor: "rgb(255, 255, 255)",
    borderBottom: "solid 1px rgb(167, 167, 167)",
    userSelect: "none",
    zIndex: "10",
  };

  const headerTextStyle: React.CSSProperties = {
    fontSize: "1.8rem",
    color: " rgb(176, 200, 255)",
    WebkitTextStroke: "0.5px rgb(33, 79, 184)",
    textShadow: "3px 2px  rgb(255, 146, 146)",
  };

  const title: React.CSSProperties = {
    position: "absolute",
    top: "50%",
    left: isPC ? "64px" : "50%",
    transform: isPC ? "translate(0%,-50%)" : "translate(-50%,-50%)",
    fontSize: "1.5rem",
    color: "rgb(0,0,0)",
  };

  const logobox: React.CSSProperties = {
    position: "absolute",
    left: "-48px",
    width: "36px",
    height: "36px",
  };

  const pinkCircle: React.CSSProperties = {
    position: "absolute",
    backgroundColor: "rgb(255, 184, 198)",
    width: "28px",
    height: "28px",
    borderRadius: "100%",
    overflow: "hidden",
  };

  const blueSquare: React.CSSProperties = {
    position: "absolute",
    backgroundColor: "rgb(100, 195, 246)",
    left: "12px",
    top: "12px",
    width: "24px",
    height: "24px",
    borderRadius: "20%",
    zIndex: "-1",
  };

  const yellowLight: React.CSSProperties = {
    position: "absolute",
    backgroundColor: "rgb(253, 255, 184)",
    left: "12px",
    top: "12px",
    width: "24px",
    height: "24px",
    borderRadius: "20%",
  };

  const langButton: React.CSSProperties = {
    position: "absolute",
    top: "50%",
    right: "1rem",
    transform: "translate(0%,-50%)",
    cursor: "pointer",
  };

  return (
    <>
      <div style={header}>
        <button style={langButton} onClick={() => setIsJP(!isJP)}>
          <img
            src={isJP ? "/langJA.PNG" : "/langEN.PNG"}
            style={{
              userSelect: "none",
              pointerEvents: "none",
              display: "inline-block",
              marginRight: "0.5rem",
            }}
            width={40}
          />
          {isPC ? "Langage" : ""}
        </button>
        <div style={title}>
          <div style={logobox}>
            <div style={pinkCircle}>
              <div style={yellowLight} />
            </div>
            <div style={blueSquare} />
          </div>
          <Link href="/">
            <span className={pupupuFont.className} style={headerTextStyle}>
              {isJP ? "ぴくせれーたー" : "Pixelator"}
            </span>
          </Link>
        </div>

        {/* {!isPC && (
          <div
            style={hamburgerFrame}
            onClick={() => setClickHamburger(!clickHamburger)}
          >
            <div style={line1} />
            <div style={line2} />
            <div style={line3} />
          </div>
        )} */}
      </div>
      {/* <div style={hamburgerBoad}>
        <p style={hamburgerContentBox}>利用規約</p>
        <p style={hamburgerContentBox}></p>
        <p style={hamburgerContentBox}></p>
      </div> */}
    </>
  );
};

export default Header;
