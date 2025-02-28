"use client";

import { users } from "@/data/users";
import React, { FormEvent, useState } from "react";
import styles from "./login.module.css";
import { useUser } from "@/store/user-context";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useUser();

  const onHandleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    if (validateUser()) {
      login(username);
    } else {
      setError("Usuario o contraseña incorrectos.");
    }
  };

  const validateUser = () => {
    const recordUser = users.find((item) => item.user === username);
    return recordUser?.password === password;
  };

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
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
