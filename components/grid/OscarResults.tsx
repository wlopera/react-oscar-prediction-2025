"use client";

import React, { useState, useEffect, useContext } from "react";
import ResultsContext from "@/store/results-context";

import styles from "./OscarResults.module.css";
import { getCategories } from "@/jsonbin/jsonbinApi";
import ModalComponent from "../ui/modal/ModalComponent";
import { Category } from "@/interfaces";

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
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [modalData, setModalData] = useState<{
    title: string;
    content: string[];
  }>({
    title: "",
    content: [],
  });

  const context = useContext(ResultsContext);
  if (!context) {
    throw new Error(
      "OscarResults debe estar dentro de un ResultsContextProvider"
    );
  }

  const { results, updateResult } = context;

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
                  // .filter((user) => user.name !== "WINNER") // Excluir WINNER
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

  const getWinner = ({ category }: { category: string | undefined }) => {
    if (!category) return;
    setSelectedCategory(category); // Guarda la categoría seleccionada

    const record = categories.find((item) => item.name === category);
    setModalData({
      title: category,
      content: record?.nominees ?? [],
    });

    setShowModal(true);
  };

  const handleChangeValue = (category: string, value: string) => {
    updateResult("WINNER", category, value);
    setShowModal(false);
  };

  const getTotalByUser = (name: string) => {
    let total = 0;
    records?.users.forEach((item) => {
      if (item.name === name) {
        item.values.forEach((result) => {
          total += result.score;
        });
      }
    });
    return total;
  };

  const sendResults = async () => {
    console.log("Resultados actuales: ", results);
    //await updateResultsJsonBin(results);
  };

  return (
    <div>
      <div className={`text-start ${styles.table_wrapper}`}>
        <table className={styles.table}>
          <thead className={styles.headerThead}>
            <tr>
              <th className={styles.headerCell}>Categoría</th>
              {records?.users.map((user, index) => (
                <React.Fragment key={`header-${index}`}>
                  {user.name === "WINNER" ? (
                    <th className={styles.headerCell}>{`${user.name} `}</th>
                  ) : (
                    <th className={styles.headerCell}>{`${
                      user.name
                    } - Puntos:  ${getTotalByUser(user.name)}`}</th>
                  )}
                </React.Fragment>
              ))}
            </tr>
          </thead>
          <tbody>
            {allCategories.map((category, i) => (
              <tr
                key={i}
                className={`${
                  selectedCategory === category ? styles.selected : ""
                }`}
              >
                <td
                  className={`${styles.cell} ${styles.cell_click}`}
                  onClick={() => getWinner({ category })}
                >
                  {category}
                </td>
                {records?.users.map((user, j) => {
                  const userEntry = user.values.find(
                    (v) => v.category === category
                  );
                  return (
                    <React.Fragment key={`row-${j}-${i}`}>
                      {user.name === "WINNER" ? (
                        <td
                          className={styles.cell}
                        >{`${userEntry?.value} `}</td>
                      ) : (
                        <td className={styles.cell}>{`${
                          userEntry?.value?.substring(0, 25) + "..." || "-"
                        } ${userEntry?.score ?? 0}`}</td>
                      )}
                    </React.Fragment>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
        {/* Renderiza el modal si está activo */}
        {showModal && (
          <ModalComponent
            show={showModal}
            onClose={() => {
              setShowModal(false);
              setSelectedCategory(null);
            }}
            onUpdate={(title, value) => handleChangeValue(title, value)}
            {...modalData}
          />
        )}
      </div>
      <div className="text-end m-2">
        <button type="button" className="btn btn-success" onClick={sendResults}>
          Enviar
        </button>
      </div>
    </div>
  );
};
