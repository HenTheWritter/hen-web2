import { FormEvent, useState } from "react";
import api from "../services/api";
import type { Pokemon } from "../types/Pokemon";

interface PokedexFormProps {
  onPokemonSalva: () => void;
  pokemonEditando?: Pokemon | null;
}

function PokedexForm({ onPokemonSalva, pokemonEditando }: PokedexFormProps) {
  const [nome, setNome] = useState(pokemonEditando?.nome ?? "");
  const [descricao, setDescricao] = useState(pokemonEditando?.descricao ?? "");
  const [tipo, setTipo] = useState(pokemonEditando?.tipo ?? "");
  const [numero, setNumero] = useState(pokemonEditando?.numero ?? "");

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const dados = { nome, descricao, tipo, numero };

    if (pokemonEditando) {
      await api.put(`/pokemon/${pokemonEditando.id}`, dados);
    } else {
      await api.post("/pokemon", dados);
    }

    onPokemonSalva();
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        placeholder="Nome do Pokémon"
      />
      <input
        type="text"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
        placeholder="Descrição"
      />
      <input
        type="text"
        value={tipo}
        onChange={(e) => setTipo(e.target.value)}
        placeholder="Tipo"
      />
      <input
        type="number"
        value={numero}
        onChange={(e) => setDescricao(e.target.value)}
        placeholder="Número"
      />
      <button type="submit">
        {pokemonEditando ? "Salvar alterações" : "Cadastrar"}
      </button>
    </form>
  );
}

export default PokedexForm;