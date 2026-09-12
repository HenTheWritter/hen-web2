import type { Permissao } from "../types/Permissao";
interface PermissaoItemProps {
    permissao: Permissao;
}
function PermissaoItem({ permissao }: PermissaoItemProps) {
    return (
        <li>
        <strong>{permissao.nome}</strong> ({permissao.descricao})
        </li>
    );
}
export default PermissaoItem;