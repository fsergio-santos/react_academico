// hooks/cidade/cidade.utils.ts

import { AlertBus } from "../../alert/alert.service";
import { STATUS_TYPES } from "../../constants/system.constants";
import { handleAxiosError } from "../../mensagens/error.sistema";
import { apiGetCidade } from "../api/api.cidade";
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

/**
 * Valida um campo individualmente (lógica pura).
 * Compartilhada por useCriar e useAtualizar.
 */
export const validarCampo = (name: keyof Cidade, value: string): string[] => {
  let messages: string[] = [];

  // Lógica de validação específica para cada campo
  switch (name) {
    case CIDADE.FIELDS.CODIGO:
      if (!value) messages.push(CIDADE.INPUT_ERROR.CODIGO.BLANK);
      if (value && typeof value !== "string")
        messages.push(CIDADE.INPUT_ERROR.CODIGO.STRING);
      break;
    case CIDADE.FIELDS.NOME:
      if (!value || String(value).trim().length === 0) {
        messages.push(CIDADE.INPUT_ERROR.NOME.BLANK);
      }
      if (String(value).length > 0 && String(value).length < 6) {
        messages.push(CIDADE.INPUT_ERROR.NOME.MIN_LEN);
      }
      if (String(value).length > 100) {
        messages.push(CIDADE.INPUT_ERROR.NOME.MAX_LEN);
      }
      break;
  }
  return messages;
};

/**
 * Valida o formulário inteiro (lógica pura).
 * Compartilhada por useCriar e useAtualizar.
 */
export const validarFormularioCompleto = (
  model: Cidade
): { newErrors: ErrosCidade; isFormValid: boolean } => {
  const newErrors: ErrosCidade = {};
  let isFormValid = true;

  if (!model) {
    return { newErrors: {}, isFormValid: false };
  }

  // Valida 'codCidade'
  const codCidadeMessages = [];
  if (!model.codCidade && model?.codCidade !== null)
    codCidadeMessages.push(CIDADE.INPUT_ERROR.CODIGO.VALID);
  if (model?.codCidade && typeof model.codCidade !== "string")
    codCidadeMessages.push(CIDADE.INPUT_ERROR.CODIGO.STRING);
  if (codCidadeMessages.length > 0) {
    newErrors.codCidade = true;
    newErrors.codCidadeMensagem = codCidadeMessages;
    isFormValid = false;
  }

  // Valida 'nomeCidade'
  const nomeMessages = [];
  if (!model?.nomeCidade || model.nomeCidade.trim().length === 0)
    nomeMessages.push(CIDADE.INPUT_ERROR.NOME.BLANK);
  if (model.nomeCidade.length > 0 && model.nomeCidade.length < 6)
    nomeMessages.push(CIDADE.INPUT_ERROR.NOME.MIN_LEN);
  if (model.nomeCidade.length > 100) {
    nomeMessages.push(CIDADE.INPUT_ERROR.NOME.MAX_LEN);
  }
  if (nomeMessages.length > 0) {
    newErrors.nomeCidade = true;
    newErrors.nomeCidadeMensagem = nomeMessages;
    isFormValid = false;
  }

  return { newErrors, isFormValid };
};

/**
 * Mapeia erros do servidor para o estado de erros do formulário.
 * Compartilhada por useAtualizar, useExcluir, useConsultar.
 */
export const setServerErrorsCidade = (
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
 * Valida campos vazios retornados do servidor.
 * Compartilhada por useAtualizar, useExcluir, useConsultar.
 */
export const validarCamposVaziosCidade = (
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

/**
 * Busca uma cidade por ID (lógica de API pura).
 * Compartilhada por useAtualizar, useExcluir, useConsultar.
 */
export const buscarCidadePorId = async (
  idCidade: number
): Promise<BuscarCidadePorIdProps | null> => {
  let cidade: Cidade | null = null;
  let errosCidade: ErrosCidade | null = null;
  try {
    // Usando apiGetCidade diretamente, como em useExcluir e useConsultar
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

/**
 * Retorna a classe CSS para o input (versão para formulários).
 * Compartilhada por useCriar e useAtualizar.
 */
export const getInputClassParaForm = (
  field: keyof Cidade,
  errors: ErrosCidade,
  touched: Partial<Record<keyof Cidade, boolean>>
): string => {
  const hasError = errors[field];
  const wasTouched = touched[field];

  if (hasError) {
    return "form-control is-invalid app-label input-error mt-2";
  }
  if (wasTouched && !hasError) {
    return "form-control is-valid app-label input-valid mt-2";
  }
  return "form-control app-label mt-2";
};
