// hooks/usuario/usuario.utils.ts

import { AlertBus } from "../../../alert/alert.service";
import {
  STATUS_TYPES,
  TipoUsuarioEnum,
  VALIDATION_RULES,
} from "../../../constants/system.constants";
import { handleAxiosError } from "../../../mensagens/error.sistema";
import { apiGetUsuario } from "../api/api.usuario";

import {
  fieldsUsuario,
  mapaCampoParaMensagem,
  USUARIO,
} from "../constants/usuario.constants";
import type {
  BuscarUsuarioPorIdProps,
  ErrosUsuario,
  Usuario,
} from "../type/usuario";

/**
 * Valida um campo individualmente (lógica pura).
 * Compartilhada por useCriar e useAtualizar.
 */
export const validarCampo = (
  name: keyof Usuario,
  value: string,
  tipoUsuario?: string // opcional, para decidir se valida aluno ou professor
): string[] => {
  let messages: string[] = [];

  switch (name) {
    // -------------------------------------------------------
    // CAMPOS COMUNS
    // -------------------------------------------------------
    case USUARIO.FIELDS.CODIGO_USUARIO:
      if (!value) messages.push(USUARIO.INPUT_ERROR.CODIGO_USUARIO.BLANK);
      if (value && typeof value !== "string")
        messages.push(USUARIO.INPUT_ERROR.CODIGO_USUARIO.STRING);
      break;

    case USUARIO.FIELDS.NOME_USUARIO:
      if (!value || value.trim().length === VALIDATION_RULES.ZERO_LENGHT)
        messages.push(USUARIO.INPUT_ERROR.NOME_USUARIO.BLANK);
      if (value.length > VALIDATION_RULES.ZERO_LENGHT && value.length < 6)
        messages.push(USUARIO.INPUT_ERROR.NOME_USUARIO.MIN_LEN);
      if (value.length > 100)
        messages.push(USUARIO.INPUT_ERROR.NOME_USUARIO.MAX_LEN);
      break;

    case USUARIO.FIELDS.EMAIL:
      if (!value || value.trim().length === VALIDATION_RULES.ZERO_LENGHT)
        messages.push(USUARIO.INPUT_ERROR.EMAIL.BLANK);
      if (!VALIDATION_RULES.EMAIL_REGEX.test(value))
        messages.push(USUARIO.INPUT_ERROR.EMAIL.VALID);
      if (value.length > VALIDATION_RULES.ZERO_LENGHT && value.length < 6)
        messages.push(USUARIO.INPUT_ERROR.EMAIL.MIN_LEN);
      if (value.length > 100) messages.push(USUARIO.INPUT_ERROR.EMAIL.MAX_LEN);
      break;

    case USUARIO.FIELDS.SENHA:
      if (!value || value.trim().length === VALIDATION_RULES.ZERO_LENGHT)
        messages.push(USUARIO.INPUT_ERROR.SENHA.BLANK);
      if (value.length > VALIDATION_RULES.ZERO_LENGHT && value.length < 6)
        messages.push(USUARIO.INPUT_ERROR.SENHA.MIN_LEN);
      if (value.length > 20) messages.push(USUARIO.INPUT_ERROR.SENHA.MAX_LEN);
      break;

    case USUARIO.FIELDS.CONFIRM_SENHA:
      if (!value || value.trim().length === VALIDATION_RULES.ZERO_LENGHT)
        messages.push(USUARIO.INPUT_ERROR.CONFIRM_SENHA.BLANK);
      if (value.length > VALIDATION_RULES.ZERO_LENGHT && value.length < 6)
        messages.push(USUARIO.INPUT_ERROR.CONFIRM_SENHA.MIN_LEN);
      if (value.length > 20)
        messages.push(USUARIO.INPUT_ERROR.CONFIRM_SENHA.MAX_LEN);
      // (A verificação de igualdade com senha fica no onSubmit)
      break;

    case USUARIO.FIELDS.TIPO_USUARIO:
      if (!value || value.trim().length === VALIDATION_RULES.ZERO_LENGHT)
        messages.push(USUARIO.INPUT_ERROR.TIPO_USUARIO.BLANK);
      if (value.length > 2)
        messages.push(USUARIO.INPUT_ERROR.TIPO_USUARIO.MAX_LEN);
      break;

    case USUARIO.FIELDS.ID_CIDADE:
      if (!value || value.trim().length === VALIDATION_RULES.ZERO_LENGHT)
        messages.push(USUARIO.INPUT_ERROR.ID_CIDADE.BLANK);
      break;

    case USUARIO.FIELDS.NOME_CIDADE:
      if (!value || value.trim().length === VALIDATION_RULES.ZERO_LENGHT)
        messages.push(USUARIO.INPUT_ERROR.NOME_CIDADE.BLANK);
      if (value.length > VALIDATION_RULES.ZERO_LENGHT && value.length < 6)
        messages.push(USUARIO.INPUT_ERROR.NOME_CIDADE.MIN_LEN);
      if (value.length > 100)
        messages.push(USUARIO.INPUT_ERROR.NOME_CIDADE.MAX_LEN);
      break;

    // -------------------------------------------------------
    // CAMPOS DO ALUNO (só valida se tipoUsuario === "1")
    // -------------------------------------------------------
    case USUARIO.FIELDS.COD_ALUNO:
      if (tipoUsuario === TipoUsuarioEnum.ALUNO) {
        if (!value) messages.push(USUARIO.INPUT_ERROR.COD_ALUNO.BLANK);
        if (value && typeof value !== "string")
          messages.push(USUARIO.INPUT_ERROR.COD_ALUNO.STRING);
      }
      break;

    case USUARIO.FIELDS.NOME_ALUNO:
      if (tipoUsuario === TipoUsuarioEnum.ALUNO) {
        if (!value || value.trim().length === VALIDATION_RULES.ZERO_LENGHT)
          messages.push(USUARIO.INPUT_ERROR.NOME_ALUNO.BLANK);
        if (value.length > 0 && value.length < 6)
          messages.push(USUARIO.INPUT_ERROR.NOME_ALUNO.MIN_LEN);
        if (value.length > 100)
          messages.push(USUARIO.INPUT_ERROR.NOME_ALUNO.MAX_LEN);
      }
      break;

    case USUARIO.FIELDS.IDADE:
      if (tipoUsuario === TipoUsuarioEnum.ALUNO) {
        if (!value || Number(value) <= VALIDATION_RULES.ZERO_LENGHT)
          messages.push(USUARIO.INPUT_ERROR.IDADE.MIN_LEN);
      }
      break;

    // -------------------------------------------------------
    // CAMPOS DO PROFESSOR (só valida se tipoUsuario === "2")
    // -------------------------------------------------------
    case USUARIO.FIELDS.COD_PROFESSOR:
      if (tipoUsuario === TipoUsuarioEnum.PROFESSOR) {
        if (!value) messages.push(USUARIO.INPUT_ERROR.COD_PROFESSOR.BLANK);
        if (value && typeof value !== "string")
          messages.push(USUARIO.INPUT_ERROR.COD_PROFESSOR.STRING);
      }
      break;

    case USUARIO.FIELDS.NOME_PROFESSOR:
      if (tipoUsuario === TipoUsuarioEnum.PROFESSOR) {
        if (!value || value.trim().length === VALIDATION_RULES.ZERO_LENGHT)
          messages.push(USUARIO.INPUT_ERROR.NOME_PROFESSOR.BLANK);
        if (value.length > 0 && value.length < 6)
          messages.push(USUARIO.INPUT_ERROR.NOME_PROFESSOR.MIN_LEN);
        if (value.length > 100)
          messages.push(USUARIO.INPUT_ERROR.NOME_PROFESSOR.MAX_LEN);
      }
      break;

    default:
      break;
  }

  return messages;
};

