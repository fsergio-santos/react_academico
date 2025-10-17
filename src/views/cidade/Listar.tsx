import axios from "axios";
import { useEffect, useState } from "react";
import { FaPencilAlt, FaPlus, FaTrashAlt } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { CIDADE } from "../../services/cidade/constants/cidade.constants";
import type { Cidade } from "../../services/cidade/type/cidade";
import { UI_CONFIG } from "../../services/constants/system.constants";
import { ROTA } from "../../services/router/Url";

const buscarTodasCidades = async (): Promise<Cidade[] | null> => {
  // await axios
  //   .get("http://localhost:8000/rest/sistema/cidade/listar")
  //   .then((response: any) => {
  //     setCidades(response.data.dados);
  //   });
  try {
    const response = await axios.get(
      "http://localhost:8000/rest/sistema/cidade/listar"
    );
    return response.data.dados;
  } catch (error: any) {
    console.log(error);
  }
  return null;
};

export default function ListarCidades() {
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

  return (
    <div className="display">
      <div className="card animated fadeInDown">
        <div className="local_sistema">
          <h2>{CIDADE.TITULO.LISTA}</h2>
          <Link to={`${ROTA.CIDADE.CRIAR}`} className="btn btn-add">
            <span className="btn-icon">
              <i>{<FaPlus />}</i>
            </span>
            {UI_CONFIG.BTN.NEW}
          </Link>
        </div>
        <table>
          <thead>
            <tr>
              <th>Código</th>
              <th>Nome</th>
              <th className="center actions" colSpan={3}>
                Ação
              </th>
            </tr>
          </thead>
          <tbody>
            {models?.map((model) => (
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
