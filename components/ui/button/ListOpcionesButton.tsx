import { Category } from "@/interfaces";
import React from "react";
import { CustomButton } from "./CustomButton";

type ResultItem = Record<string, string | undefined>;

interface Props {
  name: string;
  category: Category;
  userResults?: ResultItem[];
  onCategory: () => void;
}

const ListOpcionesButton = ({
  name,
  category,
  userResults,
  onCategory,
}: Props) => {
  const find = userResults?.find(
    (item) => Object.keys(item)[0] === category.name
  );
  const currentValue = find ? Object.values(find)[0] : undefined;

  return (
    <div>
      <div className="text-start fs-4">{category.name}</div>
      {category.nominees.map((nominee, i) => (
        <div className="row" key={i}>
          <div className="col-2">
            <CustomButton
              name={name}
              category={category.name}
              value={nominee}
              currentValue={currentValue}
              onCategory={onCategory}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListOpcionesButton;
