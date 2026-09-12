import { useEffect, useState } from "react";
import api from "../services/api";
import type { Permissao } from "../types/Permissao";
import PermissaoItem from "./PermissaoItem";

function PermissaoList() {
    const [permissoes, setPermissoes] = useState<Permissao[]>([]);
    
    useEffect(() => {
        api.get<Permissao[]>("/permissoes").then((resposta) => {
            setPermissoes(resposta.data);
        });
    }, []);

    return (
        <ul>
            {permissoes.map((permissao) => (
                <PermissaoItem key={permissao.id} permissao={permissao} />
            ))}
        </ul>
    );
}

export default PermissaoList;