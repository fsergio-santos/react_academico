import { FaPencilAlt, FaPlus, FaTrashAlt } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Loading from "../../components/loading/Loading";
import PaginationFooter from "../../components/pagination/PaginationFooter";
import { useAlert } from "../../contexto/AlertContexto";
import { CIDADE } from "../../services/cidade/constants/cidade.constants";
import { useListar } from "../../services/cidade/hooks/useListar";
import {
  SELECT_PAGE_SIZE,
  UI_CONFIG,
} from "../../services/constants/system.constants";
import { ROTA } from "../../services/router/Url";

export default function ListarCidades() {
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
    <div className="display">
      {loading ? <Loading /> : null}
      <div className="card animated fadeInDown">
        <div className="local_sistema">
          <h2>{CIDADE.TITULO.LISTAR}</h2>
        </div>
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
            <Link
              to={`${ROTA.CIDADE.CRIAR}`}
              className="btn btn-add ml-3 "
              title={CIDADE.OPERACAO.CRIAR.ACAO}
            >
              <span className="btn-icon">
                <i>{<FaPlus />}</i>
              </span>
              {UI_CONFIG.BTN.NEW}
            </Link>
          </div>
        </div>
        <div id="no_more_table">
          <table className="table table-bordered table-striped cf">
            <thead>
              <tr>
                <th
                  onClick={() => handleSort(CIDADE.FIELDS.CODIGO)}
                  className="table-sort-cursor"
                >
                  {CIDADE.LABEL.CODIGO_CIDADE}{" "}
                  {getSortIcon(CIDADE.FIELDS.CODIGO)}
                </th>
                <th
                  onClick={() => handleSort(CIDADE.FIELDS.NOME)}
                  className="table-sort-cursor"
                >
                  {CIDADE.LABEL.NOME_CIDADE} {getSortIcon(CIDADE.FIELDS.NOME)}
                </th>
                <th className="center actions" colSpan={3}>
                  Ação
                </th>
              </tr>
            </thead>
            <tbody>
              {currentRecords.length > 0 ? (
                currentRecords.map((model) => (
                  <tr key={model.idCidade}>
                    <td data-label={CIDADE.LABEL.CODIGO_CIDADE}>
                      {model.codCidade}
                    </td>
                    <td data-label={CIDADE.LABEL.NOME_CIDADE}>
                      {model.nomeCidade}
                    </td>
                    <td data-label="Ação" className="center actions">
                      <Link
                        to={`${ROTA.CIDADE.ATUALIZAR}/${model.idCidade}`}
                        className="btn btn-edit ml-2"
                        title={CIDADE.OPERACAO.ATUALIZAR.ACAO}
                      >
                        <span className="btn-icon">
                          <i>{<FaPencilAlt />}</i>
                        </span>
                        {/* {UI_CONFIG.BTN.EDIT} */}
                      </Link>
                      <Link
                        to={`${ROTA.CIDADE.EXCLUIR}/${model.idCidade}`}
                        className="btn btn-delete ml-2"
                        title={CIDADE.OPERACAO.EXCLUIR.ACAO}
                      >
                        <span className="btn-icon">
                          <i>{<FaTrashAlt />}</i>
                        </span>
                        {/* {UI_CONFIG.BTN.DELETE} */}
                      </Link>
                      <Link
                        to={`${ROTA.CIDADE.POR_ID}/${model.idCidade}`}
                        className="btn btn-info ml-2 mr-2"
                        title={CIDADE.OPERACAO.POR_ID.ACAO}
                      >
                        {" "}
                        <span className="btn-icon">
                          <i>{<FaMagnifyingGlass />}</i>
                        </span>
                        {/* {UI_CONFIG.BTN.QUERY} */}
                      </Link>
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
      </div>
    </div>
  );
}
