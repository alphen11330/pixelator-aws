"use client";

import { useEffect } from "react";

export default function ClientRedirect() {
  useEffect(() => {
    // pages.dev ドメインからのアクセスのみリダイレクト
    if (window.location.hostname === "pixelator-bha.pages.dev") {
      window.location.href = `https://pixelator.net${window.location.pathname}${window.location.search}`;
    }
  }, []);

  return null;
}
