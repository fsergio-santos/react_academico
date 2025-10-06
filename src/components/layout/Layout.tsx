import { Outlet } from "react-router-dom";
import "./layout.css";

export default function Layout() {
  return (
    <div id="defaultLayout">
      <aside>
        <a href="#">Dashboard</a>
        <a href="#">Usuário</a>
      </aside>
      <div className="content">
        <header>
          <div className="system-title">Sistema Acadêmico</div>
          <div className="user-info">
            <span className="username">Francisco</span>
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
