import { CIDADE } from "../cidade/constants/cidade.constants";

export const ROTA_SISTEMA = "sistema";
export const URL_DASHBOARD = `/${ROTA_SISTEMA}/dashboard`;
export const URL_SALVAR_FOTO = "/foto/salvar";
export const URL_DELETAR_FOTO = "/foto/excluir";

const LISTAR = `listar`;
const CRIAR = `criar`;
const POR_ID = `buscar`;
const ATUALIZAR = `alterar`;
const EXCLUIR = `excluir`;

function gerarRotasSistema(entity: string) {
  const base = `${ROTA_SISTEMA}/${entity}`;
  return {
    LISTAR: `/${base}/${LISTAR}`,
    CRIAR: `/${base}/${CRIAR}`,
    POR_ID: `/${base}/${POR_ID}`,
    ATUALIZAR: `/${base}/${ATUALIZAR}`,
    EXCLUIR: `/${base}/${EXCLUIR}`,
  };
}

export const ROTA = {
  CIDADE: gerarRotasSistema(CIDADE.ALIAS),
};

const ROTA_AUTH = "auth";
const LOGIN = "login";
const PROFILE = "profile";
const LOGOUT = "logout";
const REGISTRAR = "register";
const FORGOT_PASSWORD = "forgot-password";
const RESET_PASSWORD = "reset-password";
const REFRESH_TOKEN = "refresh-token";
const CHANGE_PASSWORD = "change-password";

function gerarRotasAuth() {
  const base = `/${ROTA_AUTH}`;
  return {
    BASE: base,
    LOGIN: `${base}/${LOGIN}`,
    LOGOUT: `${base}/${LOGOUT}`,
    PROFILE: `${base}/${PROFILE}`,
    REGISTRAR: `${base}/${REGISTRAR}`,
    FORGOT_PASSWORD: `${base}/${FORGOT_PASSWORD}`,
    RESET_PASSWORD: `${base}/${RESET_PASSWORD}`,
    REFRESH_TOKEN: `${base}/${REFRESH_TOKEN}`,
    CHANGE_PASSWORD: `${base}/${CHANGE_PASSWORD}`,
  };
}

export const ROTA_AUT = gerarRotasAuth();
