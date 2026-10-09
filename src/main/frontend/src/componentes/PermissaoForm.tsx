import { useState } from "react";
import type { FormEvent } from "react";
import api from "../services/api";
import type { Permissao } from "../types/Permissao";

interface PermissaoFormProps {
  onPermissaoSalva: () => void;
  onCancelar: () => void;
  permissaoEditando?: Permissao | null;
}

function PermissaoForm({ onPermissaoSalva, onCancelar, permissaoEditando }: PermissaoFormProps) {
  const [nome, setNome] = useState(permissaoEditando?.nome ?? "");
  const [descricao, setDescricao] = useState(permissaoEditando?.descricao ?? "");
  const [erro, setErro] = useState("");
  const [salvando, setSalvando] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setErro("");
    setSalvando(true);

    const dados = { nome, descricao };

    try {
      if (permissaoEditando) {
        await api.put(`/permissoes/${permissaoEditando.id}`, dados);
      } else {
        await api.post("/permissoes", dados);
      }
      onPermissaoSalva();
    } catch {
      setErro("Não foi possível salvar. Verifique se o servidor está rodando.");
    } finally {
      setSalvando(false);
    }
  }

  return (
    <form className="card form" onSubmit={handleSubmit}>
      <h2>{permissaoEditando ? "✏️ Editar permissão" : "➕ Nova permissão"}</h2>

      <div className="form-grade">
        <label>
          Nome
          <input value={nome} onChange={(e) => setNome(e.target.value)} placeholder="ADMIN" required />
        </label>

        <label className="campo-largo">
          Descrição
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Acesso total ao sistema"
            rows={3}
          />
        </label>
      </div>

      {erro && <p className="erro">{erro}</p>}

      <div className="form-acoes">
        {permissaoEditando && (
          <button type="button" className="btn btn-cinza" onClick={onCancelar}>
            Cancelar
          </button>
        )}
        <button type="submit" className="btn btn-verde" disabled={salvando}>
          {salvando ? "Salvando..." : permissaoEditando ? "Salvar alterações" : "Cadastrar"}
        </button>
      </div>
    </form>
  );
}

export default PermissaoForm;