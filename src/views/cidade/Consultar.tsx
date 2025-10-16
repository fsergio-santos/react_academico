import { useEffect, useState, type MouseEvent } from "react";
import { MdCancel } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/loading/Loading";
import MensagemErro from "../../components/mensagem/MensagemErro";
import { useAlert } from "../../contexto/AlertContexto";
import { AlertBus } from "../../services/alert/alert.service";
import { apiGetCidade } from "../../services/cidade/api/api.cidade";
import {
  CIDADE,
  fieldsCidade,
  mapaCampoParaMensagem,
} from "../../services/cidade/constants/cidade.constants";
import type { Cidade, ErrosCidade } from "../../services/cidade/type/cidade";
import {
  STATUS_TYPES,
  UI_CONFIG,
} from "../../services/constants/system.constants";
import { handleAxiosError } from "../../services/mensagens/error.sistema";
import { ROTA } from "../../services/router/Url";

/**
 *  função para renderizar os erros provenientes do servidor.
 *
 **/

const setServerErrorsCidade = (
  serverErrors: Partial<Record<keyof Cidade, string[]>> | null
): ErrosCidade | null => {
  if (!serverErrors) {
    return null;
  }

  const newErrors: ErrosCidade = {};

  (Object.keys(serverErrors) as (keyof Cidade)[]).forEach((campo) => {
    const mensagens = serverErrors[campo];

    if (mensagens && mensagens.length > 0) {
      newErrors[campo] = true;

      const msgKey = `${String(campo)}Mensagem`;
      (newErrors as any)[msgKey] = [mensagens];
    }
  });

  return Object.keys(newErrors).length > 0 ? newErrors : null;
};
/**
 * função para validar os campos vázios
 * que retornaram do servidor em uma consulta
 *
 */

const validarCamposVaziosCidade = (
  cidade: Cidade
): Partial<Record<keyof Cidade, string[]>> | null => {
  const erros: Partial<Record<keyof Cidade, string[]>> = {};

  fieldsCidade.forEach((field) => {
    const valor = cidade[field];

    const isEmpty =
      valor === undefined ||
      valor === null ||
      (typeof valor === "string" && valor.trim() === "");

    if (isEmpty) {
      const keyMessage = mapaCampoParaMensagem[field];
      const mensagemErro = CIDADE.INPUT_ERROR[keyMessage]?.BLANK;
      const mensagem = mensagemErro ?? `O campo ${String(field)} é obrigatório`;

      erros[field] = [mensagem];
    }
  });

  return Object.keys(erros).length > 0 ? erros : null;
};
/***
 *
 * função para buscar a cidade pelo idCidade para
 * depois fazer a alteração do registro se for necessário.
 * @param idCidade = idCidade a ser pesquisada na tabela de cidade.
 *
 **/

interface BuscarCidadePorIdProps {
  cidade: Cidade | null;
  errosCidade: ErrosCidade | null | undefined;
}

const buscarCidadePorId = async (
  idCidade: number
): Promise<BuscarCidadePorIdProps | null> => {
  let cidade: Cidade | null = null;
  let errosCidade: ErrosCidade | null = null;
  try {
    const response = await apiGetCidade(idCidade);
    if (response.data.dados) {
      cidade = response.data.dados;
      const errosValidacao = validarCamposVaziosCidade(response.data.dados);
      if (errosValidacao) {
        errosCidade = setServerErrorsCidade(errosValidacao);
      }
    }
    return {
      cidade,
      errosCidade,
    };
  } catch (error: any) {
    const mensagem = handleAxiosError(error);
    AlertBus.emit({
      message: mensagem,
      variant: STATUS_TYPES.DANGER,
      duration: 5000,
    });
  }
  return null;
};

export default function ConsultarCidade() {
  // estado para controlar o movimento entre os inputs
  const [touched, setTouched] = useState<boolean | null>(null);
  // estado para armazenar os dados do formulário cidade
  const [model, setModel] = useState<Cidade | null>(null);
  // Estado para armazenar os erros de validação
  const [errors, setErrors] = useState<ErrosCidade | null>(null);
  // hook para naveção entre páginas
  const navigate = useNavigate();
  // hook para recuperar o id passado na url - /sistemna/cidade/atualizar/6
  const { idCidade } = useParams();
  // hook de mensagens do sistema
  const { loading, setLoading, showAlert } = useAlert();

  useEffect(() => {
    async function getCidade() {
      setLoading(true);
      const response = await buscarCidadePorId(Number(idCidade));
      if (response?.cidade) {
        setModel(response.cidade);
        setErrors(response?.errosCidade ?? null);
      }
      setLoading(false);
    }
    getCidade();
  }, [idCidade]);

  /*
   * função para estilizar o input conforme o seu estado, normal , validado, inválidado.
   */
  const getInputClass = (field: keyof Cidade): string => {
    if (!errors) return "form-control app-label mt-2";

    const hasError = errors[field];
    const wasTouched = touched; // ou touched[field] se for por campo

    if (hasError) {
      return "form-control is-invalid app-label input-error mt-2";
    }

    if (wasTouched && !hasError) {
      return "form-control is-valid app-label input-valid mt-2";
    }

    return "form-control app-label mt-2";
  };

  const handleCancel = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate(ROTA.CIDADE.LISTAR);
  };

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
