import React from "react";
import { useSelector } from "react-redux";

import "./generes.scss";

const Generes = ({ data }) => {
  const { generes } = useSelector((state) => state.home);

  return (
    <div className="genres">
      {data?.map((g) => {
        if (!generes[g]?.name) return;
        return (
          <div key={g} className="genre">
            {generes[g]?.name}
          </div>
        );
      })}
    </div>
  );
};

export default Generes;