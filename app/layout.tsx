import React from "react";
import "./globals.css";

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
        <main>{children} </main>
      </body>
    </html>
  );
}
