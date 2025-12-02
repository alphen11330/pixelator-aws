// useLangState.tsx

import { useState } from "react";

interface LangState {
  isJP: boolean;
  toggleLang: () => void;
  setIsJP: React.Dispatch<React.SetStateAction<boolean>>;
}

const useLangState = (initialIsJP: boolean = true): LangState => {
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

export default useLangState;
