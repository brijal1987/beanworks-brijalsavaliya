import React from "react";
import loaderImage from "../../../src/loader.gif";

export const Loader = props => {
  return (
    <div className="divLoader">
      <img src={loaderImage} alt="loading..." />
    </div>
  );
};

export default Loader;
