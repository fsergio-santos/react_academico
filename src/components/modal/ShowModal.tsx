const BACKGROUND_STYLE: React.CSSProperties = {
  position: 'fixed',
  top: '0',
  bottom: '0',
  left: '0',
  right: '0',
  background: 'rgb(0,0,0, 0.5)',
  zIndex: '1000',
};

const MODAL_STYLE: React.CSSProperties = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%,-50%)',
  padding: '80px',
  backgroundColor: '#fff',
  borderRadius: '10px',
  color: 'black',
  width: '50%',
  boxShadow: '0 0 20px rgba(0, 0, 0, 0.3)',
};

type ModalProps = {
  isOpen: boolean;
  setModalOpen: (open: boolean) => void;
  children: React.ReactNode;
};

export default function Modal({ isOpen, setModalOpen, children }: ModalProps) {
  if (isOpen) {
    return (
      <div style={BACKGROUND_STYLE} onClick={() => setModalOpen(false)}>
        <div style={MODAL_STYLE} onClick={(e) => e.stopPropagation()}>
          <div>{children}</div>
        </div>
      </div>
    );
  }

  return null;
}
