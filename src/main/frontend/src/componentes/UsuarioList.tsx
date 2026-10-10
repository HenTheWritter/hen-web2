import { useEffect, useState } from "react";
import api from "../services/api";
import type { Usuario } from "../types/Usuario";
import UsuarioItem from "./UsuarioItem";
import UsuarioForm from "./UsuarioForm";
import "./Usuarios.css";

function UsuarioList() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [editando, setEditando] = useState<Usuario | null>(null);
  const [carregando, setCarregando] = useState(true);

  function carregarUsuarios() {
    api
      .get<Usuario[]>("/usuarios")
      .then((resposta) => setUsuarios(resposta.data))
      .finally(() => setCarregando(false));
  }

  useEffect(() => {
    carregarUsuarios();
  }, []);

  async function excluir(usuario: Usuario) {
    if (!window.confirm(`Excluir ${usuario.nome}?`)) return;
    await api.delete(`/usuarios/${usuario.id}`);
    carregarUsuarios();
  }

  return (
    <div>
      <UsuarioForm
        key={editando?.id ?? "novo"}
        usuarioEditando={editando}
        onCancelar={() => setEditando(null)}
        onUsuarioSalvo={() => {
          carregarUsuarios();
          setEditando(null);
        }}
      />

      <div className="lista-cabecalho">
        <h2>Treinadores cadastrados</h2>
        <span className="contador">{usuarios.length}</span>
      </div>

      {carregando ? (
        <p className="vazio">Carregando...</p>
      ) : usuarios.length === 0 ? (
        <div className="card vazio">
          <span>🎒</span>
          <p>Nenhum usuário cadastrado ainda.</p>
        </div>
      ) : (
        <ul className="lista">
          {usuarios.map((usuario) => (
            <UsuarioItem
              key={usuario.id}
              usuario={usuario}
              onEditar={() => {
                setEditando(usuario);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              onExcluir={() => excluir(usuario)}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default UsuarioList;