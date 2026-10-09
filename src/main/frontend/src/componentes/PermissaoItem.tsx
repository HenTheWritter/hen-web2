import type { Permissao } from "../types/Permissao";

interface PermissaoItemProps {
  permissao: Permissao;
  onEditar: () => void;
  onExcluir: () => void;
}

function PermissaoItem({ permissao, onEditar, onExcluir }: PermissaoItemProps) {
  return (
    <li className="usuario permissao">
      <div className="avatar">🔑</div>

      <div className="usuario-info">
        <strong>{permissao.nome}</strong>
        <span className="usuario-detalhe">{permissao.descricao || "Sem descrição"}</span>
      </div>

      <div className="usuario-acoes">
        <button className="btn btn-amarelo" onClick={onEditar}>Editar</button>
        <button className="btn btn-vermelho" onClick={onExcluir}>Excluir</button>
      </div>
    </li>
  );
}

export default PermissaoItem;