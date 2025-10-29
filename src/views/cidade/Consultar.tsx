import { MdCancel } from "react-icons/md";
import Loading from "../../components/loading/Loading";
import MensagemErro from "../../components/mensagem/MensagemErro";
import { useAlert } from "../../contexto/AlertContexto";
import { CIDADE } from "../../services/cidade/constants/cidade.constants";
import { useConsultar } from "../../services/cidade/hooks/useConsultar";
import { UI_CONFIG } from "../../services/constants/system.constants";

export default function ConsultarCidade() {
  // hook de mensagens do sistema
  const { loading } = useAlert();

  const { model, errors, getInputClass, handleCancel } = useConsultar();

  return (
    <div className="display">
      {loading ? <Loading /> : null}
      <div className="card animated fadeInDown">
        <h2>{CIDADE.TITULO.CONSULTAR}</h2>
        <div className="custom-divider"></div>
        <form>
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
              defaultValue={model?.codCidade ?? ""}
              readOnly={true}
              disabled={false}
            />
            {errors?.codCidade && (
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
              defaultValue={model?.nomeCidade ?? ""}
              readOnly={true}
              disabled={false}
              autoComplete="off"
            />
            {errors?.nomeCidade && (
              <MensagemErro
                error={errors.nomeCidade}
                mensagem={errors.nomeCidadeMensagem}
              />
            )}
          </div>
          <div className="btn-content mt-4">
            <div className="btn-wrapper">
              <button
                className="btn btn-cancel"
                id="cancel"
                type="button"
                title={CIDADE.OPERACAO.POR_ID.CANCELAR}
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
