import React, { createContext, useContext, useEffect, useState } from "react";
import { getAllResults } from "@/jsonbin/jsonbinApi";

type ResultItem = Record<string, string | undefined>;

type UserResult = {
  name: string;
  result: ResultItem[];
};

type SessionState = {
  users: UserResult[];
};

type ResultsContextType = {
  results: SessionState | null;
  updateResult: (name: string, category: string, value: string) => void;
  getResultsByUser: (name: string) => ResultItem[] | undefined;
  clearResultsByUser: (name: string) => void;
};

const ResultsContext = createContext<ResultsContextType | undefined>(undefined);

export const ResultsContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [results, setResults] = useState<SessionState | null>(null);

  useEffect(() => {
    const getResults = async () => {
      try {
        const response = await getAllResults();

        if (!response.ok) {
          throw new Error("Error consultando resultados");
        }

        const data = await response.json();

        //console.log("Data: ", JSON.stringify(data, null, 2));
        setResults(data.record);
      } catch (err) {
        console.log("Error: ", err);
      }
    };

    getResults();
  }, []);

  const updateResult = (name: string, category: string, value: string) => {
    setResults((prev) => {
      if (!prev) return prev;

      // Primero, actualizamos los valores del usuario que se está modificando
      let updatedUsers = prev.users.map((user) =>
        user.name === name
          ? {
              ...user,
              result: user.result.map((entry) =>
                Object.keys(entry)[0] === category
                  ? { ...entry, [category]: value }
                  : entry
              ),
            }
          : user
      );

      // Si el usuario actualizado es "WINNER", evaluamos la categoría en los otros usuarios
      if (name === "WINNER") {
        updatedUsers = updatedUsers.map((user) => {
          if (["ANDRES", "DANIEL", "HECTOR", "WILLIAM"].includes(user.name)) {
            return {
              ...user,
              result: user.result.map((entry) => {
                if (Object.keys(entry)[0] === category) {
                  return {
                    ...entry,
                    puntuation: entry[category] === value ? "1" : "0", // Actualiza puntuation
                  };
                }
                return entry;
              }),
            };
          }
          return user;
        });
      }

      //updateResultsJsonBin({ ...prev, users: updatedUsers });

      return { ...prev, users: updatedUsers };
    });
  };

  const getResultsByUser = (name: string) => {
    const user = results?.users.find((item) => item.name === name);
    return user?.result;
  };

  const clearResultsByUser = (name: string) => {
    setResults((prev) => {
      if (!prev) return prev;

      const updatedUsers = prev.users.map((user) =>
        user.name === name
          ? {
              ...user,
              result: user.result.map((entry) => {
                const category = Object.keys(entry)[0]; // Obtener la categoría
                return { ...entry, [category]: "" }; // Asignar "" a la categoría
              }),
            }
          : user
      );

      return { ...prev, users: updatedUsers };
    });
  };

  return (
    <ResultsContext.Provider
      value={{ results, updateResult, getResultsByUser, clearResultsByUser }}
    >
      {children}
    </ResultsContext.Provider>
  );
};

// Hook personalizado para acceder al contexto
export const useResults = () => {
  const context = useContext(ResultsContext);
  if (!context) {
    throw new Error(
      "useResults debe usarse dentro de un ResultsContextProvider"
    );
  }
  return context;
};
