package br.ueg.trindade.hen_web2;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class PokedexController {

    @Autowired
    private PokedexRepository pokedexRepository;

    // READ — todos
    @GetMapping("/pokemon")
    public List<Pokemon> getAllPokemons() {
        return pokedexRepository.findAll();
    }

    // READ — por id
    @GetMapping("/pokemon/{id}")
    public Pokemon getPokemonById(@PathVariable Long id) {
        return pokedexRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Pokémon não encontrado"));
    }

    // CREATE
    @PostMapping("/pokemon")
    public Pokemon createPokemon(@RequestBody Pokemon pokemon) {
        return pokedexRepository.save(pokemon);
    }

    // UPDATE
    @PutMapping("/pokemon/{id}")
    public Pokemon updatePokemon(@PathVariable Long id, @RequestBody Pokemon pokemonAtualizado) {
        Pokemon pokemon = pokedexRepository.findById(id)
             .orElseThrow(() -> new RuntimeException("Pokémon não encontrado"));

        pokemon.setNome(pokemonAtualizado.getNome());
        pokemon.setDescricao(pokemonAtualizado.getDescricao());
        pokemon.setTipo(pokemonAtualizado.getTipo());
        pokemon.setNumero(pokemonAtualizado.getNumero());

        return pokedexRepository.save(pokemon);
    }

    // DELETE
    @DeleteMapping("/pokemon/{id}")
    public void deletePokemon(@PathVariable Long id) {
        pokedexRepository.deleteById(id);
    }
}