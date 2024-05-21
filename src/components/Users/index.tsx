import React from "react";
import TableUsers from "./TableUsers";

const User: React.FC = () => {

    return (
        <>
            <h2>Usuários Page</h2>
            <p>Bem-vindo à Usuários Page!</p>
            <TableUsers />
        </>
    );
}

export default User;