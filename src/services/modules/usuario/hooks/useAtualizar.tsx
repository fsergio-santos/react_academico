import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAlert } from "../../../../contexto/AlertContexto";
import { STATUS_TYPES } from "../../../constants/system.constants";
import { handleAxiosError } from "../../../mensagens/error.sistema";
import { ROTA } from "../../../router/Url";
import type { Cidade } from "../../cidade/type/cidade";
import { useApiUsuario } from "../api/api.usuario";
import { USUARIO } from "../constants/usuario.constants";
import type { ErrosUsuario, Usuario } from "../type/usuario";
import {
  buscarUsuarioPorId,
  setServerErrorsUsuario,
  validarCampo,
  validarCamposVaziosUsuario,
  validarFormularioCompleto,
} from "../utils/usuario.utils";

export const useAtualizar = () => {
  // estado para controlar o movimento entre os inputs
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
  const { idUsuario } = useParams<{ idUsuario: string }>();
  // hook de mensagens do sistema
  const { loading, setLoading, showAlert } = useAlert();
  // hoook para manutenção do registro de usuario.
  const { putUsuario } = useApiUsuario();

  // useEffect hook para atualizar o estado dos atributos da usuario
  // ou atualizar o estado de erros existente no cadastro da usuario.
  React.useEffect(() => {
    setLoading(true);
    async function getUsuario() {
      const response = await buscarUsuarioPorId(Number(idUsuario));
      if (response?.usuario) {
        setModel(response.usuario);
        if (response.errosUsuario) {
          setErrors(response.errosUsuario);
        }
        if (response?.errosUsuario) {
          showAlert(USUARIO.OPERACAO.POR_ID.FIELDS, STATUS_TYPES.DANGER);
        }
      }
      setLoading(false);
    }
    getUsuario();
  }, [idUsuario]);

  /**
   * Função para lidar com a mudança de valor nos campos do formulário.
   * @param name - O nome do campo da interface 'Usuario' que está sendo alterado.
   * @param value - O novo valor do campo.
   */
  const handleChangeField = (name: keyof Usuario, value: string) => {
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
    validateField("idCidade", cidade.idCidade);
    validateField("nomeCidade", cidade.nomeCidade);
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
  const validateField = (
    name: keyof Usuario,
    value: string,
    tipoUsuario?: string
  ) => {
    const messages = validarCampo(name, value, tipoUsuario);
    setErrors((prev) => ({
      ...prev,
      [name]: messages.length > 0,
      [`${name}Mensagem`]: messages.length > 0 ? messages : undefined,
    }));
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    let errosUsuario: ErrosUsuario | null = null;
    if (!idUsuario || !model) {
      showAlert(USUARIO.OPERACAO.POR_ID.NAO_LOCALIZADO, STATUS_TYPES.DANGER);
      navigate(ROTA.USUARIO.LISTAR);
      return;
    }
    if (!validarFormulario()) {
      showAlert(USUARIO.OPERACAO.ATUALIZAR.ERRO, STATUS_TYPES.DANGER);
      return;
    }
    setLoading(true);
    try {
      const response = await putUsuario(idUsuario, model);
      const { mensagem } = response.data;
      if (mensagem) {
        showAlert(mensagem, STATUS_TYPES.SUCCESS);
      }
      navigate(ROTA.USUARIO.LISTAR);
    } catch (error: any) {
      const errosValidacao = validarCamposVaziosUsuario(error.dados);
      if (errosValidacao) {
        errosUsuario = setServerErrorsUsuario(errosValidacao);
      }
      if (errosUsuario) {
        setErrors(errosUsuario);
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
    navigate(ROTA.USUARIO.LISTAR);
  };

  return {
    model,
    errors,
    handleChangeField,
    handleSelectCidade,
    validarFormulario,
    validateField,
    handleSubmit,
    handleCancel,
  };
};
