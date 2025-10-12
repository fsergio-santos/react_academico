import {
  createContext,
  useCallback,
  useContext,
  useState,
  type Dispatch,
  type PropsWithChildren,
  type SetStateAction,
} from "react";
import TimeAlert from "../components/alert/TimeAlert";

type Contexto = {
  loading: boolean;
  message: string | null;
  variant: string | null;
  show: boolean;
  duration?: number;
  setLoading: Dispatch<SetStateAction<boolean>>;
  handleShowAlerta: () => void;
  showAlert: (msg: string, type: string, dur?: number) => void;
};

export const AlertContexto = createContext<Contexto | null>(null);

export const useAlert = () => {
  const contexto = useContext(AlertContexto);
  if (!contexto) {
    throw new Error("useAlert deve ser usado dentro de AlertProvider");
  }
  return contexto;
};

const AlertProvider = ({ children }: PropsWithChildren) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const [variant, setVariant] = useState<string | null>(null);
  const [show, setShow] = useState<boolean>(false);
  const [duration, setDuration] = useState<number>(3000);

  const clearMessages = () => {
    setMessage(null);
    setVariant(null);
    setDuration(0);
  };

  const handleShowAlerta = () => {
    setShow(false);
  };

  const showAlert = useCallback((msg: string, type: string, dur = 3000) => {
    clearMessages();
    setMessage(msg);
    setVariant(type);
    setDuration(dur);
    setShow(true);
  }, []);

  return (
    <AlertContexto.Provider
      value={{
        loading,
        message,
        variant,
        show,
        duration,
        setLoading,
        handleShowAlerta,
        showAlert,
      }}
    >
      {children}
      <TimeAlert />
    </AlertContexto.Provider>
  );
};

export default AlertProvider;
