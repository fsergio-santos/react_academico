import { criarMensagensOperacao } from "../../constants/criar.mensagem.operacao";
import type { Cidade } from "../type/cidade";

const ENTITY_NAME = "Cidade";

export const CIDADE = {
  ENTITY: ENTITY_NAME,

  ALIAS: "cidade",

  DADOS_INICIAIS: {
    idCidade: "",
    codCidade: "",
    nomeCidade: "",
  },

  FIELDS: {
    ID: "idCidade",
    CODIGO: "codCidade",
    NOME: "nomeCidade",
  } as const,

  INPUT_ERROR: {
    ID: {
      BLANK: `O código de identificação do ${ENTITY_NAME} deve ser informado`,
      VALID: `Informe um código de identificação válido para o ${ENTITY_NAME}`,
    },
    CODIGO: {
      BLANK: `O código do ${ENTITY_NAME} deve ser informado`,
      VALID: `Informe um código válido para o ${ENTITY_NAME}`,
      MAX_LEN: `O código do ${ENTITY_NAME} deve conter no máximo 20 caracteres`,
      MIN_LEN: `O código do ${ENTITY_NAME} deve conter no mínimo 6 caracteres`,
      STRING: `O código do ${ENTITY_NAME} dever ser um texto `,
    },
    NOME: {
      BLANK: `O nome  da ${ENTITY_NAME} deve ser informado`,
      VALID: `O nome  da ${ENTITY_NAME} não está digitado corretamente`,
      MAX_LEN: `O nome  da ${ENTITY_NAME} deve conter no máximo 100 caracteres`,
      MIN_LEN: `O nome  da ${ENTITY_NAME} deve conter no mínimo 6 caracteres`,
      STRING: `O nome  da ${ENTITY_NAME} dever ser um texto `,
    },
  },

  OPERACAO: criarMensagensOperacao(ENTITY_NAME),
};

export const fieldsCidade: (keyof Cidade)[] = [
  CIDADE.FIELDS.ID,
  CIDADE.FIELDS.CODIGO,
  CIDADE.FIELDS.NOME,
];

export const mapaCampoParaMensagem: Record<
  keyof Cidade,
  keyof typeof CIDADE.INPUT_ERROR
> = {
  idCidade: "ID",
  codCidade: "CODIGO",
  nomeCidade: "NOME",
};
