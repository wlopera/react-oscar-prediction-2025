import { Login, OscarNominations, OscarResults } from "@/components";
import { useUser } from "@/store/user-context";
import React from "react";

export const Oscar = () => {
  const { user } = useUser();

  return (
    <div
      className="container"
      style={{
        overflowY: "auto", // Habilitar scroll vertical
        padding: "1rem", // Espaciado interno para que no se vea muy ajustado
      }}
    >
      {!user ? (
        <Login />
      ) : user === "master" ? (
        <OscarResults />
      ) : (
        <OscarNominations name={user.toUpperCase()} />
      )}
    </div>
  );
};
