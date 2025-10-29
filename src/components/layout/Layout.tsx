import { FaSignOutAlt } from "react-icons/fa";
import { Link, Outlet } from "react-router-dom";
import { ROTA, URL_DASHBOARD } from "../../services/router/Url";
import "./layout.css";

export default function Layout() {
  return (
    <div id="defaultLayout">
      <aside>
        <Link to={URL_DASHBOARD}>Dashboard</Link>
        <Link to={ROTA.CIDADE.LISTAR}>Cidades</Link>
      </aside>
      <div className="content">
        <header>
          <div className="system-title">
            <b>Sistema Acadêmico</b>
          </div>
          <div className="user-info">
            <span className="username">
              <b>Francisco</b>
            </span>
            <a href="#" className="btn btn-logout">
              <FaSignOutAlt className="logout-icon"/>
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
