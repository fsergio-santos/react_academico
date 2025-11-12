import React from "react";
import { FaSave } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import Button from "../../components/button/Button";
import Card from "../../components/card/card";
import Input from "../../components/input/Input";
import Loading from "../../components/loading/Loading";
import { useAlert } from "../../contexto/AlertContexto";
import {
  BTN,
  STATUS_TYPES,
  UI_CONFIG,
} from "../../services/constants/system.constants";
import { handleAxiosError } from "../../services/mensagens/error.sistema";
import { useApiCidade } from "../../services/modules/cidade/api/api.cidade";
import { CIDADE } from "../../services/modules/cidade/constants/cidade.constants";
import { useCriar } from "../../services/modules/cidade/hooks/useCriar";
import type { Cidade } from "../../services/modules/cidade/type/cidade";

interface AddCidadeProps {
  onClose: () => void;
  //onSelect: (cidade: Cidade) => void;
}

export default function AddCidade({ onClose }: AddCidadeProps) {
  const [touched, setTouched] = React.useState<
    Partial<Record<keyof Cidade, boolean>>
  >({});
  const { postCidade } = useApiCidade();
  const { loading, setLoading, showAlert } = useAlert();
  //hook com as regras para criação do registro da cidade
  const { model, errors, validarFormulario, handleChangeField, validateField } =
    useCriar();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (!validarFormulario()) {
      showAlert(CIDADE.OPERACAO.CRIAR.ERRO, STATUS_TYPES.DANGER);
    }
    try {
      const response = await postCidade(model);
      const { mensagem } = response.data;
      if (mensagem) {
        showAlert(mensagem, STATUS_TYPES.SUCCESS);
      }
    } catch (error) {
      const mensagem = handleAxiosError(error);
      showAlert(mensagem, STATUS_TYPES.DANGER);
    } finally {
      setLoading(false);
      setTouched({});
    }
  };

  return (
    <div className="container">
      <div className="display">
        {loading ? <Loading /> : null}
        <Card>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h2 className="mb-4">{CIDADE.TITULO.CRIAR}</h2>
            <button onClick={onClose} title="Fechar" className="btn-close">
              &times;
            </button>
          </div>
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
                onBlur={(e) =>
                  validateField(CIDADE.FIELDS.NOME, e.target.value)
                }
                // Props Nativas Repassadas
                readOnly={true}
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
                  onClick={onClose}
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
