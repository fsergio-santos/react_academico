import { FaSave } from "react-icons/fa";
import { MdBrowserUpdated, MdCancel } from "react-icons/md";
import Input from "../../components/input/Input";
import Loading from "../../components/loading/Loading";
import useMessageDialog from "../../components/modal/Modal";
import Navegacao from "../../components/navegacao/Navegacao";
import { useAlert } from "../../contexto/AlertContexto";
import { CIDADE } from "../../services/cidade/constants/cidade.constants";
import { useAtualizar } from "../../services/cidade/hooks/useAtualizar";
import {
  STATUS_TYPES,
  UI_CONFIG,
} from "../../services/constants/system.constants";
import { ROTA } from "../../services/router/Url";

export default function AtualizarCidade() {
  // hook para exibir mensagens de alerta para o usuário
  const { openModal, MessageDialog } = useMessageDialog();
  // hook de mensagens do sistema
  const { loading, showAlert } = useAlert();
  //hook com as regras para atualização da cidade
  const {
    model,
    errors,
    handleChangeField,
    validarFormulario,
    validateField,
    handleSubmit,
    handleCancel,
  } = useAtualizar();

  /*
   * handleSubmit
   * função que executa a validação geral dos dados e envia os formulário JSON
   * para o servidor nestjs. nest_academico através da API.
   *
   */

  const handleBeforeSumit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validarFormulario()) {
      showAlert(CIDADE.OPERACAO.ATUALIZAR.ERRO, STATUS_TYPES.DANGER);
      return;
    }

    openModal();
  };

  return (
    <div className="display">
      {loading ? <Loading /> : null}
      <MessageDialog
        title={`${UI_CONFIG.BTN.EDIT} ${CIDADE.ENTITY}`}
        body={`${UI_CONFIG.ACTION_MODAL.EDIT}${CIDADE.ENTITY}`}
        label={UI_CONFIG.BTN.EDIT}
        onSave={handleSubmit}
        variant={STATUS_TYPES.DANGER}
        iconConfirm={<MdBrowserUpdated />}
        iconCancel={<MdCancel />}
      />
      <div className="card animated fadeInDown">
        <Navegacao
          tituloPagina={CIDADE.TITULO.ATUALIZAR}
          link={ROTA.CIDADE.LISTAR}
          acao={CIDADE.OPERACAO.VOLTAR.LISTAGEM}
        />
        <div className="custom-divider"></div>
        <form onSubmit={handleBeforeSumit}>
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
                title={CIDADE.OPERACAO.ATUALIZAR.ACAO}
                className="btn btn-edit"
              >
                <span className="btn-icon">
                  <i>{<FaSave />}</i>
                </span>
                {UI_CONFIG.BTN.UPDATE}
              </button>
            </div>
            <div className="btn-wrapper">
              <button
                className="btn btn-cancel"
                id="cancel"
                type="button"
                title={CIDADE.OPERACAO.ATUALIZAR.CANCELAR}
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
