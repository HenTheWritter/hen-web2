// src/components/UsuarioItem.tsx
import type { Usuario } from "../types/Usuario";
interface UsuarioItemProps {
usuario: Usuario;
}
function UsuarioItem({ usuario }: UsuarioItemProps) {
return (
<li>
<strong>{usuario.nome}</strong> ({usuario.username}) — {usuario.email}
</li>
);
}
export default UsuarioItem;