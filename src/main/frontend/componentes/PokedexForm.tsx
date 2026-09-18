import { useEffect, useState } from "react";
import api from "../services/api";
import type { Pokemon } from "../types/Pokemon";
import PokedexForm from "./PokedexForm";

function PokedexList() {
  const [pokemons, setPokemon] = useState<Pokemon[]>([]);
  const [editando, setEditando] = useState<Pokemon | null>(null);

  function carregarPokemon() {
    api.get<Pokemon[]>("/pokemon").then((resposta) => {
      setPokemon(resposta.data);
    });
  }

  useEffect(() => {
    carregarPokemon();
  }, []);

  async function excluir(id: number) {
    if (window.confirm("Tem certeza que deseja excluir este Pokémon?")) {
      await api.delete(`/pokemon/${id}`);
      carregarPokemon(); 
    }
  }

  return (
    <div>
      <h2>Pokédex</h2>
      
      <PokedexForm
        key={editando?.id ?? "novo"}
        pokemonEditando={editando}
        onPokemonSalvo={() => {
          carregarPokemon();
          setEditando(null);
        }}
      />

      <ul>
        {pokemons.map((pokemon) => (
          <li key={pokemon.id} style={{ marginBottom: "10px" }}>
            <strong>{pokemon.numero} - {pokemon.nome}</strong> ({pokemon.tipo})
            <br />
            <small>{pokemon.descricao}</small>
            <br />
            
            <button onClick={() => setEditando(pokemon)}>Editar</button>
            
            <button 
              onClick={() => excluir(pokemon.id)}
              style={{ marginLeft: "5px", color: "red" }}
            >
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PokedexList;