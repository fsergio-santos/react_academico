import { FaSave } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import Button from "../../components/button/Button";
import Card from "../../components/card/card";
import Input from "../../components/input/Input";
import Loading from "../../components/loading/Loading";
import Navegacao from "../../components/navegacao/Navegacao";
import { useAlert } from "../../contexto/AlertContexto";
import { BTN, UI_CONFIG } from "../../services/constants/system.constants";
import { CIDADE } from "../../services/modules/cidade/constants/cidade.constants";
import { useCriar } from "../../services/modules/cidade/hooks/useCriar";
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
    <div className="container">
      <div className="display">
        {loading ? <Loading /> : null}
        <Card>
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
                onBlur={(e) =>
                  validateField(CIDADE.FIELDS.NOME, e.target.value)
                }
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
                  title={CIDADE.OPERACAO.CRIAR.ACAO}
                  className="btn btn-add"
                  icon={<FaSave size={UI_CONFIG.BUTTON_SIZE} />}
                >
                  {BTN.SAVE}
                </Button>
              </div>
              <div className="btn-wrapper">
                <Button
                  type={BTN.TYPE.BUTTON}
                  title={CIDADE.OPERACAO.CRIAR.CANCELAR}
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
