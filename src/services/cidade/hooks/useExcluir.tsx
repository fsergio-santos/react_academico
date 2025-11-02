import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAlert } from "../../../contexto/AlertContexto";
import { STATUS_TYPES } from "../../constants/system.constants";
import { handleAxiosError } from "../../mensagens/error.sistema";
import { ROTA } from "../../router/Url";
import { useApiCidade } from "../api/api.cidade";
import { CIDADE } from "../constants/cidade.constants";
import type { Cidade, ErrosCidade } from "../type/cidade";
import {
  buscarCidadePorId,
  getInputClassParaForm,
} from "../utils/cidade.utils";

export const useExcluir = () => {
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
  const { idCidade } = useParams();
  // hook de mensagens do sistema
  const { loading, setLoading, showAlert } = useAlert();
  // hoook para manutenção do registro de cidade.
  const { deleteCidade } = useApiCidade();

  useEffect(() => {
    setLoading(true);
    async function getCidade() {
      const response = await buscarCidadePorId(Number(idCidade));
      if (response?.cidade) {
        setModel(response.cidade);
        if (response.errosCidade) {
          setErrors(response.errosCidade);
        }
      }
      setLoading(false);
    }
    getCidade();
  }, [idCidade]);

  /*
   * handleSubmit
   * função que executa a exclusão dos dados e envia os formulário JSON
   * para o servidor nestjs. nest_academico através da API.
   *
   */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!idCidade) {
      showAlert(CIDADE.OPERACAO.POR_ID.NAO_LOCALIZADO, STATUS_TYPES.DANGER);
      navigate(ROTA.CIDADE.LISTAR);
      return;
    }
    setLoading(true);
    try {
      const response = await deleteCidade(idCidade);
      const { mensagem } = response.data;
      if (mensagem) {
        showAlert(mensagem, STATUS_TYPES.SUCCESS);
      }
    } catch (error: any) {
      const mensagem = handleAxiosError(error);
      showAlert(mensagem, STATUS_TYPES.DANGER);
    } finally {
      setLoading(false);
      navigate(ROTA.CIDADE.LISTAR);
    }
  };

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate(ROTA.CIDADE.LISTAR);
  };

  /*
   * função para estilizar o input conforme o seu estado, normal , validado, inválidado.
   */

  const getInputClass = (field: keyof Cidade): string => {
    return getInputClassParaForm(field, errors, touched);
  };

  return {
    model,
    errors,
    getInputClass,
    handleSubmit,
    handleCancel,
  };
};
