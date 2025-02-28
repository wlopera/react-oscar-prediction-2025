"use client";

import { useResults } from "@/store/results-context";
import React from "react";
import styles from "./CustomButton.module.css"; // Importa el CSS

interface Props {
  name: string;
  category: string;
  value: string;
  currentValue?: string;
  onCategory: () => void;
}

export const CustomButton = ({
  name,
  category,
  value,
  currentValue,
  onCategory,
}: Props) => {
  const { updateResult } = useResults();

  const handleChangeValue = () => {
    onCategory();
    updateResult(name, category, value);
  };

  return (
    <button
      className={`${styles["custom-button"]} ${
        currentValue === value ? styles.selected : styles.default
      }`}
      onClick={handleChangeValue}
    >
      {value}
    </button>
  );
};
