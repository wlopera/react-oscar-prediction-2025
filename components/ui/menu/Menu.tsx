"use client";

import { Oscar } from "@/app/(oscar)/oscar";
import React, { useState } from "react";

export const Menu = () => {
  const [showOscar, setShowOscar] = useState(false);

  const onSubmitHandle = () => {
    setShowOscar(true);
  };

  return (
    <>
      <nav
        className="navbar navbar-expand-lg fixed-top"
        style={{
          backgroundColor: "#f4b400", // Naranja dorado suave
          borderBottom: "3px solid #0c0501", // Naranja oscuro
          padding: "10px",
        }}
      >
        <div className="container-fluid">
          <a
            className="navbar-brand"
            href="#"
            style={{ color: "#000000", fontWeight: "bold" }} // Morado llamativo
          >
            Quiniela Oscar 2025 - Loperas
          </a>
          <form className="d-flex" role="search" onSubmit={onSubmitHandle}>
            <button
              className="btn"
              type="submit"
              style={{
                backgroundColor: "#33cc33", // Verde vibrante
                color: "white",
                fontWeight: "bold",
                border: "2px solid #009900", // Verde más oscuro
              }}
            >
              Iniciar
            </button>
          </form>
        </div>
      </nav>

      {showOscar && <Oscar />}
    </>
  );
};
