import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAlert } from "../../../../contexto/AlertContexto";
import { STATUS_TYPES } from "../../../constants/system.constants";
import { handleAxiosError } from "../../../mensagens/error.sistema";
import { ROTA } from "../../../router/Url";
import { useApiCidade } from "../api/api.cidade";
import { CIDADE } from "../constants/cidade.constants";
import type { Cidade, ErrosCidade } from "../type/cidade";
import {
  buscarCidadePorId,
  getInputClassParaForm,
  setServerErrorsCidade,
  validarCampo,
  validarCamposVaziosCidade,
  validarFormularioCompleto,
} from "../utils/cidade.utils";

export const useAtualizar = () => {
  // estado para controlar o movimento entre os inputs
  const [touched, setTouched] = React.useState<
    Partial<Record<keyof Cidade, boolean>>
  >({});
  // estado para armazenar os dados do formulário cidade
  const [model, setModel] = React.useState<Cidade>(CIDADE.DADOS_INICIAIS);
  // Estado para armazenar os erros de validação
  const [errors, setErrors] = React.useState<ErrosCidade>({});
  // hook para naveção entre páginas
  const navigate = useNavigate();
  // hook para recuperar o id passado na url - /sistema/cidade/atualizar/6
  const { idCidade } = useParams<{ idCidade: string }>();
  // hook de mensagens do sistema
  const { loading, setLoading, showAlert } = useAlert();
  // hoook para manutenção do registro de cidade.
  const { getCidade, putCidade } = useApiCidade();

  // useEffect hook para atualizar o estado dos atributos da cidade
  // ou atualizar o estado de erros existente no cadastro da cidade.
  React.useEffect(() => {
    setLoading(true);
    async function getCidade() {
      const response = await buscarCidadePorId(Number(idCidade));
      if (response?.cidade) {
        setModel(response.cidade);
        if (response.errosCidade) {
          setErrors(response.errosCidade);
        }
        if (response?.errosCidade) {
          showAlert(CIDADE.OPERACAO.POR_ID.FIELDS, STATUS_TYPES.DANGER);
        }
      }
      setLoading(false);
    }
    getCidade();
  }, [idCidade]);

  /**
   * Função para lidar com a mudança de valor nos campos do formulário.
   * @param name - O nome do campo da interface 'Cidade' que está sendo alterado.
   * @param value - O novo valor do campo.
   */
  const handleChangeField = (name: keyof Cidade, value: string) => {
    // Atualiza o estado do modelo com o novo valor
    setModel((prev) => ({ ...prev, [name]: value }));
    const messages = validarCampo(name, value);
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

  /**
   * Valida um campo individualmente. Geralmente usado no evento onBlur.
   * @param name - O nome do campo a ser validado.
   */
  const validateField = (name: keyof Cidade, value: string) => {
    const messages = validarCampo(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: messages.length > 0,
      [`${name}Mensagem`]: messages.length > 0 ? messages : undefined,
    }));
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  /*
   * função para estilizar o input conforme o seu estado, normal , validado, inválidado.
   */

  const getInputClass = (field: keyof Cidade): string => {
    return getInputClassParaForm(field, errors, touched);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    let errosCidade: ErrosCidade | null = null;
    if (!idCidade || !model) {
      showAlert(CIDADE.OPERACAO.POR_ID.NAO_LOCALIZADO, STATUS_TYPES.DANGER);
      navigate(ROTA.CIDADE.LISTAR);
      return;
    }
    if (!validarFormulario()) {
      showAlert(CIDADE.OPERACAO.ATUALIZAR.ERRO, STATUS_TYPES.DANGER);
      return;
    }
    setLoading(true);
    try {
      const response = await putCidade(idCidade, model);
      const { mensagem } = response.data;
      if (mensagem) {
        showAlert(mensagem, STATUS_TYPES.SUCCESS);
      }
      navigate(ROTA.CIDADE.LISTAR);
    } catch (error: any) {
      const errosValidacao = validarCamposVaziosCidade(error.dados);
      if (errosValidacao) {
        errosCidade = setServerErrorsCidade(errosValidacao);
      }
      if (errosCidade) {
        setErrors(errosCidade);
      }
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
    validarFormulario,
    validateField,
    getInputClass,
    handleSubmit,
    handleCancel,
  };
};
