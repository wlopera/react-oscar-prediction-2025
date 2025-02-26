import { Init, OscarNominations, OscarResults } from "@/components";
import React from "react";

export const Oscar = () => {
  return (
    <div
      className="container text-center"
      style={{
        overflowY: "auto", // Habilitar scroll vertical
        padding: "1rem", // Espaciado interno para que no se vea muy ajustado
      }}
    >
      <Init />
      {/* <OscarNominations name="WILLIAM" /> */}
      {/* <OscarResults name="WILLIAM" /> */}
    </div>
  );
};
