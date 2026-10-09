import { useState } from "react";
import { COR_TIPO } from "../../types/Pokemon";
import type { Pokemon } from "../../types/Pokemon";

interface PokemonItemProps {
  pokemon: Pokemon;
  onEditar: () => void;
  onExcluir: () => void;
}

function PokemonItem({ pokemon, onEditar, onExcluir }: PokemonItemProps) {
  const [imagemQuebrada, setImagemQuebrada] = useState(false);
  const temImagem = pokemon.imagemUrl && !imagemQuebrada;
  const numero = String(pokemon.numero).padStart(3, "0");

  return (
    <li className="pokemon-card">
      <div className="pokemon-foto">
        {temImagem ? (
          <img src={pokemon.imagemUrl} alt={pokemon.nome} onError={() => setImagemQuebrada(true)} />
        ) : (
          <span className="pokebola pokebola-grande" />
        )}
      </div>

      <div className="pokemon-corpo">
        <span className="pokemon-numero">#{numero}</span>
        <h3>{pokemon.nome}</h3>
        <span className="pokemon-tipo" style={{ background: COR_TIPO[pokemon.tipo] ?? "#6b7280" }}>
          {pokemon.tipo}
        </span>
        <p>{pokemon.descricao}</p>
      </div>

      <div className="pokemon-acoes">
        <button className="btn btn-amarelo" onClick={onEditar}>Editar</button>
        <button className="btn btn-vermelho" onClick={onExcluir}>Excluir</button>
      </div>
    </li>
  );
}

export default PokemonItem;