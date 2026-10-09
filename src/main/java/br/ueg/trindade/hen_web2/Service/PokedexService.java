package br.ueg.trindade.hen_web2.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.ueg.trindade.hen_web2.Model.Pokemon;
import br.ueg.trindade.hen_web2.Repository.PokedexRepository;

@Service
public class PokedexService {

    @Autowired
    private PokedexRepository pokedexRepository;

    public List<Pokemon> listarTodos() {
        return pokedexRepository.findAll();
    }

    public Pokemon buscarPorId(Long id) {
        return pokedexRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pokémon não encontrado"));
    }

    public Pokemon criar(Pokemon pokemon) {
        return pokedexRepository.save(pokemon);
    }

    public Pokemon atualizar(Long id, Pokemon pokemonAtualizado) {
        Pokemon pokemon = buscarPorId(id);
        pokemon.setNome(pokemonAtualizado.getNome());
        pokemon.setDescricao(pokemonAtualizado.getDescricao());
        pokemon.setTipo(pokemonAtualizado.getTipo());
        pokemon.setNumero(pokemonAtualizado.getNumero());

        return pokedexRepository.save(pokemon);
    }

    public void excluir(Long id) {
        pokedexRepository.deleteById(id);
    }
}