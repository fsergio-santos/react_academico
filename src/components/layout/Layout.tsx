import type { ReactNode } from "react";

type LayoutProps = {
  children?: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
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
        <main>{children}</main>
      </div>
    </div>
  );
}
