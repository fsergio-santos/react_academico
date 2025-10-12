import type { AxiosResponse } from "axios";
import { useCallback } from "react";
import { http } from "../../axios/config.axios";
import { ROTA } from "../../router/Url";
import type { MensagemServidor } from "../../types/mensage.servidor";
import type { Cidade } from "../type/cidade";

export const useApiCidade = () => {
  const getCidades = useCallback(async (): Promise<
    AxiosResponse<MensagemServidor<Cidade[]>>
  > => {
    const response = await http.get<MensagemServidor<Cidade[]>>(
      ROTA.CIDADE.LISTAR
    );
    return response;
  }, []);

  const getCidade = async (
    id: string | number
  ): Promise<AxiosResponse<MensagemServidor<Cidade>>> => {
    const response = await http.get<MensagemServidor<Cidade>>(
      `${ROTA.CIDADE.POR_ID}/${id}`
    );
    return response;
  };

  const postCidade = async (
    body: Cidade
  ): Promise<AxiosResponse<MensagemServidor<Cidade>>> => {
    const response = await http.post<MensagemServidor<Cidade>>(
      ROTA.CIDADE.CRIAR,
      body
    );
    return response;
  };

  const putCidade = async (
    id: string | number,
    body: Cidade
  ): Promise<AxiosResponse<MensagemServidor<Cidade>>> => {
    const response = await http.put<MensagemServidor<Cidade>>(
      `${ROTA.CIDADE.ATUALIZAR}/${id}`,
      body
    );
    return response;
  };

  const deleteCidade = async (
    id: string | number
  ): Promise<AxiosResponse<MensagemServidor<Cidade>>> => {
    const response = await http.delete<MensagemServidor<Cidade>>(
      `${ROTA.CIDADE.EXCLUIR}/${id}`
    );
    return response;
  };

  return {
    getCidades,
    getCidade,
    postCidade,
    putCidade,
    deleteCidade,
  };
};

export const useApiAuth = <T>() => {
  const getProfile = async (
    url: string
  ): Promise<AxiosResponse<MensagemServidor<T>>> => {
    const response = await http.get<MensagemServidor<T>>(url);
    return response;
  };

  const postLogout = async (url: string): Promise<AxiosResponse<void>> => {
    const response = await http.post(url);
    return response;
  };

  return {
    getProfile,
    postLogout,
  };
};

