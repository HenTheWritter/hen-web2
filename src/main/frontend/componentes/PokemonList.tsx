import { useEffect, useState } from "react";
import api from "../services/api";
import type { Pokemon } from "../types/Pokemon";
import PokemonItem from "./PokemonItem";

function PokemonList() {
    const [pokemon, setPokemon] = useState<Pokemon[]>([]);

    useEffect(() => {
        api.get<Pokemon[]>("/pokedex").then((resposta) => {
            setPokemon(resposta.data);
        }).catch((erro) => {
            console.error("Erro ao buscar a Pokédex:", erro);
        });
    }, []);

    return (
        <div>
            <h2>Minha Pokédex</h2>
            <ul>
                {pokemon.map((pokemon) => (
                    <PokemonItem key={pokemon.id} pokemon={pokemon} />
                ))}
            </ul>
        </div>
    );
}

export default PokemonList;