"use client";

import { users } from "@/data/users";
import React, { FormEvent, useState } from "react";
import { OscarResults } from "../grid/OscarResults";
import { OscarNominations } from "../grid/OscarNominations";
import styles from "./Init.module.css"; // Importa el CSS

export const Init = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const onHandleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setError(null);
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
    <div className={styles.container}>
      <form className={styles.formContainer} onSubmit={onHandleSubmit}>
        <div className="mb-3">
          <label htmlFor="user" className={styles.label}>
            Usuario
          </label>
          <input
            type="text"
            id="user"
            className={styles.input}
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className={styles.label}>
            Contraseña
          </label>
          <div className={styles.inputGroup}>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className={styles.toggleButton}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
        </div>
        {error && <p className={styles.error}>{error}</p>}
        <button type="submit" className={styles.button}>
          Aceptar
        </button>
      </form>
    </div>
  );
};
