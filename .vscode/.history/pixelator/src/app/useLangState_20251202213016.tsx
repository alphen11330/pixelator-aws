import { useState } from "react";
import type { Dispatch, SetStateAction } from "react"; // 型を明示的にインポート（React 18以降で推奨）

// 1. type エイリアスで型定義
type LangStateSimple = {
  isJP: boolean;
  setIsJP: Dispatch<SetStateAction<boolean>>;
};

/**
 * 言語状態（isJP）とそのセッター関数のみを提供するカスタムフック
 * @param initialIsJP - 初期値 (true: 日本語, false: 英語)
 */
const useLangState = (initialIsJP: boolean = true): LangStateSimple => {
  const [isJP, setIsJP] = useState<boolean>(initialIsJP);

  return {
    isJP,
    setIsJP,
  };
};
export default useLangState;
