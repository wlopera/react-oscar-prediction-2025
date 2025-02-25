"use client";

import { ResultsContextProvider } from "@/store/results-context";
import { PunctuationContextProvider } from "@/store/punctuation-context";
import { Oscar } from "./oscar";

export default function OscarPage() {
  return (
    <ResultsContextProvider>
      <PunctuationContextProvider>
        <Oscar />
      </PunctuationContextProvider>
    </ResultsContextProvider>
  );
}
