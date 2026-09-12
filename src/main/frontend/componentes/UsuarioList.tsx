// src/components/UsuarioList.tsx
import { useEffect, useState } from "react";
import api from "../services/api";
import type { Usuario } from "../types/Usuario";
import UsuarioItem from "./UsuarioItem";

function UsuarioList() {
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    useEffect(() => {
        api.get<Usuario[]>("/usuarios").then((resposta) => {
            setUsuarios(resposta.data);
        });
    }, []);

    return (
        <ul>
            {usuarios.map((usuario) => (
                <UsuarioItem key={usuario.id} usuario={usuario} />
            ))}
        </ul>
    );
}
export default UsuarioList