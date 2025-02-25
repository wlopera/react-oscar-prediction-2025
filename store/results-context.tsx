import React, { createContext, useEffect, useState } from "react";
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
      const updatedUsers = prev.users.map((user) =>
        user.name === name
          ? {
              ...user,
              result: user.result.map((entry) =>
                Object.keys(entry)[0] === category
                  ? { [category]: value }
                  : entry
              ),
            }
          : user
      );
      return { ...prev, users: updatedUsers };
    });
  };

  const getResultsByUser = (name: string) => {
    const user = results?.users.find((item) => item.name === name);
    return user?.result;
  };

  return (
    <ResultsContext.Provider
      value={{ results, updateResult, getResultsByUser }}
    >
      {children}
    </ResultsContext.Provider>
  );
};

export default ResultsContext;
