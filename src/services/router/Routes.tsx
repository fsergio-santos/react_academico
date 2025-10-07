import type { RouteObject } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import AtualizarCidade from "../../views/cidade/Atualizar";
import CriarCidade from "../../views/cidade/Criar";
import ListarCidades from "../../views/cidade/Listar";
import { ROTA, ROTA_SISTEMA } from "./Url";

export const routes: RouteObject[] = [
  {
    path: `/${ROTA_SISTEMA}`,
    element: <Layout />,
    children: [
      {
        path: ROTA.CIDADE.LISTAR,
        element: <ListarCidades />,
      },
      {
        path: ROTA.CIDADE.CRIAR,
        element: <CriarCidade />,
      },
      {
        path: `${ROTA.CIDADE.ATUALIZAR}/:idCidade`,
        element: <AtualizarCidade />,
      },
    ],
  },
];
