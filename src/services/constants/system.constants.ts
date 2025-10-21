// src/constants.ts ou src/config/constants.ts

import THUMBNAIL_IMAGE from "../../assets/img/thumbnail.avatar.png";
import USER_IMAGE from "../../assets/img/user.png";

// --- Configurações da API e Servidor ---
export const REST_CONFIG = {
  BASE_URL: "http://localhost:8000/rest",
  URL_IMAGEM: "http://localhost:8000/rest/foto/f/",
  URL_IMAGEM_THUMBNAIL: "http://localhost:8000/rest/foto/f/thumbnail.",
};

// --- Configurações de UI e Comportamento ---
export const UI_CONFIG = {
  BUTTON_SIZE: 30,
  BUTTON_SIZE_SHOW_MESSAGE: 30,
  DEFAULT_USER_IMAGE: USER_IMAGE, // É mais comum importar imagens assim
  DEFAULT_THUMBNAIL_IMAGE: THUMBNAIL_IMAGE,
  TOAST_DURATION: 5000, // Nome mais descritivo que TIME
  ARROW_UP: "\u25B2", // ▲
  ARROW_DOWN: "\u25BC", // ▼
  ITEMS_PER_PAGE: 5,
  BTN: {
    NEW: "Novo",
    EDIT: "Atualizar",
    DELETE: "Excluir",
    CANCEL: "Cancelar",
    SAVE: "Salvar",
    QUERY: "Consultar",
    UPDATE: "Salvar",
  },
  ACTION_MODAL: {
    EDIT: `Tem certeza em atualizar o cadastro de `,
    DELETE: `Tem certeza em excluir o cadastro existente de `,
  },
};

// --- Validações e Regras de Negócio ---
export const VALIDATION_RULES = {
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
} as const;
