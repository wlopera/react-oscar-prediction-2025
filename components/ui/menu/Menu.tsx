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
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Quniela Oscar 2025 - Loperas
          </a>
          <form className="d-flex" role="search" onSubmit={onSubmitHandle}>
            <button className="btn btn-outline-success" type="submit">
              Iniciar
            </button>
          </form>
        </div>
      </nav>

      {showOscar && <Oscar />}
    </>
  );
};
