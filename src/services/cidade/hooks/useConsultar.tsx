import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAlert } from "../../../contexto/AlertContexto";
import { ROTA } from "../../router/Url";
import { CIDADE } from "../constants/cidade.constants";
import type { Cidade, ErrosCidade } from "../type/cidade";
import {
  buscarCidadePorId,
  getInputClassParaForm,
} from "../utils/cidade.utils";

export const useConsultar = () => {
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
  const { setLoading, showAlert } = useAlert();

  useEffect(() => {
    async function getCidade() {
      setLoading(true);
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
   * função para estilizar o input conforme o seu estado, normal , validado, inválidado.
   */
  const getInputClass = (field: keyof Cidade): string => {
    return getInputClassParaForm(field, errors, touched);
  };

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate(ROTA.CIDADE.LISTAR);
  };

  return {
    model,
    errors,
    getInputClass,
    handleCancel,
  };
};
