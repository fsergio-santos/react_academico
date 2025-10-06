import { Fragment } from "react";

type MensagemProps = {
  error?: boolean;
  mensagem?: string | string[];
};

const MensagemErro = ({ error, mensagem }: MensagemProps) => {
  const unique = Array.from(
    new Set(typeof mensagem === "string" ? [mensagem] : mensagem || [])
  );
  return (
    <Fragment>
      {error && (
        <div className="invalid-feedback">
          {unique.map((item, index) => (
            <p key={index} style={{ margin: "0", color: "red" }}>
              <span>{item}</span>
            </p>
          ))}
        </div>
      )}
    </Fragment>
  );
};

export default MensagemErro;
