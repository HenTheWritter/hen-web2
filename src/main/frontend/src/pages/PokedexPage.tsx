import PokemonList from "../componentes/PokemonList";

function PokedexPage() {
  return (
    <>
      <div className="pagina-titulo">
        <h1>Pokédex</h1>
        <p>Registre os Pokémon da Pokédex Brasileira.</p>
      </div>
      <PokemonList />
    </>
  );
}

export default PokedexPage;