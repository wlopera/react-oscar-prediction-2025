"use client";
import React from "react";
import "./globals.css";
import { UserProvider } from "@/store/user-context";
import { ResultsContextProvider } from "@/store/results-context";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Oscar 2025</title>
      </head>
      <body>
        <UserProvider>
          <ResultsContextProvider>
            <main>{children} </main>
          </ResultsContextProvider>
        </UserProvider>
      </body>
    </html>
  );
}
