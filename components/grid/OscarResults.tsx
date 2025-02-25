"use client";

import { Category } from "@/interfaces";
import React, { useState, useEffect, useContext } from "react";
import ResultsContext from "@/store/results-context";

import styles from "./OscarNominations.module.css";
import { getCategories, updateResults } from "@/jsonbin/jsonbinApi";

interface Props {
  name: string;
}

export const OscarResults = ({ name }: Props) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const context = useContext(ResultsContext);
  if (!context) {
    throw new Error(
      "OscarNominations debe estar dentro de un ResultsContextProvider"
    );
  }

  const { results, getResultsByUser } = context;

  useEffect(() => {
    const fetchNominations = async () => {
      try {
        const response = await getCategories();

        if (!response.ok) {
          throw new Error("Error consultado nominados");
        }

        const data = await response.json();

        //console.log("Data: ", JSON.stringify(data, null, 2));
        setCategories(data.record.categories);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchNominations();
    setLoading(false);
  }, []);

  if (loading) return <p>Cargando los nominados...</p>;
  if (error) return <p>Error: {error}</p>;

  const userResults = getResultsByUser(name);

  const sendResults = async () => {
    await updateResults(results);
  };

  // const getNominations = () => {
  //   return categories.map((category, index) => (
  //     <div key={index} className="pb-5">
  //       <ListOpcionesButton
  //         name={name}
  //         category={category}
  //         userResults={userResults}
  //       />
  //     </div>
  //   ));
  // };

  const getTableResults = () => {
    return userResults?.map((item, index) => {
      const [key, value] = Object.entries(item)[0];
      return (
        <div key={index} className={styles.table_title}>
          <div className={styles.field_key}>{key}</div>
          <div>:</div>
          <div className={styles.field_value}>{value || ""}</div>
        </div>
      );
    });
  };

  return (
    <div className="row">
      <div className="col-6">
        <div className="row">
          <div className="col-8">
            <h1>Resultados</h1>
          </div>
        </div>
        TEST
      </div>
      <div className={`col-8 text-start ${styles.table_results}`}>
        {getTableResults()}
      </div>
    </div>
  );
};
