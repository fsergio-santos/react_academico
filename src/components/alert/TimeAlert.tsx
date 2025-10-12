import { useEffect } from "react";
import ReactDOM from "react-dom";
import { MdOutlineClose } from "react-icons/md";
import { useAlert } from "../../contexto/AlertContexto";
import "./timealert.css";

const TimeAlert = () => {
  const { message, variant, show, handleShowAlerta, duration } = useAlert();

  useEffect(() => {
    const timer = setTimeout(async () => {
      handleShowAlerta();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, handleShowAlerta]);

  return ReactDOM.createPortal(
    show && (
      <div className="alert-message">
        <div className="alert-message-container">
          <div className={`alert-message-content alert-${variant}`}>
            <div className="alert-message-header">
              <span className="alert-text">{message}</span>
              <span
                className="app-close-btn"
                onClick={() => handleShowAlerta()}
              >
                {<MdOutlineClose />}
              </span>
            </div>
          </div>
        </div>
      </div>
    ),
    document.body
  );
};

export default TimeAlert;
