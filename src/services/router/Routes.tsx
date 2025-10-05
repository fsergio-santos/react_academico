import type { RouteObject } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import ListarCidades from "../../views/cidade/Lista";
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
    ],
  },
];
