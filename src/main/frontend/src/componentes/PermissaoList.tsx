import { useEffect, useState } from "react";
import api from "../services/api";
import type { Permissao } from "../types/Permissao";
import PermissaoItem from "./PermissaoItem";
import PermissaoForm from "./PermissaoForm";
import "./Usuarios.css";
import "./Pokedex.css";

function PermissaoList() {
  const [permissoes, setPermissoes] = useState<Permissao[]>([]);
  const [editando, setEditando] = useState<Permissao | null>(null);
  const [carregando, setCarregando] = useState(true);

  function carregarPermissoes() {
    api
      .get<Permissao[]>("/permissoes")
      .then((resposta) => setPermissoes(resposta.data))
      .catch((erro) => console.error("Erro ao buscar permissões:", erro))
      .finally(() => setCarregando(false));
  }

  useEffect(() => {
    carregarPermissoes();
  }, []);

  async function excluir(p: Permissao) {
    if (!window.confirm(`Excluir a permissão ${p.nome}?`)) return;
    await api.delete(`/permissoes/${p.id}`);
    carregarPermissoes();
  }

  return (
    <div>
      <PermissaoForm
        key={editando?.id ?? "novo"}
        permissaoEditando={editando}
        onCancelar={() => setEditando(null)}
        onPermissaoSalva={() => {
          carregarPermissoes();
          setEditando(null);
        }}
      />

      <div className="lista-cabecalho">
        <h2>Permissões cadastradas</h2>
        <span className="contador">{permissoes.length}</span>
      </div>

      {carregando ? (
        <p className="vazio">Carregando...</p>
      ) : permissoes.length === 0 ? (
        <div className="card vazio">
          <span>🔑</span>
          <p>Nenhuma permissão cadastrada ainda.</p>
        </div>
      ) : (
        <ul className="lista">
          {permissoes.map((p) => (
            <PermissaoItem
              key={p.id}
              permissao={p}
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

export default PermissaoList;