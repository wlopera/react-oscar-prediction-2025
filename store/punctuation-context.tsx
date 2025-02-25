import { total } from "@/data/punctuations";
import React, { createContext, useEffect, useState } from "react";

type CategoryResult = {
  name: string;
  result: Record<string, number>;
};

type SessionState = {
  categories: CategoryResult[];
};

type PunctuationContextType = {
  punctuations: SessionState | null;
  updatePunctuation: (category: string, name: string, value: number) => void;
};

const PunctuationContext = createContext<PunctuationContextType | undefined>(
  undefined
);

export const PunctuationContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [punctuations, setPunctuations] = useState<SessionState | null>(null);

  useEffect(() => {
    const getPunctuation = async () => {
      // Transformar punctuations.categories en un array de objetos
      const formattedCategories: CategoryResult[] = Object.entries(
        total.categories
      ).map(([key, value]) => ({
        name: key,
        result: value,
      }));

      setPunctuations({ categories: formattedCategories });
    };

    getPunctuation();
  }, []);

  const updatePunctuation = (category: string, name: string, value: number) => {
    setPunctuations((prev) => {
      if (!prev) return prev;

      const updatedCategories = prev.categories.map((item) =>
        item.name === category
          ? {
              ...item,
              result: { ...item.result, [name]: value },
            }
          : item
      );

      return { ...prev, categories: updatedCategories };
    });
  };

  return (
    <PunctuationContext.Provider value={{ punctuations, updatePunctuation }}>
      {children}
    </PunctuationContext.Provider>
  );
};

export default PunctuationContext;
