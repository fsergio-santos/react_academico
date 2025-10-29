import React from "react";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../../../contexto/AlertContexto";
import { STATUS_TYPES } from "../../constants/system.constants";
import { handleAxiosError } from "../../mensagens/error.sistema";
import { ROTA } from "../../router/Url";
import { useApiCidade } from "../api/api.cidade";
import { CIDADE } from "../constants/cidade.constants";
import type { Cidade, ErrosCidade } from "../type/cidade";

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
    let messages: string[] = [];

    // Lógica de validação específica para cada campo
    switch (name) {
      case CIDADE.FIELDS.CODIGO:
        if (!value) messages.push(CIDADE.INPUT_ERROR.CODIGO.BLANK);
        if (value && typeof value !== "string")
          messages.push(CIDADE.INPUT_ERROR.CODIGO.STRING);
        break;
      case CIDADE.FIELDS.NOME:
        if (!value || String(value).trim().length === 0) {
          messages.push(CIDADE.INPUT_ERROR.NOME.BLANK);
        }
        if (String(value).length > 0 && String(value).length < 6) {
          messages.push(CIDADE.INPUT_ERROR.NOME.MIN_LEN);
        }
        if (String(value).length > 100) {
          messages.push(CIDADE.INPUT_ERROR.NOME.MAX_LEN);
        }
        break;
    }

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
    const newErrors: ErrosCidade = {};
    let isFormValid = true;

    // Valida 'codCidade'
    const codCidadeMessages = [];
    if (!model.codCidade)
      codCidadeMessages.push(CIDADE.INPUT_ERROR.CODIGO.VALID);
    if (model.codCidade && typeof model.codCidade !== "string")
      codCidadeMessages.push(CIDADE.INPUT_ERROR.CODIGO.STRING);
    if (codCidadeMessages.length > 0) {
      newErrors.codCidade = true;
      newErrors.codCidadeMensagem = codCidadeMessages;
      isFormValid = false;
    }

    // Valida 'nomeCidade'
    const nomeMessages = [];
    if (!model.nomeCidade || model.nomeCidade.trim().length === 0)
      nomeMessages.push(CIDADE.INPUT_ERROR.NOME.BLANK);
    if (model.nomeCidade.length > 0 && model.nomeCidade.length < 6)
      nomeMessages.push(CIDADE.INPUT_ERROR.NOME.MIN_LEN);
    if (model.nomeCidade.length > 100) {
      nomeMessages.push(CIDADE.INPUT_ERROR.NOME.MAX_LEN);
    }
    if (nomeMessages.length > 0) {
      newErrors.nomeCidade = true;
      newErrors.nomeCidadeMensagem = nomeMessages;
      isFormValid = false;
    }

    setErrors(newErrors);
    return isFormValid;
  };

  /*
   * função para estilizar o input conforme o seu estado, normal , validado, inválidado.
   */
  const getInputClass = (field: keyof Cidade): string => {
    const hasError = errors[field];
    const wasTouched = touched[field]; // ou touched[field] se for por campo
    if (hasError) {
      return "form-control is-invalid app-label input-error mt-2";
    }

    if (wasTouched && !hasError) {
      return "form-control is-valid app-label input-valid mt-2";
    }

    return "form-control app-label mt-2";
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
    } catch (error) {
      const mensagem = handleAxiosError(error);
      showAlert(mensagem, STATUS_TYPES.DANGER);
    } finally {
      setLoading(false);
      navigate(ROTA.CIDADE.LISTAR);
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
