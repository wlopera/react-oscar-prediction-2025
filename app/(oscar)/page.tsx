"use client";

import { ResultsContextProvider } from "@/store/results-context";
import { Oscar } from "./oscar";

export default function OscarPage() {
  return (
    <ResultsContextProvider>
      <Oscar />
    </ResultsContextProvider>
  );
}
