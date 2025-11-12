import type { AxiosResponse } from "axios";
import { useCallback } from "react";
import { http } from "../../../axios/config.axios";
import { ROTA } from "../../../router/Url";
import type { MensagemServidor } from "../../../types/mensage.servidor";
import type { Usuario } from "../type/usuario";

export const apiGetUsuarios = async (): Promise<
  AxiosResponse<MensagemServidor<Usuario[]>>
> => {
  const response = await http.get<MensagemServidor<Usuario[]>>(
    ROTA.USUARIO.LISTAR
  );
  return response;
};

export const apiGetUsuario = async (
  id: string | number
): Promise<AxiosResponse<MensagemServidor<Usuario>>> => {
  const response = await http.get<MensagemServidor<Usuario>>(
    `${ROTA.USUARIO.POR_ID}/${id}`
  );
  return response;
};

export const apiPostUsuario = async (
  usuario: Usuario
): Promise<AxiosResponse<MensagemServidor<Usuario>>> => {
  const response = await http.post<MensagemServidor<Usuario>>(
    ROTA.USUARIO.CRIAR,
    usuario
  );
  return response;
};

export const apiPutUsuario = async (
  id: string | number,
  usuario: Usuario
): Promise<AxiosResponse<MensagemServidor<Usuario>>> => {
  const response = await http.put<MensagemServidor<Usuario>>(
    `${ROTA.USUARIO.ATUALIZAR}/${id}`,
    usuario
  );
  return response;
};

export const apiDeleteUsuario = async (
  id: string | number
): Promise<AxiosResponse<MensagemServidor<Usuario>>> => {
  const response = await http.delete<MensagemServidor<Usuario>>(
    `${ROTA.USUARIO.EXCLUIR}/${id}`
  );
  return response;
};

// hooks/useApiUsuario.ts

export const useApiUsuario = () => {
  const getUsuarios = useCallback(apiGetUsuarios, []);
  const getUsuario = useCallback(apiGetUsuario, []);
  const postUsuario = useCallback(apiPostUsuario, []);
  const putUsuario = useCallback(apiPutUsuario, []);
  const deleteUsuario = useCallback(apiDeleteUsuario, []);

  return {
    getUsuarios,
    getUsuario,
    postUsuario,
    putUsuario,
    deleteUsuario,
  };
};
