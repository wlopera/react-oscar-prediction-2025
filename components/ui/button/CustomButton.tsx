"use client";

import ResultsContext from "@/store/results-context";
import React, { useContext } from "react";

interface Props {
  name: string;
  category: string;
  value: string;
  currentValue?: string;
}

export const CustomButton = ({
  name,
  category,
  value,
  currentValue,
}: Props) => {
  const context = useContext(ResultsContext);
  if (!context) {
    throw new Error(
      "CustomButton debe estar dentro de un ResultsContextProvider"
    );
  }

  const { updateResult } = context;

  const handleChangeValue = () => {
    updateResult(name, category, value);
  };

  return (
    <button
      style={{
        width: "400px",
        textAlign: "left",
        margin: "1px",
        backgroundColor: currentValue === value ? "#0D6EFD" : "#e8efee",
        color: currentValue === value ? "white" : "black",
      }}
      onClick={handleChangeValue}
    >
      {value}
    </button>
  );
};