/**
 * Valida o formulário inteiro (lógica pura).
 * Compartilhada por useCriar e useAtualizar.
 */
export const validarFormularioCompleto = (
  model: Usuario
): { newErrors: ErrosUsuario; isFormValid: boolean } => {
  const newErrors: ErrosUsuario = {};
  let isFormValid = true;

  if (!model) {
    return { newErrors: {}, isFormValid: false };
  }

  // --- Validação COMUM (sempre verificada) ---
  // codUsuario
  const codUsuarioMessages = [];
  if (!model.codUsuario && model?.codUsuario !== null)
    codUsuarioMessages.push(USUARIO.INPUT_ERROR.CODIGO_USUARIO.VALID);
  if (model?.codUsuario && typeof model.codUsuario !== "string")
    codUsuarioMessages.push(USUARIO.INPUT_ERROR.CODIGO_USUARIO.STRING);
  if (codUsuarioMessages.length > VALIDATION_RULES.ZERO_LENGHT) {
    newErrors.codUsuario = true;
    newErrors.codUsuarioMensagem = codUsuarioMessages;
    isFormValid = false;
  }

  // nomeUsuario
  const nomeMessages = [];
  if (
    !model?.nomeUsuario ||
    model.nomeUsuario.trim().length === VALIDATION_RULES.ZERO_LENGHT
  )
    nomeMessages.push(USUARIO.INPUT_ERROR.NOME_USUARIO.BLANK);
  if (
    model.nomeUsuario.length > VALIDATION_RULES.ZERO_LENGHT &&
    model.nomeUsuario.length < 6
  )
    nomeMessages.push(USUARIO.INPUT_ERROR.NOME_USUARIO.MIN_LEN);
  if (model.nomeUsuario.length > 100)
    nomeMessages.push(USUARIO.INPUT_ERROR.NOME_USUARIO.MAX_LEN);
  if (nomeMessages.length > VALIDATION_RULES.ZERO_LENGHT) {
    newErrors.nomeUsuario = true;
    newErrors.nomeUsuarioMensagem = nomeMessages;
    isFormValid = false;
  }

  // email
  const emailMessages = [];
  if (
    !model?.email ||
    String(model.email).trim().length === VALIDATION_RULES.ZERO_LENGHT
  ) {
    emailMessages.push(USUARIO.INPUT_ERROR.EMAIL.BLANK);
  }
  // Corrigido: precisa ser !regex.test()
  if (!VALIDATION_RULES.EMAIL_REGEX.test(model.email)) {
    emailMessages.push(USUARIO.INPUT_ERROR.EMAIL.VALID);
  }
  if (
    String(model.email).length > VALIDATION_RULES.ZERO_LENGHT &&
    String(model.email).length < 6
  ) {
    emailMessages.push(USUARIO.INPUT_ERROR.EMAIL.MIN_LEN);
  }
  if (String(model.email).length > 100) {
    emailMessages.push(USUARIO.INPUT_ERROR.EMAIL.MAX_LEN);
  }
  if (emailMessages.length > VALIDATION_RULES.ZERO_LENGHT) {
    newErrors.email = true;
    newErrors.emailMensagem = emailMessages;
    isFormValid = false;
  }

  // senha
  const senhaMessages = [];
  if (
    !model.senha ||
    String(model.senha).trim().length === VALIDATION_RULES.ZERO_LENGHT
  ) {
    senhaMessages.push(USUARIO.INPUT_ERROR.SENHA.BLANK);
  }
  if (
    String(model.senha).length > VALIDATION_RULES.ZERO_LENGHT &&
    String(model.senha).length < 6
  ) {
    senhaMessages.push(USUARIO.INPUT_ERROR.SENHA.MIN_LEN);
  }
  if (String(model.senha).length > 20) {
    senhaMessages.push(USUARIO.INPUT_ERROR.SENHA.MAX_LEN);
  }
  if (senhaMessages.length > VALIDATION_RULES.ZERO_LENGHT) {
    newErrors.senha = true;
    newErrors.senhaMensagem = senhaMessages;
    isFormValid = false;
  }

  // confirmSenha
  const confirmSenhaMessages = [];
  if (
    !model.confirmSenha ||
    String(model.confirmSenha).trim().length === VALIDATION_RULES.ZERO_LENGHT
  ) {
    confirmSenhaMessages.push(USUARIO.INPUT_ERROR.CONFIRM_SENHA.BLANK);
  }
  if (
    String(model.confirmSenha).length > VALIDATION_RULES.ZERO_LENGHT &&
    String(model.confirmSenha).length < 6
  ) {
    confirmSenhaMessages.push(USUARIO.INPUT_ERROR.CONFIRM_SENHA.MIN_LEN);
  }
  if (String(model.confirmSenha).length > 20) {
    confirmSenhaMessages.push(USUARIO.INPUT_ERROR.CONFIRM_SENHA.MAX_LEN);
  }
  // valida se senha e confirmSenha são iguais
  if (model.senha !== model.confirmSenha) {
    confirmSenhaMessages.push(USUARIO.INPUT_ERROR.CONFIRM_SENHA.VALID);
  }

  if (confirmSenhaMessages.length > VALIDATION_RULES.ZERO_LENGHT) {
    newErrors.confirmSenha = true;
    newErrors.confirmSenhaMensagem = confirmSenhaMessages;
    isFormValid = false;
  }

  // tipoUsuario
  const tipoUsuarioMessages = [];
  if (
    !model?.tipo ||
    String(model.tipo).trim().length === VALIDATION_RULES.ZERO_LENGHT
  ) {
    tipoUsuarioMessages.push(USUARIO.INPUT_ERROR.TIPO_USUARIO.BLANK);
  }
  if (
    String(model.tipo).length > VALIDATION_RULES.ZERO_LENGHT &&
    String(model.tipo).length < 1
  ) {
    tipoUsuarioMessages.push(USUARIO.INPUT_ERROR.TIPO_USUARIO.MIN_LEN);
  }
  if (tipoUsuarioMessages.length > VALIDATION_RULES.ZERO_LENGHT) {
    newErrors.tipo = true;
    newErrors.tipoMensagem = tipoUsuarioMessages;
    isFormValid = false;
  }

  // cidade
  const idCidadeMessages = [];
  if (
    !model?.idCidade ||
    String(model.idCidade).trim().length === VALIDATION_RULES.ZERO_LENGHT
  ) {
    idCidadeMessages.push(USUARIO.INPUT_ERROR.ID_CIDADE.BLANK);
  }
  if (idCidadeMessages.length > VALIDATION_RULES.ZERO_LENGHT) {
    newErrors.idCidade = true;
    newErrors.idCidadeMensagem = idCidadeMessages;
    isFormValid = false;
  }

  const nomeCidadeMessages = [];
  if (
    !model?.nomeCidade ||
    String(model.nomeCidade).trim().length === VALIDATION_RULES.ZERO_LENGHT
  ) {
    nomeCidadeMessages.push(USUARIO.INPUT_ERROR.NOME_CIDADE.BLANK);
  }
  if (
    String(model.nomeCidade).length > VALIDATION_RULES.ZERO_LENGHT &&
    String(model.nomeCidade).length < 6
  ) {
    nomeCidadeMessages.push(USUARIO.INPUT_ERROR.NOME_CIDADE.MIN_LEN);
  }
  if (String(model.nomeCidade).length > 100) {
    nomeCidadeMessages.push(USUARIO.INPUT_ERROR.NOME_CIDADE.MAX_LEN);
  }
  if (nomeCidadeMessages.length > VALIDATION_RULES.ZERO_LENGHT) {
    newErrors.nomeCidade = true;
    newErrors.nomeCidadeMensagem = nomeCidadeMessages;
    isFormValid = false;
  }

  // -------------------------------------------------------------------
  // --- Validação CONDICIONAL: depende do tipo do usuário ---
  // -------------------------------------------------------------------

  // Se tipo === "1" → valida campos de ALUNO
  if (
    String(model.tipo) === "1" ||
    String(model.tipo).trim().length === VALIDATION_RULES.ZERO_LENGHT
  ) {
    const codAlunoMessages = [];
    if (
      !model?.codAluno ||
      String(model.codAluno).trim().length === VALIDATION_RULES.ZERO_LENGHT
    ) {
      codAlunoMessages.push(USUARIO.INPUT_ERROR.COD_ALUNO.BLANK);
    }
    if (model.codAluno && typeof model.codAluno !== "string")
      codAlunoMessages.push(USUARIO.INPUT_ERROR.COD_ALUNO.STRING);
    if (codAlunoMessages.length > VALIDATION_RULES.ZERO_LENGHT) {
      newErrors.codAluno = true;
      newErrors.codAlunoMensagem = codAlunoMessages;
      isFormValid = false;
    }

    const nomeAlunoMessages = [];
    if (
      !model?.nomeAluno ||
      String(model.nomeAluno).trim().length === VALIDATION_RULES.ZERO_LENGHT
    ) {
      nomeAlunoMessages.push(USUARIO.INPUT_ERROR.NOME_ALUNO.BLANK);
    }
    if (
      String(model.nomeAluno).length > VALIDATION_RULES.ZERO_LENGHT &&
      String(model.nomeAluno).length < 6
    )
      nomeAlunoMessages.push(USUARIO.INPUT_ERROR.NOME_ALUNO.MIN_LEN);
    if (String(model.nomeAluno).length > 100)
      nomeAlunoMessages.push(USUARIO.INPUT_ERROR.NOME_ALUNO.MAX_LEN);
    if (nomeAlunoMessages.length > VALIDATION_RULES.ZERO_LENGHT) {
      newErrors.nomeAluno = true;
      newErrors.nomeAlunoMensagem = nomeAlunoMessages;
      isFormValid = false;
    }

    const idadeAlunoMessages = [];
    if (!model?.idade || Number(model.idade) <= VALIDATION_RULES.ZERO_LENGHT) {
      idadeAlunoMessages.push(USUARIO.INPUT_ERROR.IDADE.MIN_LEN);
    }
    if (idadeAlunoMessages.length > VALIDATION_RULES.ZERO_LENGHT) {
      newErrors.idade = true;
      newErrors.idadeMensagem = idadeAlunoMessages;
      isFormValid = false;
    }
  }

  // Se tipo === "2" → valida campos de PROFESSOR
  if (String(model.tipo) === "2") {
    const codProfessorMessages = [];
    if (
      !model?.codProfessor ||
      String(model.codProfessor).trim().length === VALIDATION_RULES.ZERO_LENGHT
    ) {
      codProfessorMessages.push(USUARIO.INPUT_ERROR.COD_PROFESSOR.BLANK);
    }
    if (model.codProfessor && typeof model.codProfessor !== "string")
      codProfessorMessages.push(USUARIO.INPUT_ERROR.COD_PROFESSOR.STRING);
    if (codProfessorMessages.length > VALIDATION_RULES.ZERO_LENGHT) {
      newErrors.codProfessor = true;
      newErrors.codProfessorMensagem = codProfessorMessages;
      isFormValid = false;
    }

    const nomeProfessorMessages = [];
    if (
      !model?.nomeProfessor ||
      String(model.nomeProfessor).trim().length === VALIDATION_RULES.ZERO_LENGHT
    ) {
      nomeProfessorMessages.push(USUARIO.INPUT_ERROR.NOME_PROFESSOR.BLANK);
    }
    if (
      String(model.nomeProfessor).length > VALIDATION_RULES.ZERO_LENGHT &&
      String(model.nomeProfessor).length < 6
    ) {
      nomeProfessorMessages.push(USUARIO.INPUT_ERROR.NOME_PROFESSOR.MIN_LEN);
    }
    if (String(model.nomeProfessor).length > 100) {
      nomeProfessorMessages.push(USUARIO.INPUT_ERROR.NOME_PROFESSOR.MAX_LEN);
    }
    if (nomeProfessorMessages.length > VALIDATION_RULES.ZERO_LENGHT) {
      newErrors.nomeProfessor = true;
      newErrors.nomeProfessorMensagem = nomeProfessorMessages;
      isFormValid = false;
    }
  }

  // -------------------------------------------------------------------

  return { newErrors, isFormValid };
};

