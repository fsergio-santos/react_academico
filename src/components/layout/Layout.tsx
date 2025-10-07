import { Link, Outlet } from "react-router-dom";
import { ROTA } from "../../services/router/Url";
import "./layout.css";

export default function Layout() {
  return (
    <div id="defaultLayout">
      <aside>
        <a href="#">Dashboard</a>
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
              Logout
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
