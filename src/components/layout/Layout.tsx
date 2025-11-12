import { FaSignOutAlt } from "react-icons/fa";
import { Link, Outlet } from "react-router-dom";
import { DASHBOARD } from "../../services/dashboard/constants/dashboard.constants";
import { CIDADE } from "../../services/modules/cidade/constants/cidade.constants";
import { USUARIO } from "../../services/modules/usuario/constants/usuario.constants";
import { ROTA, URL_DASHBOARD } from "../../services/router/Url";
import "./layout.css";

export default function Layout() {
  return (
    <div id="defaultLayout">
      <aside>
        <Link to={URL_DASHBOARD}>{DASHBOARD.ALIAS}</Link>
        <Link to={ROTA.CIDADE.LISTAR}>{CIDADE.ENTITY}</Link>
        <Link to={ROTA.USUARIO.LISTAR}>{USUARIO.ENTITY}</Link>
      </aside>
      <div className="content">
        <header>
          <div className="system-title">
            <b>{DASHBOARD.SISTEMA}</b>
          </div>
          <div className="user-info">
            <span className="username">
              <b>Francisco</b>
            </span>
            <a href="#" className="btn btn-logout">
              <FaSignOutAlt className="logout-icon" />
              <span className="logout-text">Logout</span>
            </a>
          </div>
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
