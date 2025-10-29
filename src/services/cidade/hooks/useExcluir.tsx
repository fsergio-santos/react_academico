import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAlert } from "../../../contexto/AlertContexto";
import { AlertBus } from "../../alert/alert.service";
import { STATUS_TYPES } from "../../constants/system.constants";
import { handleAxiosError } from "../../mensagens/error.sistema";
import { ROTA } from "../../router/Url";
import { apiGetCidade, useApiCidade } from "../api/api.cidade";
import {
  CIDADE,
  fieldsCidade,
  mapaCampoParaMensagem,
} from "../constants/cidade.constants";
import type {
  BuscarCidadePorIdProps,
  Cidade,
  ErrosCidade,
} from "../type/cidade";

export const useExcluir = () => {
  // estado para armazenar os dados do formulário cidade
  const [model, setModel] = React.useState<Cidade>(CIDADE.DADOS_INICIAIS);
  // Estado para armazenar os erros de validação
  const [errors, setErrors] = React.useState<ErrosCidade>({});
  // hook para naveção entre páginas
  const navigate = useNavigate();
  // hook para recuperar o id passado na url - /sistema/cidade/atualizar/6
  const { idCidade } = useParams();
  // hook de mensagens do sistema
  const { loading, setLoading, showAlert } = useAlert();
  // hoook para manutenção do registro de cidade.
  const { deleteCidade } = useApiCidade();

  useEffect(() => {
    setLoading(true);
    async function getCidade() {
      const response = await buscarCidadePorId(Number(idCidade));
      if (response?.cidade) {
        setModel(response.cidade);
        if (response.errosCidade) {
          setErrors(response.errosCidade);
        }
      }
      setLoading(false);
    }
    getCidade();
  }, [idCidade]);

  /*
   * handleSubmit
   * função que executa a exclusão dos dados e envia os formulário JSON
   * para o servidor nestjs. nest_academico através da API.
   *
   */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!idCidade) {
      showAlert(CIDADE.OPERACAO.POR_ID.NAO_LOCALIZADO, STATUS_TYPES.DANGER);
      navigate(ROTA.CIDADE.LISTAR);
      return;
    }
    setLoading(true);
    try {
      const response = await deleteCidade(idCidade);
      const { mensagem } = response.data;
      if (mensagem) {
        showAlert(mensagem, STATUS_TYPES.SUCCESS);
      }
    } catch (error: any) {
      const mensagem = handleAxiosError(error);
      showAlert(mensagem, STATUS_TYPES.DANGER);
    } finally {
      setLoading(false);
      navigate(ROTA.CIDADE.LISTAR);
    }
  };

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate(ROTA.CIDADE.LISTAR);
  };

  /*
   * função para estilizar o input conforme o seu estado, normal , validado, inválidado.
   */

  const getInputClass = (field: keyof Cidade): string => {
    if (!errors) return "form-control app-label mt-2";

    const hasError = errors[field];

    if (hasError) {
      return "form-control is-invalid app-label input-error mt-2";
    } else {
      return "form-control is-valid app-label input-valid mt-2";
    }
  };


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
        const mensagem =
          mensagemErro ?? `O campo ${String(field)} é obrigatório`;

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

  return {
    model,
    errors,
    getInputClass,
    handleSubmit,
    handleCancel,
  };
};
