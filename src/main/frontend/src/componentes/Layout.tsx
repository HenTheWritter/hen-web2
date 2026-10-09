import { NavLink, Outlet } from "react-router-dom";
import "./Layout.css";

function Layout() {
  return (
    <>
      <header className="topo">
        <div className="topo-conteudo">
          <NavLink to="/" className="marca">
            <span className="pokebola" />
            <span>
              Pokédex <strong>Brasileira</strong>
            </span>
          </NavLink>

          <nav className="menu">
            <NavLink to="/" end>Início</NavLink>
            <NavLink to="/usuarios">Usuários</NavLink>
            <NavLink to="/pokedex">Pokédex</NavLink>
            <NavLink to="/permissoes">Permissões</NavLink>
          </nav>
        </div>
        <div className="faixa" />
      </header>

      <main className="conteudo">
        <Outlet />
      </main>

      <footer className="rodape">
        Pokédex Brasileira · Projeto acadêmico
      </footer>
    </>
  );
}

export default Layout;