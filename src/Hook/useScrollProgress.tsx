"use client"; // if using Next.js App Router, otherwise remove

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function useScrollProgress() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}