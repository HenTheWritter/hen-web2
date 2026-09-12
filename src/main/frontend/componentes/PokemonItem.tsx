import type { Pokemon } from "../types/Pokemon";
interface PokedexItemProps {
    pokemon: Pokemon;
}

function PokemonItem({ pokemon }: PokedexItemProps) {
    return (
        <li>
            <strong>{pokemon.numero} - {pokemon.nome}</strong>            
                Tipo: {pokemon.tipo}
            <p>{pokemon.descricao}</p>
        </li>
    );
}

export default PokemonItem;