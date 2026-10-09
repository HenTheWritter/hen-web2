import { Link } from "react-router-dom";
import "./HomePage.css";

function HomePage() {
  return (
    <>
      <section className="hero">
        <span className="hero-selo">🇧🇷 Feito no Brasil</span>
        <h1>
          Pokédex <span>Brasileira</span>
        </h1>
        <p>
          Cadastre treinadores, registre Pokémon e gerencie permissões em um só lugar.
        </p>
        <Link to="/usuarios" className="hero-botao">
          Gerenciar usuários →
        </Link>
      </section>

      <section className="atalhos">
        <Link to="/usuarios" className="atalho">
          <span className="atalho-icone">👤</span>
          <h3>Usuários</h3>
          <p>Cadastre, edite e remova os treinadores.</p>
        </Link>

        <Link to="/pokedex" className="atalho">
          <span className="atalho-icone">📖</span>
          <h3>Pokédex</h3>
          <p>Registro dos Pokémon.</p>
        </Link>

        <Link to="/permissoes" className="atalho">
          <span className="atalho-icone">🔑</span>
          <h3>Permissões</h3>
          <p>Controle de acesso do sistema.</p>
        </Link>
      </section>
    </>
  );
}

export default HomePage;