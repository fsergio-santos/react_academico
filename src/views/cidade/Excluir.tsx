import { type FormEvent } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { MdBrowserUpdated, MdCancel } from "react-icons/md";
import Loading from "../../components/loading/Loading";
import MensagemErro from "../../components/mensagem/MensagemErro";
import useMessageDialog from "../../components/modal/Modal";
import { useAlert } from "../../contexto/AlertContexto";
import { CIDADE } from "../../services/cidade/constants/cidade.constants";
import { useExcluir } from "../../services/cidade/hooks/useExcluir";
import {
  STATUS_TYPES,
  UI_CONFIG,
} from "../../services/constants/system.constants";


export default function ExcluirCidade() {
  // hook de mensagens do sistema
  const { loading } = useAlert();

  // hook para exibir mensagens de alerta para o usuário
  const { openModal, MessageDialog } = useMessageDialog();

  const { model, errors, getInputClass, handleSubmit, handleCancel } =
    useExcluir();

  const handleBeforeSumit = (e: FormEvent) => {
    e.preventDefault();
    openModal();
  };

  return (
    <div className="display">
      {loading ? <Loading /> : null}
      <MessageDialog
        title={`${UI_CONFIG.BTN.DELETE} ${CIDADE.ENTITY}`}
        body={`${UI_CONFIG.ACTION_MODAL.DELETE}${CIDADE.ENTITY}`}
        label={UI_CONFIG.BTN.DELETE}
        onSave={handleSubmit}
        variant={STATUS_TYPES.DANGER}
        iconConfirm={<MdBrowserUpdated />}
        iconCancel={<MdCancel />}
      />
      <div className="card animated fadeInDown">
        <h2>{CIDADE.TITULO.EXCLUIR}</h2>
        <div className="custom-divider"></div>
        <form onSubmit={handleBeforeSumit}>
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
                id="submit"
                type="submit"
                title={CIDADE.OPERACAO.EXCLUIR.ACAO}
                className="btn btn-delete"
              >
                <span className="btn-icon">
                  <i>{<FaTrashAlt />}</i>
                </span>
                {UI_CONFIG.BTN.DELETE}
              </button>
            </div>
            <div className="btn-wrapper">
              <button
                className="btn btn-cancel"
                id="cancel"
                type="button"
                title={CIDADE.OPERACAO.EXCLUIR.CANCELAR}
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
