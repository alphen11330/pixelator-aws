// useLangState.tsx

import { useState } from "react";

interface LangState {
  isJP: boolean;
  toggleLang: () => void;
  setIsJP: React.Dispatch<React.SetStateAction<boolean>>;
}

const useLangState = (initialIsJP: boolean = true): LangState => {
  const [isJP, setIsJP] = useState<boolean>(initialIsJP);

  const toggleLang = () => {
    setIsJP((prevIsJP) => !prevIsJP);
  };

  return {
    isJP,
    toggleLang,
    setIsJP,
  };
};

export default useLangState;
