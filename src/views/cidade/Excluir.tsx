import { type FormEvent } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import Button from "../../components/button/Button";
import Card from "../../components/card/card";
import Input from "../../components/input/Input";
import Loading from "../../components/loading/Loading";
import useMessageDialog from "../../components/modal/Modal";
import Navegacao from "../../components/navegacao/Navegacao";
import { useAlert } from "../../contexto/AlertContexto";
import {
  BTN,
  STATUS_TYPES,
  UI_CONFIG,
} from "../../services/constants/system.constants";
import { CIDADE } from "../../services/modules/cidade/constants/cidade.constants";
import { useExcluir } from "../../services/modules/cidade/hooks/useExcluir";
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
    <div className="container">
      <div className="display">
        {loading ? <Loading /> : null}
        <MessageDialog
          title={`${BTN.DELETE} ${CIDADE.ENTITY}`}
          body={`${UI_CONFIG.ACTION_MODAL.DELETE}${CIDADE.ENTITY}`}
          label={BTN.DELETE}
          onSave={handleSubmit}
          variant={STATUS_TYPES.DANGER}
          iconConfirm={<FaTrashAlt size={UI_CONFIG.BUTTON_SIZE} />}
          iconCancel={<MdCancel size={UI_CONFIG.BUTTON_SIZE} />}
        />
        <Card>
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
                // Props de Validação (o Input cuida da exibição)
                error={errors.nomeCidade}
                errorMessages={errors.nomeCidadeMensagem}
              />
            </div>
            <div className="custom-divider"></div>
            <div className="btn-content mt-4 mb-4">
              <div className="btn-wrapper">
                <Button
                  type={BTN.TYPE.SUBMIT}
                  title={CIDADE.OPERACAO.EXCLUIR.ACAO}
                  className="btn btn-delete"
                  icon={<FaTrashAlt size={UI_CONFIG.BUTTON_SIZE} />}
                >
                  {BTN.DELETE}
                </Button>
              </div>
              <div className="btn-wrapper">
                <Button
                  type={BTN.TYPE.BUTTON}
                  title={CIDADE.OPERACAO.EXCLUIR.CANCELAR}
                  onClick={handleCancel}
                  className="btn btn-cancel"
                  icon={<MdCancel size={UI_CONFIG.BUTTON_SIZE} />}
                >
                  {BTN.CANCEL}
                </Button>
              </div>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
