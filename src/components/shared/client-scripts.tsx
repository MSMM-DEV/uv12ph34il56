"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";

const Chatbot = dynamic(
  () => import("@/components/shared/chatbot").then((m) => m.Chatbot),
  { ssr: false }
);
const Analytics = dynamic(
  () => import("@vercel/analytics/react").then((m) => m.Analytics),
  { ssr: false }
);
const SpeedInsights = dynamic(
  () => import("@vercel/speed-insights/next").then((m) => m.SpeedInsights),
  { ssr: false }
);

function useServiceWorker() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js", { scope: "/" })
        .catch((err) => {
          console.warn("SW registration failed:", err);
        });
    }
  }, []);
}

export function ClientScripts() {
  useServiceWorker();

  return (
    <>
      <Chatbot />
      <Analytics />
      <SpeedInsights />
    </>
  );
}
