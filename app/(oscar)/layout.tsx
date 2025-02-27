import { Menu } from "@/components";
import React from "react";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Menu />
      <main className="container mt-5 min-h-screen">
        <div>{children}</div>
      </main>
      {/* <Footer /> */}
    </div>
  );
}
