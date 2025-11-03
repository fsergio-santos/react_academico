import { type FormEvent } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { MdBrowserUpdated, MdCancel } from "react-icons/md";
import Input from "../../components/input/Input";
import Loading from "../../components/loading/Loading";
import useMessageDialog from "../../components/modal/Modal";
import Navegacao from "../../components/navegacao/Navegacao";
import { useAlert } from "../../contexto/AlertContexto";
import { CIDADE } from "../../services/cidade/constants/cidade.constants";
import { useExcluir } from "../../services/cidade/hooks/useExcluir";
import {
  STATUS_TYPES,
  UI_CONFIG,
} from "../../services/constants/system.constants";
import { ROTA } from "../../services/router/Url";

export default function ExcluirCidade() {
  // hook de mensagens do sistema
  const { loading } = useAlert();

  // hook para exibir mensagens de alerta para o usuário
  const { openModal, MessageDialog } = useMessageDialog();

  const { model, errors, handleSubmit, handleCancel } = useExcluir();

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
        <Navegacao
          tituloPagina={CIDADE.TITULO.EXCLUIR}
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
              defaultValue={model?.codCidade ?? ""}
              readOnly={true}
              disabled={false}
              autoComplete="off"
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
              defaultValue={model?.nomeCidade ?? ""}
              readOnly={true}
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
