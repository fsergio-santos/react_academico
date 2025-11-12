import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAlert } from "../../../../contexto/AlertContexto";
import { STATUS_TYPES } from "../../../constants/system.constants";
import { handleAxiosError } from "../../../mensagens/error.sistema";
import { ROTA } from "../../../router/Url";
import { useApiUsuario } from "../api/api.usuario";
import { USUARIO } from "../constants/usuario.constants";
import type { ErrosUsuario, Usuario } from "../type/usuario";
import { buscarUsuarioPorId } from "../utils/usuario.utils";

export const useExcluir = () => {
  const [touched, setTouched] = React.useState<
    Partial<Record<keyof Usuario, boolean>>
  >({});
  // estado para armazenar os dados do formulário usuario
  const [model, setModel] = React.useState<Usuario>(USUARIO.DADOS_INICIAIS);
  // Estado para armazenar os erros de validação
  const [errors, setErrors] = React.useState<ErrosUsuario>({});
  // hook para naveção entre páginas
  const navigate = useNavigate();
  // hook para recuperar o id passado na url - /sistema/usuario/atualizar/6
  const { idUsuario } = useParams();
  // hook de mensagens do sistema
  const { loading, setLoading, showAlert } = useAlert();
  // hoook para manutenção do registro de usuario.
  const { deleteUsuario } = useApiUsuario();

  useEffect(() => {
    setLoading(true);
    async function getUsuario() {
      const response = await buscarUsuarioPorId(Number(idUsuario));
      if (response?.usuario) {
        setModel(response.usuario);
        if (response.errosUsuario) {
          setErrors(response.errosUsuario);
        }
      }
      setLoading(false);
    }
    getUsuario();
  }, [idUsuario]);

  /*
   * handleSubmit
   * função que executa a exclusão dos dados e envia os formulário JSON
   * para o servidor nestjs. nest_academico através da API.
   *
   */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!idUsuario) {
      showAlert(USUARIO.OPERACAO.POR_ID.NAO_LOCALIZADO, STATUS_TYPES.DANGER);
      navigate(ROTA.USUARIO.LISTAR);
      return;
    }
    setLoading(true);
    try {
      const response = await deleteUsuario(idUsuario);
      const { mensagem } = response.data;
      if (mensagem) {
        showAlert(mensagem, STATUS_TYPES.SUCCESS);
      }
      navigate(ROTA.USUARIO.LISTAR);
    } catch (error: any) {
      const mensagem = handleAxiosError(error);
      showAlert(mensagem, STATUS_TYPES.DANGER);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate(ROTA.USUARIO.LISTAR);
  };

  return {
    model,
    errors,
    handleSubmit,
    handleCancel,
  };
};
