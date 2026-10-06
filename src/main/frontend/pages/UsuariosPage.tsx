import { useEffect, useState } from "react";
import api from "../services/api";
import type { Usuario } from "../types/Usuario";
import UsuarioItem from "../components/UsuarioItem";
import UsuarioForm from "../components/UsuarioForm";

function UsuariosPage() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [editando, setEditando] = useState<Usuario | null>(null);

  function carregarUsuarios() {
    api.get<Usuario[]>("/usuarios").then((resposta) => {
      setUsuarios(resposta.data);
    });
  }

  useEffect(() => {
    carregarUsuarios();
  }, []);

  async function excluir(id: number) {
    await api.delete(`/usuarios/${id}`);
    carregarUsuarios();
  }

  return (
    <div>
      <h1>Usuários</h1>

      <UsuarioForm
        key={editando?.id ?? "novo"}
        usuarioEditando={editando}
        onUsuarioSalvo={() => {
          carregarUsuarios();
          setEditando(null);
        }}
      />

      <ul>
        {usuarios.map((usuario) => (
          <li key={usuario.id}>
            <UsuarioItem usuario={usuario} />
            <button onClick={() => setEditando(usuario)}>Editar</button>
            <button onClick={() => excluir(usuario.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UsuariosPage;