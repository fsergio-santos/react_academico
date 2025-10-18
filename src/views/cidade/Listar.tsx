import { useEffect, useMemo, useState } from "react";
import { FaPencilAlt, FaPlus, FaTrashAlt } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { Link } from "react-router-dom";
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
  // classificação da tabela pelas colunas existenstes no registro
  // apresentado
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: string | null;
  }>({ key: null, direction: "asc" });
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

  // função para filtrar os registros no array Cidade[]
  // retornando em filteredData dos dados correspondentes
  const filteredData: Cidade[] = useMemo(() => {
    return (models ?? []).filter((item: any) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [models, searchTerm]);

  return (
    <div className="display">
      <div className="card animated fadeInDown">
        <div className="local_sistema">
          <h2>{CIDADE.TITULO.LISTA}</h2>
        </div>
        <div className="table-toolbar-container">
          <div className="table-toolbar-left">
            <select
              className="form-select"
              aria-label="Quantidade de registros por página"
            >
              <option value="10">10 por página</option>
              <option value="15">15 por página</option>
              <option value="20">20 por página</option>
              <option value="25">25 por página</option>
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
        <table>
          <thead>
            <tr>
              <th>{CIDADE.LABEL.CODIGO_CIDADE}</th>
              <th>{CIDADE.LABEL.NOME_CIDADE}</th>
              <th className="center actions" colSpan={3}>
                Ação
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData?.map((model) => (
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
