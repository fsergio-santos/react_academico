import { FaTrashAlt } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import Button from "../../components/button/Button";
import Card from "../../components/card/card";
import Input from "../../components/input/Input";
import Loading from "../../components/loading/Loading";
import useMessageDialog from "../../components/modal/Modal";
import Navegacao from "../../components/navegacao/Navegacao";
import Imagem from "../../components/profile/Imagem";
import { useAlert } from "../../contexto/AlertContexto";
import {
  BTN,
  STATUS_TYPES,
  TipoUsuarioEnum,
  UI_CONFIG,
} from "../../services/constants/system.constants";
import { USUARIO } from "../../services/modules/usuario/constants/usuario.constants";
import { useExcluir } from "../../services/modules/usuario/hooks/useExcluir";
import { ROTA } from "../../services/router/Url";

export default function ExcluirUsuario() {
  // hook para exibir mensagens de alerta para o usuário
  const { openModal, MessageDialog } = useMessageDialog();
  // hook de mensagens do sistema
  const { loading } = useAlert();
  const { model, errors, handleSubmit, handleCancel } = useExcluir();

  /*
   * handleSubmit
   * função que executa a validação geral dos dados e envia os formulário JSON
   * para o servidor nestjs. nest_academico através da API.
   *
   */
  const handleBeforeSumit = (e: React.FormEvent) => {
    e.preventDefault();
    openModal();
  };

  return (
    // Linha principal que divide a tela em duas colunas
    <div className="container">
      {loading ? <Loading /> : null}
      <MessageDialog
        title={`${BTN.DELETE} ${USUARIO.ENTITY}`}
        body={`${UI_CONFIG.ACTION_MODAL.EDIT}${USUARIO.ENTITY}`}
        label={BTN.DELETE}
        onSave={handleSubmit}
        variant={STATUS_TYPES.DANGER}
        iconConfirm={<FaTrashAlt size={UI_CONFIG.BUTTON_SIZE} />}
        iconCancel={<MdCancel size={UI_CONFIG.BUTTON_SIZE} />}
      />
      <Card widthCard="100%" marginTopCard="0.1rem">
        <Navegacao
          tituloPagina={USUARIO.TITULO.EXCLUIR}
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
                      defaultValue={model.codUsuario}
                      error={errors.codUsuario}
                      errorMessages={errors.codUsuarioMensagem}
                    />
                  </div>

                  <div className="mb-1">
                    <Input
                      label={`${USUARIO.LABEL.NOME_USUARIO}:`}
                      id={USUARIO.FIELDS.NOME_USUARIO}
                      name={USUARIO.FIELDS.NOME_USUARIO}
                      defaultValue={model.nomeUsuario}
                      error={errors.nomeUsuario}
                      errorMessages={errors.nomeUsuarioMensagem}
                    />
                  </div>

                  <div className="mb-1">
                    <Input
                      label={`${USUARIO.LABEL.EMAIL}:`}
                      id={USUARIO.FIELDS.EMAIL}
                      name={USUARIO.FIELDS.EMAIL}
                      defaultValue={model.email}
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
                      defaultValue={model.senha}
                      error={errors.senha}
                      errorMessages={errors.senhaMensagem}
                    />
                  </div>

                  <div className="mb-1">
                    <Input
                      label={`${USUARIO.LABEL.CONFIRM_SENHA}:`}
                      id={USUARIO.FIELDS.CONFIRM_SENHA}
                      name={USUARIO.FIELDS.CONFIRM_SENHA}
                      defaultValue={model.confirmSenha}
                      error={errors.confirmSenha}
                      errorMessages={errors.confirmSenhaMensagem}
                    />
                  </div>

                  <div className="mb-1">
                    <Input
                      id={USUARIO.FIELDS.TIPO_USUARIO}
                      label={`${USUARIO.LABEL.TIPO_USUARIO}:`}
                      defaultValue={
                        model.tipo === TipoUsuarioEnum.ALUNO
                          ? TipoUsuarioEnum.DESCRICAO_ALUNO
                          : TipoUsuarioEnum.DESCRICAO_PROFESSOR
                      }
                      readOnly={true}
                      error={errors.tipo}
                      errorMessages={errors.tipoMensagem}
                    />
                  </div>
                </div>
                <div className="row" style={{ alignItems: "center" }}>
                  <div className="col-md-12 mb-1">
                    <Input
                      label={`${USUARIO.LABEL.NOME_CIDADE}:`}
                      id={USUARIO.FIELDS.NOME_CIDADE}
                      name={USUARIO.FIELDS.NOME_CIDADE}
                      defaultValue={model.nomeCidade}
                      readOnly={true}
                      error={errors.nomeCidade}
                      errorMessages={errors.nomeCidadeMensagem}
                    />
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
                        defaultValue={model.codAluno}
                        error={errors.codAluno}
                        errorMessages={errors.codAlunoMensagem}
                      />
                    </div>
                    <div className="col-md-4 mb-1">
                      <Input
                        label={`${USUARIO.LABEL.NOME_ALUNO}:`}
                        id={USUARIO.FIELDS.NOME_ALUNO}
                        name={USUARIO.FIELDS.NOME_ALUNO}
                        defaultValue={model.nomeAluno}
                        error={errors.nomeAluno}
                        errorMessages={errors.nomeCidadeMensagem}
                      />
                    </div>
                    <div className="col-md-4 mb-1">
                      <Input
                        label={`${USUARIO.LABEL.IDADE}:`}
                        id={USUARIO.FIELDS.IDADE}
                        name={USUARIO.FIELDS.IDADE}
                        defaultValue={model.idade}
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
                        defaultValue={model.codProfessor}
                        error={errors.codProfessor}
                        errorMessages={errors.codProfessorMensagem}
                      />
                    </div>

                    <div className="col-md-6 mb-1">
                      <Input
                        label={`${USUARIO.LABEL.NOME_PROFESSOR}:`}
                        id={USUARIO.FIELDS.NOME_PROFESSOR}
                        name={USUARIO.FIELDS.NOME_PROFESSOR}
                        defaultValue={model.nomeProfessor}
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
                    title={USUARIO.OPERACAO.EXCLUIR.ACAO}
                    className="btn btn-edit"
                    icon={<FaTrashAlt size={UI_CONFIG.BUTTON_SIZE} />}
                  >
                    {BTN.SAVE}
                  </Button>
                </div>
                <div className="btn-wrapper">
                  <Button
                    type={BTN.TYPE.BUTTON}
                    title={USUARIO.OPERACAO.EXCLUIR.CANCELAR}
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
    </div>
  );
}
