import UsuarioList from "../componentes/UsuarioList";

function UsuariosPage() {
  return (
    <>
      <div className="pagina-titulo">
        <h1>Usuários</h1>
        <p>Cadastre e gerencie os treinadores da Pokédex Brasileira.</p>
      </div>
      <UsuarioList />
    </>
  );
}

export default UsuariosPage;