import { FaSave } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import Loading from "../../components/loading/Loading";
import MensagemErro from "../../components/mensagem/MensagemErro";
import { useAlert } from "../../contexto/AlertContexto";
import { CIDADE } from "../../services/cidade/constants/cidade.constants";
import { useCriar } from "../../services/cidade/hooks/useCriar";
import { UI_CONFIG } from "../../services/constants/system.constants";

export default function CriarCidade() {
  const { loading } = useAlert();
  //hook com as regras para criação do registro da cidade
  const {
    model,
    errors,
    handleChangeField,
    validateField,
    getInputClass,
    handleSubmit,
    handleCancel,
  } = useCriar();

  return (
    <div className="display">
      {loading ? <Loading /> : null}
      <div className="card animated fadeInDown">
        <h2>{CIDADE.TITULO.CRIAR}</h2>
        <div className="custom-divider"></div>
        <form onSubmit={handleSubmit}>
          <div className="mb-1 mt-2">
            <label htmlFor="codCidade" className="app-label">
              {CIDADE.LABEL.CODIGO_CIDADE}:
            </label>
          </div>
          <div className="input-group">
            <input
              id={CIDADE.FIELDS.CODIGO}
              name={CIDADE.FIELDS.CODIGO}
              className={getInputClass(CIDADE.FIELDS.CODIGO)}
              value={model.codCidade}
              onChange={(e) =>
                handleChangeField(CIDADE.FIELDS.CODIGO, e.target.value)
              }
              onBlur={(e) =>
                validateField(CIDADE.FIELDS.CODIGO, e.target.value)
              }
              readOnly={false}
              disabled={false}
              autoComplete="off"
            />
            {errors.codCidade && (
              <MensagemErro
                error={errors.codCidade}
                mensagem={errors.codCidadeMensagem}
              />
            )}
          </div>

          <div className="mb-1 mt-4">
            <label htmlFor="nomeCidade" className="app-label">
              {CIDADE.LABEL.NOME_CIDADE}:
            </label>
          </div>
          <div className="input-group">
            <input
              id={CIDADE.FIELDS.NOME}
              name={CIDADE.FIELDS.NOME}
              className={getInputClass(CIDADE.FIELDS.NOME)}
              value={model.nomeCidade}
              onChange={(e) =>
                handleChangeField(CIDADE.FIELDS.NOME, e.target.value)
              }
              onBlur={(e) => validateField(CIDADE.FIELDS.NOME, e.target.value)}
              readOnly={false}
              disabled={false}
              autoComplete="off"
            />
            {errors.nomeCidade && (
              <MensagemErro
                error={errors.nomeCidade}
                mensagem={errors.nomeCidadeMensagem}
              />
            )}
          </div>
          <div className="btn-content mt-4">
            <div className="btn-wrapper">
              <button
                id="submit"
                type="submit"
                title={CIDADE.OPERACAO.CRIAR.ACAO}
                className="btn btn-success"
              >
                <span className="btn-icon">
                  <i>{<FaSave />}</i>
                </span>
                {UI_CONFIG.BTN.SAVE}
              </button>
            </div>
            <div className="btn-wrapper">
              <button
                className="btn btn-cancel"
                id="cancel"
                type="button"
                title={CIDADE.OPERACAO.CRIAR.CANCELAR}
                onClick={handleCancel}
              >
                <span className="btn-icon">
                  <i>{<MdCancel />}</i>
                </span>
                {UI_CONFIG.BTN.CANCEL}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
