import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Cidade } from "../../services/cidade/type/cidade";
import { BTN } from "../../services/constants/constants.button.operacao";
import { ROTA } from "../../services/router/Url";


const buscarTodasCidades = async ():Promise<Cidade[] | null> => {
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
}

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
      if (cidades){
        setModels(cidades);
      }
    }
    getCidades();
  }, []);


  return (
    <div className="display">
      <div className="card animated fadeInDown">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "15px",
          }}
        >
          <h2>Lista de Cidades</h2>
          <Link to={`${ROTA.CIDADE.CRIAR}`} className="btn btn-add">
            {BTN.NEW}
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
                    className="btn btn-edit"
                  >
                    {BTN.EDIT}
                  </Link>
                </td>
                <td className="center actions">
                  <Link
                    to={`${ROTA.CIDADE.EXCLUIR}/${model.idCidade}`}
                    className="btn btn-delete"
                  >
                    {BTN.DELETE}
                  </Link>
                </td>
                <td className="center actions">
                  <Link
                    to={`${ROTA.CIDADE.POR_ID}/${model.idCidade}`}
                    className="btn btn-info"
                  >
                    {BTN.QUERY}
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
