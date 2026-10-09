import PermissaoList from "../componentes/PermissaoList";

function PermissoesPage() {
  return (
    <>
      <div className="pagina-titulo">
        <h1>Permissões</h1>
        <p>Defina os níveis de acesso da Pokédex Brasileira.</p>
      </div>
      <PermissaoList />
    </>
  );
}

export default PermissoesPage;