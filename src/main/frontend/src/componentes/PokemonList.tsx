import { useEffect, useState } from "react";
import api from "../services/api";
import type { Pokemon } from "../../types/Pokemon";
import PokemonItem from "./PokemonItem";
import PokedexForm from "./PokedexForm";
import "./Usuarios.css";
import "./Pokedex.css";

function PokemonList() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [editando, setEditando] = useState<Pokemon | null>(null);
  const [carregando, setCarregando] = useState(true);

  function carregarPokemon() {
    api
      .get<Pokemon[]>("/pokemon")
      .then((resposta) => setPokemon(resposta.data))
      .catch((erro) => console.error("Erro ao buscar a Pokédex:", erro))
      .finally(() => setCarregando(false));
  }

  useEffect(() => {
    carregarPokemon();
  }, []);

  async function excluir(p: Pokemon) {
    if (!window.confirm(`Excluir ${p.nome} da Pokédex?`)) return;
    await api.delete(`/pokemon/${p.id}`);
    carregarPokemon();
  }

  return (
    <div>
      <PokedexForm
        key={editando?.id ?? "novo"}
        pokemonEditando={editando}
        onCancelar={() => setEditando(null)}
        onPokemonSalvo={() => {
          carregarPokemon();
          setEditando(null);
        }}
      />

      <div className="lista-cabecalho">
        <h2>Pokémon registrados</h2>
        <span className="contador">{pokemon.length}</span>
      </div>

      {carregando ? (
        <p className="vazio">Carregando...</p>
      ) : pokemon.length === 0 ? (
        <div className="card vazio">
          <span>📖</span>
          <p>Nenhum Pokémon registrado ainda.</p>
        </div>
      ) : (
        <ul className="pokedex-grade">
          {[...pokemon]
            .sort((a, b) => a.numero - b.numero)
            .map((p) => (
              <PokemonItem
                key={p.id}
                pokemon={p}
                onEditar={() => {
                  setEditando(p);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                onExcluir={() => excluir(p)}
              />
            ))}
        </ul>
      )}
    </div>
  );
}

export default PokemonList;