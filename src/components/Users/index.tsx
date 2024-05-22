import React from "react";
import TableUsers from "./TableUsers";
import './styles.css';

const User: React.FC = () => {

    return (
        <>
            <h2>Usuários Page</h2>
            <p>Bem-vindo à Usuários Page!</p>
            <div className="tabela-usuarios">
                <TableUsers />
            </div>
        </>
    );
}

export default User;