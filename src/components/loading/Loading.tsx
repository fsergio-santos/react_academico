import { Fragment } from "react";
import "./loading.css";

const Loading = () => {
  return (
    <Fragment>
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Carregando...</p>
      </div>
    </Fragment>
  );
};

export default Loading;
