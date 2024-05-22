import React, { useState } from "react";
import TableUsers from "./TableUsers";
import FormNewUser from "./FormNewUser";
import './styles.css';

const User: React.FC = () => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow  = () => setShow(true);

    return (
        <>
            <h2>Usuários</h2>
            <p>Página de controle de usuários</p>
            <div className="tabela-usuarios">
                <TableUsers />
            </div>
            <button onClick={handleShow}>
                New User
            </button>
            <FormNewUser show={show} handleClose={handleClose} />
        </>
    );
}

export default User;