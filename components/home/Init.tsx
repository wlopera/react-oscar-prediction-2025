"use client";

import { users } from "@/data/users";
import React, { FormEvent, useState } from "react";
import { OscarResults } from "../grid/OscarResults";
import { OscarNominations } from "../grid/OscarNominations";

export const Init = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onHandleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (validateUser()) {
      setAuthenticated(true);
    } else {
      setError("Usuario o contraseña incorrectos.");
    }
  };

  const validateUser = () => {
    const recordUser = users.find((item) => item.user === user);
    return recordUser?.password === password;
  };

  if (authenticated) {
    if (user === "master") {
      return <OscarResults />;
    }
    return <OscarNominations name={user.toUpperCase()} />;
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <form
        className="p-3 border border-dark bg-light rounded w-25 text-start"
        onSubmit={onHandleSubmit}
      >
        <div className="mb-3 ">
          <label htmlFor="user" className="form-label">
            usuario
          </label>
          <input
            type="text"
            className="form-control"
            id="user"
            value={user}
            onChange={(e) => {
              setUser(e.target.value);
            }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Contraseña
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        {error && <p className="text-danger">{error}</p>}
        <button type="submit" className="btn btn-primary">
          Aceptar
        </button>
      </form>
    </div>
  );
};
