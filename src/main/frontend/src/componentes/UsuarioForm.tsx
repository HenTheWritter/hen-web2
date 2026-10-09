import { useState } from "react";
import type { FormEvent } from "react";
import api from "../services/api";
import type { Usuario } from "../../types/Usuario";

interface UsuarioFormProps {
  onUsuarioSalvo: () => void;
  onCancelar: () => void;
  usuarioEditando?: Usuario | null;
}

function UsuarioForm({ onUsuarioSalvo, onCancelar, usuarioEditando }: UsuarioFormProps) {
  const [nome, setNome] = useState(usuarioEditando?.nome ?? "");
  const [username, setUsername] = useState(usuarioEditando?.username ?? "");
  const [idade, setIdade] = useState(String(usuarioEditando?.idade ?? ""));
  const [email, setEmail] = useState(usuarioEditando?.email ?? "");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [salvando, setSalvando] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setErro("");
    setSalvando(true);

    const dados = { nome, username, email, idade: Number(idade), senha };

    try {
      if (usuarioEditando) {
        await api.put(`/usuarios/${usuarioEditando.id}`, dados);
      } else {
        await api.post("/usuarios", dados);
      }
      onUsuarioSalvo();
    } catch {
      setErro("Não foi possível salvar. Verifique se o servidor está rodando.");
    } finally {
      setSalvando(false);
    }
  }

  return (
    <form className="card form" onSubmit={handleSubmit}>
      <h2>{usuarioEditando ? "✏️ Editar usuário" : "➕ Novo usuário"}</h2>

      <div className="form-grade">
        <label>
          Nome
          <input value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Ash Ketchum" required />
        </label>

        <label>
          Username
          <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="ash_ketchum" required />
        </label>

        <label>
          E-mail
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="ash@email.com" required />
        </label>

        <label>
          Idade
          <input type="number" min={0} value={idade} onChange={(e) => setIdade(e.target.value)} placeholder="10" required />
        </label>

        {!usuarioEditando && (
          <label className="campo-largo">
            Senha
            <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="••••••••" required />
          </label>
        )}
      </div>

      {erro && <p className="erro">{erro}</p>}

      <div className="form-acoes">
        {usuarioEditando && (
          <button type="button" className="btn btn-cinza" onClick={onCancelar}>
            Cancelar
          </button>
        )}
        <button type="submit" className="btn btn-verde" disabled={salvando}>
          {salvando ? "Salvando..." : usuarioEditando ? "Salvar alterações" : "Cadastrar"}
        </button>
      </div>
    </form>
  );
}

export default UsuarioForm;