import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAlert } from "../../../contexto/AlertContexto";
import { AlertBus } from "../../alert/alert.service";
import { STATUS_TYPES } from "../../constants/system.constants";
import { handleAxiosError } from "../../mensagens/error.sistema";
import { ROTA } from "../../router/Url";
import { useApiCidade } from "../api/api.cidade";
import {
  CIDADE,
  fieldsCidade,
  mapaCampoParaMensagem,
} from "../constants/cidade.constants";
import type {
  BuscarCidadePorIdProps,
  Cidade,
  ErrosCidade,
} from "../type/cidade";

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

    setModel((prev) => {
      const update = { ...prev, [name]: value };

      validateField(name, value);

      return update;
    });

    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  /**
   * Valida o formulário inteiro. Usado antes da submissão.
   * @returns 'true' se o formulário for válido, 'false' caso contrário.
   */
  const validarFormulario = (): boolean => {
    const newErrors: ErrosCidade = {};
    let isFormValid = true;

    if (!model) {
      isFormValid = false;
      return isFormValid;
    }

    // Valida 'codCidade'
    const codCidadeMessages = [];
    if (!model.codCidade && model?.codCidade !== null)
      codCidadeMessages.push(CIDADE.INPUT_ERROR.CODIGO.VALID);
    if (model?.codCidade && typeof model.codCidade !== "string")
      codCidadeMessages.push(CIDADE.INPUT_ERROR.CODIGO.STRING);
    if (codCidadeMessages.length > 0) {
      newErrors.codCidade = true;
      newErrors.codCidadeMensagem = codCidadeMessages;
      isFormValid = false;
    }

    // Valida 'nomeCidade'
    const nomeMessages = [];
    if (!model?.nomeCidade || model.nomeCidade.trim().length === 0)
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

  /**
   * Valida um campo individualmente. Geralmente usado no evento onBlur.
   * @param name - O nome do campo a ser validado.
   */
  const validateField = (name: keyof Cidade, value: string) => {
    let messages: string[] = [];

    if (!model) return;

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

  /*
   * função para estilizar o input conforme o seu estado, normal , validado, inválidado.
   */

  const getInputClass = (field: keyof Cidade): string => {
    const hasError = errors[field];
    const wasTouched = touched; // ou touched[field] se for por campo

    if (hasError) {
      return "form-control is-invalid app-label input-error mt-2";
    }

    if (wasTouched && !hasError) {
      return "form-control is-valid app-label input-valid mt-2";
    }

    return "form-control app-label mt-2";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    let errosCidade: ErrosCidade | null = null;
    if (!idCidade || !model) {
      showAlert(CIDADE.OPERACAO.POR_ID.NAO_LOCALIZADO, STATUS_TYPES.DANGER);
      navigate(ROTA.CIDADE.LISTAR);
      return;
    }
    setLoading(true);
    try {
      const response = await putCidade(idCidade, model);
      const { mensagem } = response.data;
      if (mensagem) {
        showAlert(mensagem, STATUS_TYPES.SUCCESS);
      }
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
      navigate(ROTA.CIDADE.LISTAR);
    }
  };

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate(ROTA.CIDADE.LISTAR);
  };

  /**
   *  função para renderizar os erros provenientes do servidor.
   *
   **/

  const setServerErrorsCidade = (
    serverErrors: Partial<Record<keyof Cidade, string[]>> | null
  ): ErrosCidade | null => {
    if (!serverErrors) {
      return null;
    }

    const newErrors: ErrosCidade = {};

    (Object.keys(serverErrors) as (keyof Cidade)[]).forEach((campo) => {
      const mensagens = serverErrors[campo];

      if (mensagens && mensagens.length > 0) {
        newErrors[campo] = true;

        const msgKey = `${String(campo)}Mensagem`;
        (newErrors as any)[msgKey] = [mensagens];
      }
    });

    return Object.keys(newErrors).length > 0 ? newErrors : null;
  };

  /**
   * função para validar os campos vázios
   * que retornaram do servidor em uma consulta
   *
   */

  const validarCamposVaziosCidade = (
    cidade: Cidade
  ): Partial<Record<keyof Cidade, string[]>> | null => {
    const erros: Partial<Record<keyof Cidade, string[]>> = {};

    fieldsCidade.forEach((field) => {
      const valor = cidade[field];

      const isEmpty =
        valor === undefined ||
        valor === null ||
        (typeof valor === "string" && valor.trim() === "");

      if (isEmpty) {
        const keyMessage = mapaCampoParaMensagem[field];
        const mensagemErro = CIDADE.INPUT_ERROR[keyMessage]?.BLANK;
        const mensagem =
          mensagemErro ?? `O campo ${String(field)} é obrigatório`;

        erros[field] = [mensagem];
      }
    });

    return Object.keys(erros).length > 0 ? erros : null;
  };

  /***
   *
   * função para buscar a cidade pelo idCidade para
   * depois fazer a alteração do registro se for necessário.
   * @param idCidade = idCidade a ser pesquisada na tabela de cidade.
   *
   **/

  const buscarCidadePorId = async (
    idCidade: number
  ): Promise<BuscarCidadePorIdProps | null> => {
    let cidade: Cidade | null = null;
    let errosCidade: ErrosCidade | null = null;
    try {
      const response = await getCidade(idCidade);
      // const response = await axios.get(
      //   `http://localhost:8000/rest/sistema/cidade/buscar/${idCidade}`
      // );
      if (response.data.dados) {
        cidade = response.data.dados;
        const errosValidacao = validarCamposVaziosCidade(response.data.dados);
        if (errosValidacao) {
          errosCidade = setServerErrorsCidade(errosValidacao);
        }
      }
      return {
        cidade,
        errosCidade,
      };
    } catch (error: any) {
      const mensagem = handleAxiosError(error);
      AlertBus.emit({
        message: mensagem,
        variant: STATUS_TYPES.DANGER,
        duration: 5000,
      });
    }
    return null;
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
