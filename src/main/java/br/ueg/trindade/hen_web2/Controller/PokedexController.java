package br.ueg.trindade.hen_web2.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.ueg.trindade.hen_web2.Model.Pokemon;
import br.ueg.trindade.hen_web2.Service.PokedexService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class PokedexController {

    @Autowired
    private PokedexService pokedexService;

    // READ — todos
    @GetMapping("/pokemon")
    public List<Pokemon> getAllPokemons() {
        return pokedexService.listarTodos();
    }

    // READ — por id
    @GetMapping("/pokemon/{id}")
    public Pokemon getPokemonById(@PathVariable Long id) {
        return pokedexService.buscarPorId(id);
    }

    // CREATE
    @PostMapping("/pokemon")
    public Pokemon createPokemon(@RequestBody Pokemon pokemon) {
        return pokedexService.criar(pokemon);
    }

    // UPDATE
    @PutMapping("/pokemon/{id}")
    public Pokemon updatePokemon(@PathVariable Long id, @RequestBody Pokemon pokemonAtualizado) {
        return pokedexService.atualizar(id, pokemonAtualizado);
    }

    // DELETE
    @DeleteMapping("/pokemon/{id}")
    public void deletePokemon(@PathVariable Long id) {
        pokedexService.excluir(id);
    }
}