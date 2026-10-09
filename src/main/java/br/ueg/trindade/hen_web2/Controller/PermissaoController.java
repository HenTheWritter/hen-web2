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

import br.ueg.trindade.hen_web2.Model.Permissao;
import br.ueg.trindade.hen_web2.Service.PermissaoService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class PermissaoController {

    @Autowired
    private PermissaoService permissaoService;

    // READ — todos
    @GetMapping("/permissoes")
    public List<Permissao> getAllPermissoes() {
        return permissaoService.listarTodas();
    }

    // READ — por id
    @GetMapping("/permissoes/{id}")
    public Permissao getPermissaoById(@PathVariable Long id) {
        return permissaoService.buscarPorId(id);
    }

    // CREATE
    @PostMapping("/permissoes")
    public Permissao createPermissao(@RequestBody Permissao permissao) {
        return permissaoService.criar(permissao);
    }

    // UPDATE
    @PutMapping("/permissoes/{id}")
    public Permissao updatePermissao(@PathVariable Long id, @RequestBody Permissao permissaoAtualizada) {
        return permissaoService.atualizar(id, permissaoAtualizada);
    }

    // DELETE
    @DeleteMapping("/permissoes/{id}")
    public void deletePermissao(@PathVariable Long id) {
        permissaoService.excluir(id);
    }
}