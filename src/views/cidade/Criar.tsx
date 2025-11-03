import { FaSave } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import Input from "../../components/input/Input";
import Loading from "../../components/loading/Loading";
import Navegacao from "../../components/navegacao/Navegacao";
import { useAlert } from "../../contexto/AlertContexto";
import { CIDADE } from "../../services/cidade/constants/cidade.constants";
import { useCriar } from "../../services/cidade/hooks/useCriar";
import { UI_CONFIG } from "../../services/constants/system.constants";
import { ROTA } from "../../services/router/Url";

export default function CriarCidade() {
  const { loading } = useAlert();
  //hook com as regras para criação do registro da cidade
  const {
    model,
    errors,
    handleChangeField,
    validateField,
    handleSubmit,
    handleCancel,
  } = useCriar();

  return (
    <div className="display">
      {loading ? <Loading /> : null}
      <div className="card animated fadeInDown">
        <Navegacao
          tituloPagina={CIDADE.TITULO.CRIAR}
          link={ROTA.CIDADE.LISTAR}
          acao={CIDADE.OPERACAO.VOLTAR.LISTAGEM}
        />
        <div className="custom-divider"></div>
        <form onSubmit={handleSubmit}>
          <div className="mt-2">
            <Input
              // Props de Identificação e Rótulo
              label={`${CIDADE.LABEL.CODIGO_CIDADE}:`}
              id={CIDADE.FIELDS.CODIGO}
              name={CIDADE.FIELDS.CODIGO}
              // Props de Valor e Handlers
              value={model.codCidade}
              onChange={(e) =>
                handleChangeField(CIDADE.FIELDS.CODIGO, e.target.value)
              }
              onBlur={(e) =>
                validateField(CIDADE.FIELDS.CODIGO, e.target.value)
              }
              // Props Nativas Repassadas
              readOnly={false}
              disabled={false}
              autoComplete="off"
              // Props de Validação (o Input cuida da exibição)
              error={errors.codCidade}
              errorMessages={errors.codCidadeMensagem}
            />
          </div>
          <div className="mt-4">
            <Input
              // Props de Identificação e Rótulo
              label={`${CIDADE.LABEL.NOME_CIDADE}:`}
              id={CIDADE.FIELDS.NOME}
              name={CIDADE.FIELDS.NOME}
              // Props de Valor e Handlers
              value={model.nomeCidade}
              onChange={(e) =>
                handleChangeField(CIDADE.FIELDS.NOME, e.target.value)
              }
              onBlur={(e) => validateField(CIDADE.FIELDS.NOME, e.target.value)}
              // Props Nativas Repassadas
              readOnly={false}
              disabled={false}
              autoComplete="off"
              // Props de Validação (o Input cuida da exibição)
              error={errors.nomeCidade}
              errorMessages={errors.nomeCidadeMensagem}
            />
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
