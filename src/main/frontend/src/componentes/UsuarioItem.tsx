import type { Usuario } from "../../types/Usuario";

interface UsuarioItemProps {
  usuario: Usuario;
  onEditar: () => void;
  onExcluir: () => void;
}

function UsuarioItem({ usuario, onEditar, onExcluir }: UsuarioItemProps) {
  const inicial = usuario.nome.charAt(0).toUpperCase();

  return (
    <li className="usuario">
      <div className="avatar">{inicial}</div>

      <div className="usuario-info">
        <strong>{usuario.nome}</strong>
        <span className="usuario-user">@{usuario.username}</span>
        <span className="usuario-detalhe">
          {usuario.email} · {usuario.idade} anos
        </span>
      </div>

      <div className="usuario-acoes">
        <button className="btn btn-amarelo" onClick={onEditar}>Editar</button>
        <button className="btn btn-vermelho" onClick={onExcluir}>Excluir</button>
      </div>
    </li>
  );
}

export default UsuarioItem;