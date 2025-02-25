"use client";

import { Category } from "@/interfaces";
import React, { useState, useEffect, useContext } from "react";
import ResultsContext from "@/store/results-context";

import styles from "./OscarResults.module.css";
import { getCategories } from "@/jsonbin/jsonbinApi";

// type ResultItem = Record<string, string | undefined>;
type ResultItem = {
  category: string | undefined;
  value: string | undefined;
  score: number;
};

type UserResult = {
  name: string;
  values: ResultItem[];
};

type SessionState = {
  users: UserResult[];
};

export const OscarResults = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [records, setRecords] = useState<SessionState | null>(null);

  const context = useContext(ResultsContext);
  if (!context) {
    throw new Error(
      "OscarResults debe estar dentro de un ResultsContextProvider"
    );
  }

  const { results } = context;

  useEffect(() => {
    const fetchNominations = async () => {
      try {
        const response = await getCategories();

        if (!response.ok) {
          throw new Error("Error consultado nominados");
        }

        const data = await response.json();
        setCategories(data.record.categories);

        setRecords(
          results?.users
            ? {
                users: results.users
                  .filter((user) => user.name !== "WINNER") // Excluir WINNER
                  .map((user) => ({
                    name: user.name,
                    values: user.result.map((result) => ({
                      category: Object.keys(result)[0] || "",
                      value: String(Object.values(result)[0] || ""),
                      score: Number(Object.values(result)[1] || 0),
                    })),
                  })),
              }
            : null
        );
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchNominations();
  }, [results]);

  if (loading) return <p>Cargando los nominados...</p>;
  if (error) return <p>Error: {error}</p>;

  // Obtener todas las categorías únicas
  const allCategories = Array.from(
    new Set(
      records?.users.flatMap((user) => user.values.map((v) => v.category))
    )
  );

  return (
    <div className={`text-start ${styles.table_wrapper}`}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.headerCell}>Categoría</th>
            {records?.users.map((user, index) => (
              <React.Fragment key={`header-${index}`}>
                <th className={styles.headerCell}>{user.name}</th>
              </React.Fragment>
            ))}
          </tr>
        </thead>
        <tbody>
          {allCategories.map((category, i) => (
            <tr key={i}>
              <td className={styles.cell}>{category}</td>
              {records?.users.map((user, j) => {
                const userEntry = user.values.find(
                  (v) => v.category === category
                );
                return (
                  <React.Fragment key={`row-${j}-${i}`}>
                    <td className={styles.cell}>{`${
                      userEntry?.value?.substring(0, 30) + "..." || "-"
                    } ${userEntry?.score ?? 0}`}</td>
                  </React.Fragment>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
