import { useEffect, useMemo, useState, type ChangeEvent } from "react";
import { FaPencilAlt, FaPlus, FaTrashAlt } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { Link } from "react-router-dom";
import PaginationFooter from "../../components/pagination/PaginationFooter";
import { AlertBus } from "../../services/alert/alert.service";
import { apiGetCidades } from "../../services/cidade/api/api.cidade";
import { CIDADE } from "../../services/cidade/constants/cidade.constants";
import type { Cidade } from "../../services/cidade/type/cidade";
import {
  STATUS_TYPES,
  UI_CONFIG,
} from "../../services/constants/system.constants";
import { handleAxiosError } from "../../services/mensagens/error.sistema";
import { ROTA } from "../../services/router/Url";

type SortConfig = {
  key: keyof Cidade;
  direction: "asc" | "desc" | null;
};

const buscarTodasCidades = async (): Promise<Cidade[] | null> => {
  // await axios
  //   .get("http://localhost:8000/rest/sistema/cidade/listar")
  //   .then((response: any) => {
  //     setCidades(response.data.dados);
  //   });
  try {
    const response = await apiGetCidades();
    return response.data.dados;
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

export default function ListarCidades() {
  // classificação da tabela pelas colunas existenstes no registro apresentado
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: CIDADE.FIELDS.NOME,
    direction: "asc",
  });
  //número da página atual que ser exibida na tabela
  const [currentPage, setCurrentPage] = useState<number>(1);
  // quantidade de registros em cada página exibida na tabela
  const [recordsPerPage, setRecordsPerPage] = useState<number>(5);
  // input - cidade que será filtrada no array de cidades e retornando
  // todas as cidades coincidentes com termo pesquisado.
  const [searchTerm, setSearchTerm] = useState<string>("");
  // useState = hook - gancho - função
  // reagir as alterações na variável
  // renderiza -
  const [models, setModels] = useState<Cidade[] | null>(null);

  //hook - função - reagir, quando carregar a página
  //pela primeira vez, quando o array for vázio.
  useEffect(() => {
    async function getCidades() {
      const cidades = await buscarTodasCidades();
      if (cidades) {
        setModels(cidades);
      }
    }
    getCidades();
  }, []);

  const filteredData: Cidade[] = useMemo(() => {
    return (models ?? []).filter((item: any) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [models, searchTerm]);

  const handleSort = (key: keyof Cidade) => {
    setSortConfig((currentConfig) => {
      const isSameKey = currentConfig.key === key;

      // Declara uma variável para o novo estado com o tipo explícito.
      // Isso ajuda o TypeScript a entender o que estamos retornando.
      let newConfig: SortConfig;

      if (!isSameKey) {
        // Se for uma nova coluna, sempre começa com 'asc'
        newConfig = { key, direction: "asc" };
      } else {
        // Se for a mesma coluna, alterna entre os 3 estados
        if (currentConfig.direction === "asc") {
          newConfig = { key, direction: "desc" }; // de asc para desc
        } else if (currentConfig.direction === "desc") {
          newConfig = { key, direction: null }; // de desc para null (sem ordenação)
        } else {
          // de null (sem ordenação) de volta para asc
          newConfig = { key, direction: "asc" };
        }
      }
      return newConfig;
    });
  };

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;

    const key = sortConfig.key; // Chave a ser ordenada
    const direction = sortConfig.direction; // Direção da ordenação

    return [...filteredData].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === "asc" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  }, [filteredData, sortConfig]);

  const totalPages = Math.ceil(filteredData.length / recordsPerPage);
  const startIndex = (currentPage - 1) * recordsPerPage;
  const currentRecords = sortedData.slice(
    startIndex,
    startIndex + recordsPerPage
  );

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleRecordsPerPageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setRecordsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const getSortIcon = (field: string) => {
    if (sortConfig.key === field) {
      return sortConfig.direction === "asc"
        ? UI_CONFIG.ARROW_UP
        : UI_CONFIG.ARROW_DOWN;
    }
    return "";
  };

  return (
    <div className="display">
      <div className="card animated fadeInDown">
        <div className="local_sistema">
          <h2>{CIDADE.TITULO.LISTA}</h2>
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
              <option value={5}>5 por página</option>
              <option value={10}>10 por página</option>
              <option value={15}>15 por página</option>
              <option value={20}>20 por página</option>
              <option value={25}>25 por página</option>
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
            <Link to={`${ROTA.CIDADE.CRIAR}`} className="btn btn-add ml-3 ">
              <span className="btn-icon">
                <i>{<FaPlus />}</i>
              </span>
              {UI_CONFIG.BTN.NEW}
            </Link>
          </div>
        </div>
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th onClick={() => handleSort(CIDADE.FIELDS.CODIGO)}>
                {CIDADE.LABEL.CODIGO_CIDADE} {getSortIcon(CIDADE.FIELDS.CODIGO)}
              </th>
              <th onClick={() => handleSort(CIDADE.FIELDS.NOME)}>
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
                  <td>{model.codCidade}</td>
                  <td>{model.nomeCidade}</td>
                  <td className="center actions">
                    <Link
                      to={`${ROTA.CIDADE.ATUALIZAR}/${model.idCidade}`}
                      className="btn btn-edit ml-2"
                    >
                      <span className="btn-icon">
                        <i>{<FaPencilAlt />}</i>
                      </span>
                      {UI_CONFIG.BTN.EDIT}
                    </Link>

                    <Link
                      to={`${ROTA.CIDADE.EXCLUIR}/${model.idCidade}`}
                      className="btn btn-delete ml-2"
                    >
                      <span className="btn-icon">
                        <i>{<FaTrashAlt />}</i>
                      </span>
                      {UI_CONFIG.BTN.DELETE}
                    </Link>

                    <Link
                      to={`${ROTA.CIDADE.POR_ID}/${model.idCidade}`}
                      className="btn btn-info ml-2 mr-2"
                    >
                      {" "}
                      <span className="btn-icon">
                        <i>{<FaMagnifyingGlass />}</i>
                      </span>
                      {UI_CONFIG.BTN.QUERY}
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
  );
}
