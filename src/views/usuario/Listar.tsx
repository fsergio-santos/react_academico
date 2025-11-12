import { FaPencilAlt, FaPlus, FaTrashAlt } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { MdOutlinePendingActions } from "react-icons/md";
import Card from "../../components/card/card";
import ButtonLink from "../../components/link/ButtonLink";
import Loading from "../../components/loading/Loading";
import Navegacao from "../../components/navegacao/Navegacao";
import PaginationFooter from "../../components/pagination/PaginationFooter";
import { useAlert } from "../../contexto/AlertContexto";
import {
  BTN,
  SELECT_PAGE_SIZE,
  TipoUsuarioEnum,
  UI_CONFIG,
} from "../../services/constants/system.constants";
import { USUARIO } from "../../services/modules/usuario/constants/usuario.constants";

import { useListar } from "../../services/modules/usuario/hooks/useListar";
import { ROTA, URL_DASHBOARD } from "../../services/router/Url";

export default function ListarUsuarios() {
  const { loading } = useAlert();

  const {
    currentPage,
    recordsPerPage,
    searchTerm,
    filteredData,
    totalPages,
    currentRecords,
    handleSort,
    handlePageChange,
    handleRecordsPerPageChange,
    getSortIcon,
    setSearchTerm,
  } = useListar();

  return (
    <div className="container">
      <div className="display">
        {loading ? <Loading /> : null}
        <Card>
          <Navegacao
            tituloPagina={USUARIO.TITULO.LISTAR}
            link={URL_DASHBOARD}
            acao={USUARIO.OPERACAO.VOLTAR.DASHBORAD}
          />
          <div className="table-toolbar-container">
            <div className="table-toolbar-left">
              <select
                id="recordsPerPage"
                value={recordsPerPage}
                onChange={(e) => handleRecordsPerPageChange(e)}
                className="form-select"
                aria-label="Quantidade de registros por página"
              >
                {SELECT_PAGE_SIZE.map((op) => (
                  <option key={op.value} value={op.value}>
                    {op.label}
                  </option>
                ))}
              </select>
              <input
                className="form-control"
                placeholder="Pesquisar..."
                aria-label="Campo de pesquisa"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="table-toolbar-right">
              <ButtonLink
                to={ROTA.USUARIO.CRIAR}
                title={USUARIO.OPERACAO.CRIAR.ACAO}
                className="btn btn-add ml-3 "
                icon={<FaPlus size={UI_CONFIG.BUTTON_SIZE} />}
              >
                {BTN.NEW}
              </ButtonLink>
            </div>
          </div>
          <div id="no_more_table">
            <table className="table table-bordered table-striped cf">
              <thead>
                <tr>
                  <th
                    onClick={() => handleSort(USUARIO.FIELDS.CODIGO_USUARIO)}
                    className="table-sort-cursor"
                  >
                    {USUARIO.LABEL.CODIGO_USUARIO}{" "}
                    {getSortIcon(USUARIO.FIELDS.CODIGO_USUARIO)}
                  </th>
                  <th
                    onClick={() => handleSort(USUARIO.FIELDS.NOME_USUARIO)}
                    className="table-sort-cursor"
                  >
                    {USUARIO.LABEL.NOME_USUARIO}{" "}
                    {getSortIcon(USUARIO.FIELDS.NOME_USUARIO)}
                  </th>
                  <th
                    onClick={() => handleSort(USUARIO.FIELDS.TIPO_USUARIO)}
                    className="table-sort-cursor"
                  >
                    {USUARIO.LABEL.TIPO_USUARIO}{" "}
                    {getSortIcon(USUARIO.FIELDS.TIPO_USUARIO)}
                  </th>
                  <th
                    onClick={() => handleSort(USUARIO.FIELDS.STATUS)}
                    className="table-sort-cursor"
                  >
                    {USUARIO.LABEL.STATUS} {getSortIcon(USUARIO.FIELDS.STATUS)}
                  </th>
                  <th className="center actions" colSpan={3}>
                    {<MdOutlinePendingActions />} {USUARIO.LABEL.ACAO}
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentRecords.length > 0 ? (
                  currentRecords.map((model) => (
                    <tr key={model.idUsuario}>
                      <td data-label={USUARIO.LABEL.CODIGO_USUARIO}>
                        {model.codUsuario}
                      </td>
                      <td data-label={USUARIO.LABEL.NOME_USUARIO}>
                        {model.nomeUsuario}
                      </td>
                      <td
                        data-label={USUARIO.LABEL.TIPO_USUARIO}
                        className="status-cell"
                      >
                        <span
                          className={`status-badge ${model.tipo === TipoUsuarioEnum.ALUNO ? "background-secondary" : "background-info "}`}
                        >
                          {model.tipo === TipoUsuarioEnum.ALUNO
                            ? "Aluno"
                            : "Professor"}
                        </span>
                      </td>
                      <td
                        data-label={USUARIO.LABEL.STATUS}
                        className="status-cell"
                      >
                        <span
                          className={`status-badge ${model.ativo === "0" ? "inative" : "active"}`}
                        >
                          {model.ativo === "0" ? "Inativo" : "Ativo"}
                        </span>
                      </td>
                      <td data-label="Ação" className="center actions">
                        <ButtonLink
                          to={`${ROTA.USUARIO.ATUALIZAR}/${model.idUsuario}`}
                          title={USUARIO.OPERACAO.ATUALIZAR.ACAO}
                          className="btn btn-edit ml-2"
                          icon={<FaPencilAlt size={UI_CONFIG.BUTTON_SIZE} />}
                        >
                          {/* {UI_CONFIG.BTN.EDIT} */}
                        </ButtonLink>
                        <ButtonLink
                          to={`${ROTA.USUARIO.EXCLUIR}/${model.idUsuario}`}
                          title={USUARIO.OPERACAO.EXCLUIR.ACAO}
                          className="btn btn-delete ml-2"
                          icon={<FaTrashAlt size={UI_CONFIG.BUTTON_SIZE} />}
                        >
                          {/* {UI_CONFIG.BTN.DELETE} */}
                        </ButtonLink>
                        <ButtonLink
                          to={`${ROTA.USUARIO.POR_ID}/${model.idUsuario}`}
                          title={USUARIO.OPERACAO.POR_ID.ACAO}
                          className="btn btn-info ml-2 mr-2"
                          icon={
                            <FaMagnifyingGlass size={UI_CONFIG.BUTTON_SIZE} />
                          }
                        >
                          {/* {UI_CONFIG.BTN.QUERY} */}
                        </ButtonLink>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3}>Nenhum resultado encontrado</td>
                  </tr>
                )}
              </tbody>
            </table>
            <PaginationFooter
              currentPage={currentPage}
              pageSize={recordsPerPage}
              totalElements={filteredData.length}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </Card>
      </div>
    </div>
  );
}
