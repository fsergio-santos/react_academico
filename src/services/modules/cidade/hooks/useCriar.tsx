import React from "react";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../../../../contexto/AlertContexto";
import { STATUS_TYPES } from "../../../constants/system.constants";
import { handleAxiosError } from "../../../mensagens/error.sistema";
import { ROTA } from "../../../router/Url";
import { useApiCidade } from "../api/api.cidade";
import { CIDADE } from "../constants/cidade.constants";
import type { Cidade, ErrosCidade } from "../type/cidade";
import {
  getInputClassParaForm,
  validarCampo,
  validarFormularioCompleto,
} from "../utils/cidade.utils";

export const useCriar = () => {
  const [touched, setTouched] = React.useState<
    Partial<Record<keyof Cidade, boolean>>
  >({});
  // estado para armazenar os dados do formulário cidade
  const [model, setModel] = React.useState<Cidade>(CIDADE.DADOS_INICIAIS);
  // Estado para armazenar os erros de validação
  const [errors, setErrors] = React.useState<ErrosCidade>({});
  // hook para naveção entre páginas
  const navigate = useNavigate();
  // chamando a Api de cidades para comunicação com o servidor
  const { postCidade } = useApiCidade();
  // chama a rotina para mostrar as mensagens de erro
  // rotina para o carregamento da página
  const { loading, setLoading, showAlert } = useAlert();

  /**
   * Função para lidar com a mudança de valor nos campos do formulário.
   * @param name - O nome do campo da interface 'Cidade' que está sendo alterado.
   * @param value - O novo valor do campo.
   */
  const handleChangeField = (name: keyof Cidade, value: string) => {
    // Atualiza o estado do modelo com o novo valor
    setModel((prev) => {
      const update = { ...prev, [name]: value };

      validateField(name, value);

      return update;
    });

    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  /**
   * Valida um campo individualmente. Geralmente usado no evento onBlur.
   * @param name - O nome do campo a ser validado.
   */
  const validateField = (name: keyof Cidade, value: string) => {
    const messages = validarCampo(name, value);

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
   * função para estilizar o input conforme o seu estado, normal , validado, inválidado.
   */
  const getInputClass = (field: keyof Cidade): string => {
    return getInputClassParaForm(field, errors, touched);
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
      showAlert(CIDADE.OPERACAO.CRIAR.ERRO, STATUS_TYPES.DANGER);
    }
    try {
      const response = await postCidade(model);
      const { mensagem } = response.data;
      if (mensagem) {
        showAlert(mensagem, STATUS_TYPES.SUCCESS);
      }
      navigate(ROTA.CIDADE.LISTAR);
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
    navigate(ROTA.CIDADE.LISTAR);
  };

  return {
    model,
    errors,

    handleChangeField,
    validateField,
    getInputClass,
    handleSubmit,
    handleCancel,
  };
};
