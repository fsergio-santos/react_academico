import axios from "axios";
import { useEffect, useState, type MouseEvent } from "react";
import { MdCancel } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import MensagemErro from "../../components/mensagem/MensagemErro";
import {
  CIDADE,
  fieldsCidade,
  mapaCampoParaMensagem,
} from "../../services/cidade/constants/cidade.constants";
import type { Cidade, ErrosCidade } from "../../services/cidade/type/cidade";
import { BTN } from "../../services/constants/constants.button.operacao";
import { ROTA } from "../../services/router/Url";

/**
 *  função para renderizar os erros provenientes do servidor.
 *
 **/

const setServerErrorsCidade = (
  serverErrors: Partial<Record<keyof Cidade, string>> | null
): ErrosCidade | null => {
  if (!serverErrors) {
    return null;
  }

  const newErrors: ErrosCidade = {};

  // Campo: idCidade
  newErrors.idCidade = !!serverErrors.idCidade;
  newErrors.idCidadeMensagem = serverErrors.idCidade
    ? [serverErrors.idCidade]
    : undefined;

  // Campo: codCidade
  newErrors.codCidade = !!serverErrors.codCidade;
  newErrors.codCidadeMensagem = serverErrors.codCidade
    ? [serverErrors.codCidade]
    : undefined;

  // Campo: nomeCidade
  newErrors.nomeCidade = !!serverErrors.nomeCidade;
  newErrors.nomeCidadeMensagem = serverErrors.nomeCidade
    ? [serverErrors.nomeCidade]
    : undefined;

  return newErrors;
};

/**
 * função para validar os campos vázios
 * que retornaram do servidor em uma consulta
 *
 */

const validarCamposVaziosCidade = (
  cidade: Cidade
): Partial<Record<keyof Cidade, string>> | null => {
  const erros: Partial<Record<keyof Cidade, string>> = {};

  fieldsCidade.forEach((field) => {
    const valor = cidade[field];

    const isEmpty =
      valor === undefined ||
      valor === null ||
      (typeof valor === "string" && valor.trim() === "");

    if (isEmpty) {
      const keyMessage = mapaCampoParaMensagem[field];
      const mensagemErro = CIDADE.INPUT_ERROR[keyMessage]?.BLANK;
      erros[field] = mensagemErro ?? `O campo ${String(field)} é obrigatório`;
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
    const response = await axios.get(
      `http://localhost:8000/rest/sistema/cidade/buscar/${idCidade}`
    );
    if (response.data.dados) {
      cidade = response.data.dados;
      const errosValidacao = validarCamposVaziosCidade(response.data.dados);
      //console.log(errosValidacao);
      if (errosValidacao) {
        console.log("erros de valiodação ");
        errosCidade = setServerErrorsCidade(errosValidacao);
        console.log(errosCidade);
      }
    }
    console.log(cidade);
    return {
      cidade,
      errosCidade,
    };
  } catch (error: any) {
    //console.log(error);
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

  useEffect(() => {
    async function getCidade() {
      const response = await buscarCidadePorId(Number(idCidade));
      if (response?.cidade) {
        setModel(response.cidade);
        setErrors(response?.errosCidade ?? null);
      }
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
      <div className="card animated fadeInDown">
        <h2>Atualizar Cidade</h2>
        <form>
          <div className="mb-2 mt-4">
            <label htmlFor="codCidade" className="app-label">
              Código
            </label>

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

          <div className="mb-2 mt-4">
            <label htmlFor="nomeCidade" className="app-label">
              Nome:
            </label>

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
              {BTN.CANCEL}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
