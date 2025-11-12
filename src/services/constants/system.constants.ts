// src/constants.ts ou src/config/constants.ts

import USER_IMAGE from "../../assets/img/avatar.png";
import THUMBNAIL_IMAGE from "../../assets/img/thumbnail.avatar.png";

// --- Configurações da API e Servidor ---
export const REST_CONFIG = {
  BASE_URL: "http://localhost:8000/rest",
  URL_IMAGEM: "http://localhost:8000/rest/foto/f/",
  URL_IMAGEM_THUMBNAIL: "http://localhost:8000/rest/foto/f/thumbnail.",
  USER_IMAGE,
  THUMBNAIL_IMAGE,
};

type ButtonType = "button" | "submit";

interface ButtonConfig {
  NEW: string;
  EDIT: string;
  DELETE: string;
  CANCEL: string;
  SAVE: string;
  QUERY: string;
  UPDATE: string;
  SELECT: string;
  TYPE: {
    SUBMIT: ButtonType;
    BUTTON: ButtonType;
  };
}

export const BTN: ButtonConfig = {
  NEW: "Novo",
  EDIT: "Atualizar",
  DELETE: "Excluir",
  CANCEL: "Cancelar",
  SAVE: "Salvar",
  QUERY: "Consultar",
  UPDATE: "Salvar",
  SELECT: "Selecionar",
  TYPE: {
    SUBMIT: "submit",
    BUTTON: "button",
  },
};

// --- Configurações de UI e Comportamento ---
export const UI_CONFIG = {
  BUTTON_SIZE: 18,
  BUTTON_SIZE_SHOW_MESSAGE: 30,
  DEFAULT_USER_IMAGE: USER_IMAGE,
  DEFAULT_THUMBNAIL_IMAGE: THUMBNAIL_IMAGE,
  TOAST_DURATION: 5000,
  ARROW_UP: "\u25B2", // ▲
  ARROW_DOWN: "\u25BC", // ▼
  ITEMS_PER_PAGE: 5,

  ACTION_MODAL: {
    EDIT: `Tem certeza em atualizar o cadastro de `,
    DELETE: `Tem certeza em excluir o cadastro existente de `,
  },
};

// --- Validações e Regras de Negócio ---
export const VALIDATION_RULES = {
  STRING: "",
  ZERO_LENGHT: 0,
  PASSWORD_MIN_LENGTH: 6,
  EMAIL_REGEX:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
};

// --- Tipos de Status e Variantes (para alertas, botões, etc.) ---
export const STATUS_TYPES = {
  SUCCESS: "success",
  DANGER: "delete",
  INFO: "info",
  WARNING: "warning",
  PRIMARY: "primary",
  SECONDARY: "secondary",
  UNDEFINED: "undefined",
  CANCEL: "cancel",
} as const;

interface PageOption {
  value: number;
  label: string;
}

export const SELECT_PAGE_SIZE: PageOption[] = [
  { value: 5, label: "5 por página" },
  { value: 10, label: "10 por página" },
  { value: 15, label: "15 por página" },
  { value: 20, label: "20 por página" },
  { value: 25, label: "25 por página" },
];

export const NAVIGATION_PAGE = {
  VOLTAR: "Voltar",
  ASC: "asc",
  DESC: "desc",
};

export const PLACEHOLDER = {
  SEARCH: "Pesquisar",
};

export const TipoUsuarioEnum = {
  ALUNO: "1",
  DESCRICAO_ALUNO: "Aluno",
  PROFESSOR: "2",
  DESCRICAO_PROFESSOR: "Professor",
} as const;

export const TIPO_USUARIO = [
  {
    value: TipoUsuarioEnum.ALUNO,
    name: TipoUsuarioEnum.DESCRICAO_ALUNO,
  },
  {
    value: TipoUsuarioEnum.PROFESSOR,
    name: TipoUsuarioEnum.DESCRICAO_PROFESSOR,
  },
];
