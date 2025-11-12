import React from "react";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../../../../contexto/AlertContexto";
import { STATUS_TYPES } from "../../../constants/system.constants";
import { handleAxiosError } from "../../../mensagens/error.sistema";
import { ROTA } from "../../../router/Url";
import type { Cidade } from "../../cidade/type/cidade";
import { useApiUsuario } from "../api/api.usuario";
import { USUARIO } from "../constants/usuario.constants";
import type { ErrosUsuario, Usuario } from "../type/usuario";
import {
  validarCampo,
  validarFormularioCompleto,
} from "../utils/usuario.utils";

export const useCriar = () => {
  const [touched, setTouched] = React.useState<
    Partial<Record<keyof Usuario, boolean>>
  >({});
  // estado para armazenar os dados do formulário usuario
  const [model, setModel] = React.useState<Usuario>(USUARIO.DADOS_INICIAIS);
  // Estado para armazenar os erros de validação
  const [errors, setErrors] = React.useState<ErrosUsuario>({});
  // hook para naveção entre páginas
  const navigate = useNavigate();
  // chamando a Api de usuarios para comunicação com o servidor
  const { postUsuario } = useApiUsuario();
  // chama a rotina para mostrar as mensagens de erro
  // rotina para o carregamento da página
  const { loading, setLoading, showAlert } = useAlert();

  /**
   * Função para lidar com a mudança de valor nos campos do formulário.
   * @param name - O nome do campo da interface 'Usuario' que está sendo alterado.
   * @param value - O novo valor do campo.
   */
  const handleChangeField = (name: keyof Usuario, value: string) => {
    // Atualiza o estado do modelo com o novo valor
    setModel((prev) => {
      const update = { ...prev, [name]: value };

      validateField(name, value);

      return update;
    });

    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSelectCidade = (cidade: Cidade) => {
    setModel((prev) => ({
      ...prev,
      idCidade: cidade.idCidade,
      nomeCidade: cidade.nomeCidade,
    }));
        setTouched((prev) => ({
      ...prev,
      idCidade: true,
      nomeCidade: true,
    }));

    // 3. Valida ambos os novos valores
    validateField('idCidade', cidade.idCidade);
    validateField('nomeCidade', cidade.nomeCidade);
  };

  /**
   * Valida um campo individualmente. Geralmente usado no evento onBlur.
   * @param name - O nome do campo a ser validado.
   */
  const validateField = (
    name: keyof Usuario,
    value: string,
    tipoUsuario?: string
  ) => {
    const messages = validarCampo(name, value, tipoUsuario);

    // Atualiza o estado de erros para o campo validado
    setErrors((prev) => ({
      ...prev,
      [name]: messages.length > 0,
      [`${name}Mensagem`]: messages.length > 0 ? messages : undefined,
    }));

    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  /**
   * Valida o formulário inteiro. Usado antes da submissão.
   * @returns 'true' se o formulário for válido, 'false' caso contrário.
   */

  const validarFormulario = (): boolean => {
    const { newErrors, isFormValid } = validarFormularioCompleto(model);
    setErrors(newErrors);
    return isFormValid;
  };

  /*
   * handleSubmit
   * função que executa a validação geral dos dados e envia os formulário JSON
   * para o servidor nestjs. nest_academico através da API.
   *
   */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (!validarFormulario()) {
      showAlert(USUARIO.OPERACAO.CRIAR.ERRO, STATUS_TYPES.DANGER);
    }
    try {
      const response = await postUsuario(model);
      const { mensagem } = response.data;
      if (mensagem) {
        showAlert(mensagem, STATUS_TYPES.SUCCESS);
      }
      navigate(ROTA.USUARIO.LISTAR);
    } catch (error) {
      const mensagem = handleAxiosError(error);
      showAlert(mensagem, STATUS_TYPES.DANGER);
    } finally {
      setLoading(false);
      setTouched({});
    }
  };

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate(ROTA.USUARIO.LISTAR);
  };

  return {
    model,
    errors,
    handleChangeField,
    handleSelectCidade,
    validateField,
    handleSubmit,
    handleCancel,
  };
};
