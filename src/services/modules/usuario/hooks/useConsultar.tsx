import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAlert } from "../../../../contexto/AlertContexto";
import { ROTA } from "../../../router/Url";
import { USUARIO } from "../constants/usuario.constants";
import type { ErrosUsuario, Usuario } from "../type/usuario";
import { buscarUsuarioPorId } from "../utils/usuario.utils";

export const useConsultar = () => {
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
  const { setLoading } = useAlert();

  useEffect(() => {
    async function getUsuario() {
      setLoading(true);
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

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate(ROTA.USUARIO.LISTAR);
  };

  return {
    model,
    errors,
    handleCancel,
  };
};