/**
 * Mapeia erros do servidor para o estado de erros do formulário.
 * Compartilhada por useAtualizar, useExcluir, useConsultar.
 */
export const setServerErrorsUsuario = (
  serverErrors: Partial<Record<keyof Usuario, string[]>> | null
): ErrosUsuario | null => {
  if (!serverErrors) {
    return null;
  }
  const newErrors: ErrosUsuario = {};
  (Object.keys(serverErrors) as (keyof Usuario)[]).forEach((campo) => {
    const mensagens = serverErrors[campo];
    if (mensagens && mensagens.length > VALIDATION_RULES.ZERO_LENGHT) {
      newErrors[campo] = true;
      const msgKey = `${String(campo)}Mensagem`;
      (newErrors as any)[msgKey] = [mensagens];
    }
  });
  return Object.keys(newErrors).length > VALIDATION_RULES.ZERO_LENGHT
    ? newErrors
    : null;
};

/**
 * Valida campos vazios retornados do servidor.
 * Compartilhada por useAtualizar, useExcluir, useConsultar.
 */
export const validarCamposVaziosUsuario = (
  usuario: Usuario
): Partial<Record<keyof Usuario, string[]>> | null => {
  const erros: Partial<Record<keyof Usuario, string[]>> = {};
  fieldsUsuario.forEach((field) => {
    const valor = usuario[field];
    const isEmpty =
      valor === undefined ||
      valor === null ||
      (typeof valor === "string" && valor.trim() === VALIDATION_RULES.STRING);

    if (isEmpty) {
      const keyMessage = mapaCampoParaMensagem[field];
      if (!keyMessage) return;
      const mensagemErro = USUARIO.INPUT_ERROR[keyMessage]?.BLANK;
      const mensagem = mensagemErro ?? `O campo ${String(field)} é obrigatório`;
      erros[field] = [mensagem];
    }
  });
  return Object.keys(erros).length > VALIDATION_RULES.ZERO_LENGHT
    ? erros
    : null;
};

/**
 * Busca uma usuario por ID (lógica de API pura).
 * Compartilhada por useAtualizar, useExcluir, useConsultar.
 */
export const buscarUsuarioPorId = async (
  idUsuario: number
): Promise<BuscarUsuarioPorIdProps | null> => {
  let usuario: Usuario | null = null;
  let errosUsuario: ErrosUsuario | null = null;
  try {
    // Usando apiGetUsuario diretamente, como em useExcluir e useConsultar
    const response = await apiGetUsuario(idUsuario);
    if (response.data.dados) {
      usuario = response.data.dados;
      const errosValidacao = validarCamposVaziosUsuario(response.data.dados);
      if (errosValidacao) {
        errosUsuario = setServerErrorsUsuario(errosValidacao);
      }
    }
    return {
      usuario,
      errosUsuario,
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
