import { useState } from "react";
import type { FormEvent } from "react";
import api from "../services/api";
import { TIPOS_POKEMON } from "../types/Pokemon";
import type { Pokemon } from "../types/Pokemon";

interface PokedexFormProps {
  onPokemonSalvo: () => void;
  onCancelar: () => void;
  pokemonEditando?: Pokemon | null;
}

function PokedexForm({ onPokemonSalvo, onCancelar, pokemonEditando }: PokedexFormProps) {
  const [nome, setNome] = useState(pokemonEditando?.nome ?? "");
  const [descricao, setDescricao] = useState(pokemonEditando?.descricao ?? "");
  const [tipo, setTipo] = useState(pokemonEditando?.tipo ?? "");
  const [numero, setNumero] = useState(String(pokemonEditando?.numero ?? ""));
  const [imagemUrl, setImagemUrl] = useState(pokemonEditando?.imagemUrl ?? "");
  const [erro, setErro] = useState("");
  const [salvando, setSalvando] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setErro("");
    setSalvando(true);

    const dados = { nome, descricao, tipo, numero: Number(numero), imagemUrl };

    try {
      if (pokemonEditando) {
        await api.put(`/pokemon/${pokemonEditando.id}`, dados);
      } else {
        await api.post("/pokemon", dados);
      }
      onPokemonSalvo();
    } catch {
      setErro("Não foi possível salvar. Verifique se o servidor está rodando.");
    } finally {
      setSalvando(false);
    }
  }

  return (
    <form className="card form" onSubmit={handleSubmit}>
      <h2>{pokemonEditando ? "✏️ Editar Pokémon" : "➕ Novo Pokémon"}</h2>

      <div className="form-grade">
        <label>
          Número
          <input type="number" min={1} value={numero} onChange={(e) => setNumero(e.target.value)} placeholder="25" required />
        </label>

        <label>
          Nome
          <input value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Pikachu" required />
        </label>

        <label>
          Tipo
          <select value={tipo} onChange={(e) => setTipo(e.target.value)} required>
            <option value="">Selecione...</option>
            {TIPOS_POKEMON.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </label>

        <label>
          URL da imagem
          <input value={imagemUrl} onChange={(e) => setImagemUrl(e.target.value)} placeholder="https://..." />
        </label>

        <label className="campo-largo">
          Descrição
          <textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} placeholder="Um Pokémon elétrico muito carismático..." rows={3} />
        </label>

        {imagemUrl && (
          <div className="campo-largo preview">
            <img src={imagemUrl} alt="Pré-visualização" onError={(e) => (e.currentTarget.style.display = "none")} />
            <span>Pré-visualização</span>
          </div>
        )}
      </div>

      {erro && <p className="erro">{erro}</p>}

      <div className="form-acoes">
        {pokemonEditando && (
          <button type="button" className="btn btn-cinza" onClick={onCancelar}>Cancelar</button>
        )}
        <button type="submit" className="btn btn-verde" disabled={salvando}>
          {salvando ? "Salvando..." : pokemonEditando ? "Salvar alterações" : "Cadastrar"}
        </button>
      </div>
    </form>
  );
}

export default PokedexForm;