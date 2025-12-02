"use client";
import { useEffect, useState } from "react";

const useLangChecker = () => {
  const [isJP, setIsJP] = useState(true);

  return isJP; // 現在の言語が日本語かどうか
};
export default useLangChecker;
