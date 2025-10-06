import axios from "axios";
import { useState, type FormEvent, type MouseEvent } from "react";
import { FaSave } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import MensagemErro from "../../components/mensagem/MensagemErro";
import { CIDADE } from "../../services/cidade/constants/cidade.constants";
import type { Cidade, ErrosCidade } from "../../services/cidade/type/cidade";
import { ROTA } from "../../services/router/Url";

export default function CriarCidade() {
  // estado para controlar o movimento entre os inputs
  const [touched, setTouched] = useState<boolean | null>(null);
  // estado para armazenar os dados do formulário cidade
  const [model, setModel] = useState<Cidade>(CIDADE.DADOS_INICIAIS);
  // Estado para armazenar os erros de validação
  const [errors, setErrors] = useState<ErrosCidade>({});
  // hook para naveção entre páginas
  const navigate = useNavigate();

  /**
   * Função para lidar com a mudança de valor nos campos do formulário.
   * @param name - O nome do campo da interface 'Cidade' que está sendo alterado.
   * @param value - O novo valor do campo.
   */
  const handleChangeField = (name: keyof Cidade, value: string) => {
    // Atualiza o estado do modelo com o novo valor
    setModel((prev) => ({ ...prev, [name]: value }));
    // Limpa os erros do campo que está sendo editado
    setErrors((prev) => ({
      ...prev,
      [name]: undefined,
      [`${name}Mensagem`]: undefined,
    }));
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

  /**
   * Valida um campo individualmente. Geralmente usado no evento onBlur.
   * @param name - O nome do campo a ser validado.
   */
  const validateField = (name: keyof Cidade) => {
    let messages: string[] = [];
    const value = model[name];

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
  };

  /*
   * função para estilizar o input conforme o seu estado, normal , validado, inválidado.
   */

  const getInputClass = (): string => {
    if (touched) {
      if (errors.codCidade || errors.nomeCidade) {
        return "form-control is-invalid app-label input-error";
      } else if (errors.codCidade || errors.nomeCidade) {
        return "form-control is-valid app-label input-valid";
      }
    } else {
      if (errors.codCidade || errors.nomeCidade)
        return "form-control is-invalid app-label input-error";
    }
    return "form-control app-label";
  };

  /*
   * handleSubmit
   * função que executa a validação geral dos dados e envia os formulário JSON
   * para o servidor nestjs. nest_academico através da API.
   *
   */

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log(model);
    if (validarFormulario()) {
      const response = await axios.post(
        "http://localhost:8000/rest/sistema/cidade/criar",
        model
      );
      console.log("Formulário válido. Enviando dados:", response);
    } else {
      console.log("Formulário inválido. Verifique os erros.");
    }
  };

  const handleCancel = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate(ROTA.CIDADE.LISTAR);
  };

  return (
    <div className="display">
      <div className="card animated fadeInDown">
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label htmlFor="codCidade" className="app-label">
              Código
            </label>

            <input
              id={CIDADE.FIELDS.CODIGO}
              name={CIDADE.FIELDS.CODIGO}
              className={getInputClass()}
              value={model.codCidade}
              onChange={(e) =>
                handleChangeField(CIDADE.FIELDS.CODIGO, e.target.value)
              }
              onBlur={() => validateField(CIDADE.FIELDS.CODIGO)}
              readOnly={false}
              disabled={false}
              autoComplete="off"
            />
            {errors.codCidade && (
              <MensagemErro
                error={errors.codCidade}
                mensagem={errors.codCidadeMensagem}
              />
            )}
          </div>

          <div className="mb-2">
            <label htmlFor="nomeCidade" className="app-label">
              Nome:
            </label>

            <input
              id={CIDADE.FIELDS.NOME}
              name={CIDADE.FIELDS.NOME}
              className={getInputClass()}
              value={model.nomeCidade}
              onChange={(e) =>
                handleChangeField(CIDADE.FIELDS.NOME, e.target.value)
              }
              onBlur={() => validateField(CIDADE.FIELDS.NOME)}
              readOnly={false}
              disabled={false}
              autoComplete="off"
            />
            {errors.nomeCidade && (
              <MensagemErro
                error={errors.nomeCidade}
                mensagem={errors.nomeCidadeMensagem}
              />
            )}
          </div>
          <div className="btn-content mt-4">
            <button
              id="submit"
              type="submit"
              title={CIDADE.OPERACAO.CRIAR.ACAO}
              className="btn btn-success"
            >
              <span className="btn-icon">
                <i>{<FaSave />}</i>
              </span>
              Salvar
            </button>
            <button
              className="btn btn-cancel"
              id="cancel"
              type="button"
              title={CIDADE.OPERACAO.CRIAR.CANCELAR}
              onClick={handleCancel}
            >
              <span className="btn-icon">
                <i>{<MdCancel />}</i>
              </span>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
