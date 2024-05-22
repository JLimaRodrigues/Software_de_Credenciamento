import React, { useState } from "react";
import TableUsers from "./TableUsers";
import FormNewUser from "./FormNewUser";
import Button from 'react-bootstrap/Button';
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
            <Button variant="primary" onClick={handleShow}>
                Add New User
            </Button>
            <FormNewUser show={show} handleClose={handleClose} />
        </>
    );
}

export default User;