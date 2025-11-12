import { useState } from "react";
import { FaSave, FaSearchPlus } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import Button from "../../components/button/Button";
import Card from "../../components/card/card";
import Input from "../../components/input/Input";
import Loading from "../../components/loading/Loading";
import Modal from "../../components/modal/ShowModal";
import Navegacao from "../../components/navegacao/Navegacao";
import Imagem from "../../components/profile/Imagem";
import Select from "../../components/select/Select";
import { useAlert } from "../../contexto/AlertContexto";
import {
  BTN,
  TIPO_USUARIO,
  UI_CONFIG,
} from "../../services/constants/system.constants";
import { CIDADE } from "../../services/modules/cidade/constants/cidade.constants";
import { USUARIO } from "../../services/modules/usuario/constants/usuario.constants";
import { useCriar } from "../../services/modules/usuario/hooks/useCriar";
import { ROTA } from "../../services/router/Url";
import SearchCidade from "../cidade/SearchCidade";

export default function CriarUsuario() {
  const [isCidadeModal, setIsCidadeModal] = useState<boolean>(false);
  const { loading } = useAlert();
  const {
    model,
    errors,
    handleChangeField,
    handleSelectCidade,
    validateField,
    handleSubmit,
    handleCancel,
  } = useCriar();

  return (
    // Linha principal que divide a tela em duas colunas
    <div className="container">
      {loading ? <Loading /> : null}
      <Card widthCard="100%" marginTopCard="0.1rem">
        <Navegacao
          tituloPagina={USUARIO.TITULO.CRIAR}
          link={ROTA.USUARIO.LISTAR}
          acao={USUARIO.OPERACAO.VOLTAR.LISTAGEM}
        />
        <div className="custom-divider"></div>
        <div className="row">
          <div className="col-lg-4 col-md-12">
            <Imagem />
          </div>
          <div className="col-lg-8 col-md-12">
            <form onSubmit={handleSubmit}>
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
                    title={USUARIO.OPERACAO.CRIAR.ACAO}
                    className="btn btn-add"
                    icon={<FaSave size={UI_CONFIG.BUTTON_SIZE} />}
                  >
                    {BTN.SAVE}
                  </Button>
                </div>
                <div className="btn-wrapper">
                  <Button
                    type={BTN.TYPE.BUTTON}
                    title={USUARIO.OPERACAO.CRIAR.CANCELAR}
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
