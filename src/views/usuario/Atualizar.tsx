import { useState } from "react";
import { FaSearchPlus } from "react-icons/fa";
import {
  MdBrowserUpdated,
  MdCancel,
  MdOutlineBrowserUpdated,
} from "react-icons/md";
import Button from "../../components/button/Button";
import Card from "../../components/card/card";
import Input from "../../components/input/Input";
import Loading from "../../components/loading/Loading";
import useMessageDialog from "../../components/modal/Modal";
import Modal from "../../components/modal/ShowModal";
import Navegacao from "../../components/navegacao/Navegacao";
import Imagem from "../../components/profile/Imagem";
import Select from "../../components/select/Select";
import { useAlert } from "../../contexto/AlertContexto";
import {
  BTN,
  STATUS_TYPES,
  TIPO_USUARIO,
  UI_CONFIG,
} from "../../services/constants/system.constants";
import { CIDADE } from "../../services/modules/cidade/constants/cidade.constants";
import { USUARIO } from "../../services/modules/usuario/constants/usuario.constants";
import { useAtualizar } from "../../services/modules/usuario/hooks/useAtualizar";
import { ROTA } from "../../services/router/Url";
import SearchCidade from "../cidade/SearchCidade";

export default function AtualizarUsuario() {
  // hook para exibir mensagens de alerta para o usuário
  const { openModal, MessageDialog } = useMessageDialog();
  // hook de mensagens do sistema
  const { loading, showAlert } = useAlert();
  const [isCidadeModal, setIsCidadeModal] = useState<boolean>(false);
  const {
    model,
    errors,
    handleChangeField,
    handleSelectCidade,
    validarFormulario,
    validateField,
    handleSubmit,
    handleCancel,
  } = useAtualizar();

  /*
   * handleSubmit
   * função que executa a validação geral dos dados e envia os formulário JSON
   * para o servidor nestjs. nest_academico através da API.
   *
   */

  const handleBeforeSumit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validarFormulario()) {
      showAlert(USUARIO.OPERACAO.ATUALIZAR.ERRO, STATUS_TYPES.DANGER);
      return;
    }

    openModal();
  };

  return (
    // Linha principal que divide a tela em duas colunas
    <div className="container">
      {loading ? <Loading /> : null}
      <MessageDialog
        title={`${BTN.EDIT} ${USUARIO.ENTITY}`}
        body={`${UI_CONFIG.ACTION_MODAL.EDIT}${USUARIO.ENTITY}`}
        label={BTN.EDIT}
        onSave={handleSubmit}
        variant={STATUS_TYPES.DANGER}
        iconConfirm={<MdBrowserUpdated size={UI_CONFIG.BUTTON_SIZE} />}
        iconCancel={<MdCancel size={UI_CONFIG.BUTTON_SIZE} />}
      />
      <Card widthCard="100%" marginTopCard="0.1rem">
        <Navegacao
          tituloPagina={USUARIO.TITULO.ATUALIZAR}
          link={ROTA.USUARIO.LISTAR}
          acao={USUARIO.OPERACAO.VOLTAR.LISTAGEM}
        />
        <div className="custom-divider"></div>
        <div className="row">
          <div className="col-lg-4 col-md-12">
            <Imagem />
          </div>
          <div className="col-lg-8 col-md-12">
            <form onSubmit={handleBeforeSumit}>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-1">
                    <Input
                      label={`${USUARIO.LABEL.CODIGO_USUARIO}:`}
                      id={USUARIO.FIELDS.CODIGO_USUARIO}
                      name={USUARIO.FIELDS.CODIGO_USUARIO}
                      value={model.codUsuario}
                      onChange={(e) =>
                        handleChangeField(
                          USUARIO.FIELDS.CODIGO_USUARIO,
                          e.target.value
                        )
                      }
                      onBlur={(e) =>
                        validateField(
                          USUARIO.FIELDS.CODIGO_USUARIO,
                          e.target.value
                        )
                      }
                      error={errors.codUsuario}
                      errorMessages={errors.codUsuarioMensagem}
                    />
                  </div>

                  <div className="mb-1">
                    <Input
                      label={`${USUARIO.LABEL.NOME_USUARIO}:`}
                      id={USUARIO.FIELDS.NOME_USUARIO}
                      name={USUARIO.FIELDS.NOME_USUARIO}
                      value={model.nomeUsuario}
                      onChange={(e) =>
                        handleChangeField(
                          USUARIO.FIELDS.NOME_USUARIO,
                          e.target.value
                        )
                      }
                      onBlur={(e) =>
                        validateField(
                          USUARIO.FIELDS.NOME_USUARIO,
                          e.target.value
                        )
                      }
                      error={errors.nomeUsuario}
                      errorMessages={errors.nomeUsuarioMensagem}
                    />
                  </div>

                  <div className="mb-1">
                    <Input
                      label={`${USUARIO.LABEL.EMAIL}:`}
                      id={USUARIO.FIELDS.EMAIL}
                      name={USUARIO.FIELDS.EMAIL}
                      value={model.email}
                      onChange={(e) =>
                        handleChangeField(USUARIO.FIELDS.EMAIL, e.target.value)
                      }
                      onBlur={(e) =>
                        validateField(USUARIO.FIELDS.EMAIL, e.target.value)
                      }
                      error={errors.email}
                      errorMessages={errors.emailMensagem}
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="mb-1">
                    <Input
                      label={`${USUARIO.LABEL.SENHA}:`}
                      id={USUARIO.FIELDS.SENHA}
                      name={USUARIO.FIELDS.SENHA}
                      value={model.senha}
                      onChange={(e) =>
                        handleChangeField(USUARIO.FIELDS.SENHA, e.target.value)
                      }
                      onBlur={(e) =>
                        validateField(USUARIO.FIELDS.SENHA, e.target.value)
                      }
                      error={errors.senha}
                      errorMessages={errors.senhaMensagem}
                    />
                  </div>

                  <div className="mb-1">
                    <Input
                      label={`${USUARIO.LABEL.CONFIRM_SENHA}:`}
                      id={USUARIO.FIELDS.CONFIRM_SENHA}
                      name={USUARIO.FIELDS.CONFIRM_SENHA}
                      value={model.confirmSenha}
                      onChange={(e) =>
                        handleChangeField(
                          USUARIO.FIELDS.CONFIRM_SENHA,
                          e.target.value
                        )
                      }
                      onBlur={(e) =>
                        validateField(
                          USUARIO.FIELDS.CONFIRM_SENHA,
                          e.target.value
                        )
                      }
                      error={errors.confirmSenha}
                      errorMessages={errors.confirmSenhaMensagem}
                    />
                  </div>

                  <div className="mb-1">
                    <Select
                      id={USUARIO.FIELDS.TIPO_USUARIO}
                      label={`${USUARIO.LABEL.TIPO_USUARIO}:`}
                      value={model.tipo}
                      onChange={(e) =>
                        handleChangeField(
                          USUARIO.FIELDS.TIPO_USUARIO,
                          e.target.value
                        )
                      }
                      onBlur={(e) =>
                        validateField(
                          USUARIO.FIELDS.TIPO_USUARIO,
                          e.target.value
                        )
                      }
                      options={TIPO_USUARIO}
                      error={errors.tipo}
                      errorMessages={errors.tipoMensagem}
                    />
                  </div>
                </div>
                <div className="row" style={{ alignItems: "center" }}>
                  <div className="col-md-6 mb-1">
                    <Input
                      label={`${USUARIO.LABEL.NOME_CIDADE}:`}
                      id={USUARIO.FIELDS.NOME_CIDADE}
                      name={USUARIO.FIELDS.NOME_CIDADE}
                      value={model.nomeCidade}
                      onChange={(e) =>
                        handleChangeField(
                          USUARIO.FIELDS.NOME_CIDADE,
                          e.target.value
                        )
                      }
                      onBlur={(e) =>
                        validateField(
                          USUARIO.FIELDS.NOME_CIDADE,
                          e.target.value
                        )
                      }
                      readOnly={true}
                      error={errors.nomeCidade}
                      errorMessages={errors.nomeCidadeMensagem}
                    />
                  </div>
                  <div className="col-md-6 mb-1">
                    <Button
                      type="button"
                      title={USUARIO.OPERACAO.CRIAR.ACAO}
                      className="btn btn-outline-primary app-button"
                      icon={<FaSearchPlus size={UI_CONFIG.BUTTON_SIZE} />}
                      onClick={() => setIsCidadeModal(true)}
                    >
                      {`${BTN.QUERY}${" "}${CIDADE.ENTITY}`}
                    </Button>
                  </div>
                </div>
                {model.tipo === "1" || model.tipo === "" ? (
                  /* Bloco ALUNO */
                  <div className="row animated fadeInDown">
                    <div className="col-md-4 mb-1">
                      <Input
                        label={`${USUARIO.LABEL.COD_ALUNO}:`}
                        id={USUARIO.FIELDS.COD_ALUNO}
                        name={USUARIO.FIELDS.COD_ALUNO}
                        value={model.codAluno}
                        onChange={(e) =>
                          handleChangeField(
                            USUARIO.FIELDS.COD_ALUNO,
                            e.target.value
                          )
                        }
                        onBlur={(e) =>
                          validateField(
                            USUARIO.FIELDS.COD_ALUNO,
                            e.target.value,
                            model.tipo
                          )
                        }
                        error={errors.codAluno}
                        errorMessages={errors.codAlunoMensagem}
                      />
                    </div>
                    <div className="col-md-4 mb-1">
                      <Input
                        label={`${USUARIO.LABEL.NOME_ALUNO}:`}
                        id={USUARIO.FIELDS.NOME_ALUNO}
                        name={USUARIO.FIELDS.NOME_ALUNO}
                        value={model.nomeAluno}
                        onChange={(e) =>
                          handleChangeField(
                            USUARIO.FIELDS.NOME_ALUNO,
                            e.target.value
                          )
                        }
                        onBlur={(e) =>
                          validateField(
                            USUARIO.FIELDS.NOME_ALUNO,
                            e.target.value
                          )
                        }
                        error={errors.nomeAluno}
                        errorMessages={errors.nomeCidadeMensagem}
                      />
                    </div>
                    <div className="col-md-4 mb-1">
                      <Input
                        label={`${USUARIO.LABEL.IDADE}:`}
                        id={USUARIO.FIELDS.IDADE}
                        name={USUARIO.FIELDS.IDADE}
                        value={model.idade}
                        onChange={(e) =>
                          handleChangeField(
                            USUARIO.FIELDS.IDADE,
                            e.target.value
                          )
                        }
                        onBlur={(e) =>
                          validateField(USUARIO.FIELDS.IDADE, e.target.value)
                        }
                        error={errors.idade}
                        errorMessages={errors.idadeMensagem}
                      />
                    </div>
                  </div>
                ) : (
                  /* Bloco PROFESSOR (Agora agrupado em uma row) */
                  <div className="row animated fadeInDown">
                    <div className="col-md-6 mb-1">
                      <Input
                        label={`${USUARIO.LABEL.COD_PROFESSOR}:`}
                        id={USUARIO.FIELDS.COD_PROFESSOR}
                        name={USUARIO.FIELDS.COD_PROFESSOR}
                        value={model.codProfessor}
                        onChange={(e) =>
                          handleChangeField(
                            USUARIO.FIELDS.COD_PROFESSOR,
                            e.target.value
                          )
                        }
                        onBlur={(e) =>
                          validateField(
                            USUARIO.FIELDS.COD_PROFESSOR,
                            e.target.value
                          )
                        }
                        error={errors.codProfessor}
                        errorMessages={errors.codProfessorMensagem}
                      />
                    </div>

                    <div className="col-md-6 mb-1">
                      <Input
                        label={`${USUARIO.LABEL.NOME_PROFESSOR}:`}
                        id={USUARIO.FIELDS.NOME_PROFESSOR}
                        name={USUARIO.FIELDS.NOME_PROFESSOR}
                        value={model.nomeProfessor}
                        onChange={(e) =>
                          handleChangeField(
                            USUARIO.FIELDS.NOME_PROFESSOR,
                            e.target.value
                          )
                        }
                        onBlur={(e) =>
                          validateField(
                            USUARIO.FIELDS.NOME_PROFESSOR,
                            e.target.value
                          )
                        }
                        error={errors.codProfessor}
                        errorMessages={errors.codProfessorMensagem}
                      />
                    </div>
                  </div>
                )}
              </div>
              <div className="custom-divider"></div>
              <div className="btn-content mt-2 mb-2">
                <div className="btn-wrapper">
                  <Button
                    type={BTN.TYPE.SUBMIT}
                    title={USUARIO.OPERACAO.ATUALIZAR.ACAO}
                    className="btn btn-edit"
                    icon={
                      <MdOutlineBrowserUpdated size={UI_CONFIG.BUTTON_SIZE} />
                    }
                  >
                    {BTN.SAVE}
                  </Button>
                </div>
                <div className="btn-wrapper">
                  <Button
                    type={BTN.TYPE.BUTTON}
                    title={USUARIO.OPERACAO.ATUALIZAR.CANCELAR}
                    onClick={handleCancel}
                    className="btn btn-cancel"
                    icon={<MdCancel size={UI_CONFIG.BUTTON_SIZE} />}
                  >
                    {BTN.CANCEL}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Card>
      <Modal isOpen={isCidadeModal} setModalOpen={setIsCidadeModal}>
        <SearchCidade
          onClose={() => setIsCidadeModal(false)}
          onSelect={handleSelectCidade}
        />
      </Modal>
    </div>
  );
}
