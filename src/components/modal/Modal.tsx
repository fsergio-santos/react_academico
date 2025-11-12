import { Fragment, useState, type MouseEvent, type ReactNode } from "react";
//import Button from '../form/Button';
import { BTN } from "../../services/constants/system.constants";
import "./modal.css";

type MessageDialogProps = {
  title: string;
  body: string;
  label: string;
  onSave: (e: MouseEvent<HTMLButtonElement>) => void;
  variant: string;
  iconConfirm: ReactNode;
  iconCancel: ReactNode;
};

const useMessageDialog = () => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const MessageDialog = ({
    title,
    body,
    label,
    onSave,
    variant,
    iconConfirm,
    iconCancel,
  }: MessageDialogProps) => {
    if (!isModalOpen) return null;

    const handleSave = (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault(); // Previne o comportamento padrão, caso necessário
      if (onSave) {
        onSave(e); // Passa o evento para onSave
      }
      closeModal(); // Fecha o modal após salvar
    };

    return (
      <Fragment>
        <div
          className="modal"
          style={{ display: "block" }}
          onClick={() => closeModal()}
        >
          <div
            className="modal-dialog"
            role="document"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
              <button
                type="button"
                className="btn-close"
                onClick={closeModal}
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>{body}</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className={`btn btn-${variant}`}
                onClick={handleSave}
              >
                <span className="btn-icon">
                  <i>{iconConfirm}</i>
                </span>
                <span className="btn-label">{label}</span>
              </button>
              <button
                type="button"
                className="btn btn-cancel"
                onClick={closeModal}
              >
                <span className="btn-icon">
                  <i>{iconCancel}</i>
                </span>
                <span className="btn-label">{BTN.CANCEL}</span>
              </button>
            </div>
          </div>
        </div>
      </Fragment>
    );
  };

  return {
    isModalOpen,
    openModal,
    closeModal,
    MessageDialog,
  };
};

export default useMessageDialog;
