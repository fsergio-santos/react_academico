import type { RouteObject } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import AtualizarCidade from "../../views/cidade/Atualizar";
import ConsultarCidade from "../../views/cidade/Consultar";
import CriarCidade from "../../views/cidade/Criar";
import ExcluirCidade from "../../views/cidade/Excluir";
import ListarCidades from "../../views/cidade/Listar";
import Dashboard from "../../views/Dashboard";
import AtualizarUsuario from "../../views/usuario/Atualizar";
import ConsultarUsuario from "../../views/usuario/Consultar";
import CriarUsuario from "../../views/usuario/Criar";
import ExcluirUsuario from "../../views/usuario/Excluir";
import ListarUsuarios from "../../views/usuario/Listar";
import { ROTA, ROTA_SISTEMA, URL_DASHBOARD } from "./Url";

export const routes: RouteObject[] = [
  {
    path: `/${ROTA_SISTEMA}`,
    element: <Layout />,
    children: [
      {
        path: URL_DASHBOARD,
        element: <Dashboard />,
      },
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
      {
        path: `${ROTA.CIDADE.EXCLUIR}/:idCidade`,
        element: <ExcluirCidade />,
      },
      {
        path: `${ROTA.CIDADE.POR_ID}/:idCidade`,
        element: <ConsultarCidade />,
      },
      {
        path: ROTA.USUARIO.LISTAR,
        element: <ListarUsuarios />,
      },
      {
        path: ROTA.USUARIO.CRIAR,
        element: <CriarUsuario />,
      },
      {
        path: `${ROTA.USUARIO.ATUALIZAR}/:idUsuario`,
        element: <AtualizarUsuario />,
      },
      {
        path: `${ROTA.USUARIO.EXCLUIR}/:idUsuario`,
        element: <ExcluirUsuario />,
      },
      {
        path: `${ROTA.USUARIO.POR_ID}/:idUsuario`,
        element: <ConsultarUsuario />,
      },
    ],
  },
];
