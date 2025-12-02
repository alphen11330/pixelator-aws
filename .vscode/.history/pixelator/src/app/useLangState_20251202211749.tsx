// useLangState.tsx

import { useState } from "react";

// カスタムフックが返す値の型定義
interface LangState {
  isJP: boolean;
  toggleLang: () => void;
  // 必要であれば、外部から直接状態を設定する関数も提供できます
  setIsJP: React.Dispatch<React.SetStateAction<boolean>>;
}

/**
 * 言語状態（isJP）とその操作関数を提供するカスタムフック
 * @param initialIsJP - 初期値 (true: 日本語, false: 英語)
 * @returns {LangState} - isJP, toggleLang, setIsJP を含むオブジェクト
 */
export const useLangState = (initialIsJP: boolean = true): LangState => {
  // 1. useStateで状態を管理
  const [isJP, setIsJP] = useState<boolean>(initialIsJP);

  // 2. 言語を切り替えるトグル関数
  const toggleLang = () => {
    // 現在の状態を反転
    setIsJP((prevIsJP) => !prevIsJP);
  };

  // 3. 外部で利用できるように、必要な値と関数を返す
  return {
    isJP,
    toggleLang,
    setIsJP,
  };
};
