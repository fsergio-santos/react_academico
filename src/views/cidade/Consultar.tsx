import { MdCancel } from "react-icons/md";
import Button from "../../components/button/Button";
import Card from "../../components/card/card";
import Input from "../../components/input/Input";
import Loading from "../../components/loading/Loading";
import Navegacao from "../../components/navegacao/Navegacao";
import { useAlert } from "../../contexto/AlertContexto";
import { BTN, UI_CONFIG } from "../../services/constants/system.constants";
import { CIDADE } from "../../services/modules/cidade/constants/cidade.constants";
import { useConsultar } from "../../services/modules/cidade/hooks/useConsultar";
import { ROTA } from "../../services/router/Url";

export default function ConsultarCidade() {
  // hook de mensagens do sistema
  const { loading } = useAlert();

  const { model, errors, handleCancel } = useConsultar();

  return (
    <div className="container">
      <div className="display">
        {loading ? <Loading /> : null}
        <Card>
          <Navegacao
            tituloPagina={CIDADE.TITULO.CONSULTAR}
            link={ROTA.CIDADE.LISTAR}
            acao={CIDADE.OPERACAO.VOLTAR.LISTAGEM}
          />
          <div className="custom-divider"></div>
          <form>
            <div className="mt-2">
              <Input
                // Props de Identificação e Rótulo
                label={`${CIDADE.LABEL.CODIGO_CIDADE}:`}
                id={CIDADE.FIELDS.CODIGO}
                name={CIDADE.FIELDS.CODIGO}
                defaultValue={model?.codCidade ?? ""}
                readOnly={true}
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
                // Props de Validação (o Input cuida da exibição)
                error={errors.nomeCidade}
                errorMessages={errors.nomeCidadeMensagem}
              />
            </div>

            <div className="btn-content mt-4 mb-4">
              <div className="btn-wrapper">
                <Button
                  type={BTN.TYPE.BUTTON}
                  title={CIDADE.OPERACAO.POR_ID.CANCELAR}
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
