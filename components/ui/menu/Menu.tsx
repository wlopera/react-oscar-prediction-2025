import React from "react";

export const Menu = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Oscar 2025
        </a>
        <form className="d-flex" role="search">
          <button className="btn btn-outline-success" type="submit">
            Buscar
          </button>
        </form>
      </div>
    </nav>
  );
};
