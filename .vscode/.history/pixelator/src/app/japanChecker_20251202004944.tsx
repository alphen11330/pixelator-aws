"use client";
import { useEffect, useState } from "react";

const useIsJapanChecker = () => {
  // 日本である可能性が高いかどうかを示すステート
  const [isLikelyJapan, setIsLikelyJapan] = useState(false);
  // 判定が完了したかどうか
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      setIsChecked(true);
      return;
    }

    // ------------------------------------
    // 1. タイムゾーンによる判定
    // ------------------------------------
    const checkTimeZone = () => {
      // Intl.DateTimeFormat().resolvedOptions().timeZone で現在のタイムゾーン名を取得
      try {
        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        // 日本の標準タイムゾーンは "Asia/Tokyo" のみ
        return timeZone === "Asia/Tokyo";
      } catch (e) {
        console.error("Failed to check time zone:", e);
        return false; // 取得に失敗したら false
      }
    };

    // ------------------------------------
    // 2. ブラウザ言語による判定
    // ------------------------------------
    const checkLanguage = () => {
      // navigator.language または navigator.languages の先頭要素を取得
      const language =
        navigator.language || (navigator.languages && navigator.languages[0]);

      // 日本語のロケールコードは "ja" で始まる
      return language && language.toLowerCase().startsWith("ja");
    };

    // ------------------------------------
    // 総合判定ロジック
    // ------------------------------------
    const isTimeZoneJapan = checkTimeZone();
    const isLanguageJapan = checkLanguage();

    // タイムゾーンが日本、**または** ブラウザ言語が日本語であれば、日本である可能性が高いと判断
    // タイムゾーンとブラウザ言語のどちらかが日本の設定であれば、trueとする
    const isJapan = isTimeZoneJapan || isLanguageJapan;

    setIsLikelyJapan(isJapan);
    setIsChecked(true);
  }, []);

  // 日本である可能性が高いかどうか、および判定完了状態を返す
  // isChecked を使用することで、初期値の false と判定後の false を区別できる
  return { isLikelyJapan, isChecked };
};

export default useIsJapanChecker;
