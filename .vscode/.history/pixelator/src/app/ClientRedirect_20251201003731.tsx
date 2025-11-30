"use client";

import { useEffect } from "react";

export default function ClientRedirect() {
  useEffect(() => {
    if (window.location.hostname !== "pixelator.net") {
      window.location.href = `https://pixelator.net${window.location.pathname}${window.location.search}`;
    }
  }, []);

  return null;
}
