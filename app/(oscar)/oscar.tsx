import { Init } from "@/components";
import React from "react";

export const Oscar = () => {
  return (
    <div
      className="container"
      style={{
        overflowY: "auto", // Habilitar scroll vertical
        padding: "1rem", // Espaciado interno para que no se vea muy ajustado
      }}
    >
      <Init />
    </div>
  );
};
