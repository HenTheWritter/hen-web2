import { FormEvent, useState } from "react";
import api from "../services/api";
import type { Usuario } from "../types/Usuario";

interface UsuarioFormProps {
  onUsuarioSalvo: () => void;
  usuarioEditando?: Usuario | null;
}

function UsuarioForm({ onUsuarioSalvo, usuarioEditando }: UsuarioFormProps) {
  const [nome, setNome] = useState(usuarioEditando?.nome ?? "");
  const [username, setUsername] = useState(usuarioEditando?.username ?? "");
  const [idade, setIdade] = useState(usuarioEditando?.idade ?? "");
  const [email, setEmail] = useState(usuarioEditando?.email ?? "");

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const dados = { nome, username, idade, email };

    if (usuarioEditando) {
      await api.put(`/usuarios/${usuarioEditando.id}`, dados);
    } else {
      await api.post("/usuarios", dados);
    }

    onUsuarioSalvo();
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        placeholder="Nome"
      />
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="username"
      />
      <input
        value={idade}
        onChange={(e) => setIdade(e.target.value)}
        placeholder="idade"
      />
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="E-mail"
      />
      <button type="submit">
        {usuarioEditando ? "Salvar alterações" : "Cadastrar"}
      </button>
    </form>
  );
}

export default UsuarioForm;