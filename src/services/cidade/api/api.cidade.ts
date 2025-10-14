import type { AxiosResponse } from "axios";
import { useCallback } from "react";
import { http } from "../../axios/config.axios";
import { ROTA } from "../../router/Url";
import type { MensagemServidor } from "../../types/mensage.servidor";
import type { Cidade } from "../type/cidade";

export const apiGetCidades = async (): Promise<
  AxiosResponse<MensagemServidor<Cidade[]>>
> => {
  const response = await http.get<MensagemServidor<Cidade[]>>(
    ROTA.CIDADE.LISTAR
  );
  return response;
};

export const apiGetCidade = async (
  id: string | number
): Promise<AxiosResponse<MensagemServidor<Cidade>>> => {
  const response = await http.get<MensagemServidor<Cidade>>(
    `${ROTA.CIDADE.POR_ID}/${id}`
  );
  return response;
};

export const apiPostCidade = async (
  cidade: Cidade
): Promise<AxiosResponse<MensagemServidor<Cidade>>> => {
  const response = await http.post<MensagemServidor<Cidade>>(
    ROTA.CIDADE.CRIAR,
    cidade
  );
  return response;
};

export const apiPutCidade = async (
  id: string | number,
  cidade: Cidade
): Promise<AxiosResponse<MensagemServidor<Cidade>>> => {
  const response = await http.put<MensagemServidor<Cidade>>(
    `${ROTA.CIDADE.ATUALIZAR}/${id}`,
    cidade
  );
  return response;
};

export const apiDeleteCidade = async (
  id: string | number
): Promise<AxiosResponse<MensagemServidor<Cidade>>> => {
  const response = await http.delete<MensagemServidor<Cidade>>(
    `${ROTA.CIDADE.EXCLUIR}/${id}`
  );
  return response;
};

// hooks/useApiCidade.ts

export const useApiCidade = () => {
  const getCidades = useCallback(apiGetCidades, []);
  const getCidade = useCallback(apiGetCidade, []);
  const postCidade = useCallback(apiPostCidade, []);
  const putCidade = useCallback(apiPutCidade, []);
  const deleteCidade = useCallback(apiDeleteCidade, []);

  return {
    getCidades,
    getCidade,
    postCidade,
    putCidade,
    deleteCidade,
  };
};
