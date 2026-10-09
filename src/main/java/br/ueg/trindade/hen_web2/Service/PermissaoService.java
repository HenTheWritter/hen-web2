package br.ueg.trindade.hen_web2.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.ueg.trindade.hen_web2.Model.Permissao;
import br.ueg.trindade.hen_web2.Repository.PermissaoRepository;

@Service
public class PermissaoService {

    @Autowired
    private PermissaoRepository permissaoRepository;

    public List<Permissao> listarTodas() {
        return permissaoRepository.findAll();
    }

    public Permissao buscarPorId(Long id) {
        return permissaoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Permissão não encontrada"));
    }

    public Permissao criar(Permissao permissao) {
        return permissaoRepository.save(permissao);
    }

    public Permissao atualizar(Long id, Permissao permissaoAtualizada) {
        Permissao permissao = buscarPorId(id);
        permissao.setNome(permissaoAtualizada.getNome());
        permissao.setDescricao(permissaoAtualizada.getDescricao());

        return permissaoRepository.save(permissao);
    }

    public void excluir(Long id) {
        permissaoRepository.deleteById(id);
    }
}