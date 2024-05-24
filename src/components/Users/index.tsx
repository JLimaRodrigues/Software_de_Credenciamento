import React, { useState } from "react";
import UsersTable from "./UsersTable";
import UserForm from "./UserForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { Pessoa } from "../../backend/db";
import './styles.css';

const User: React.FC = () => {
    const [show, setShow] = useState(false);
    const [selectedUser, setSelectedUser] = useState<Pessoa | null>(null);

    const handleClose = () => {
        setSelectedUser(null);
        setShow(false);
    };
    const handleShow = (user?: Pessoa) => {
        setSelectedUser(user || null);
        setShow(true);
    };

    return (
        <>
            <h2>Usuários</h2>
            <p>Página de controle de usuários</p>
            <div className="tabela-usuarios">
                <button className="button-add-user" onClick={() => handleShow()}>
                    <FontAwesomeIcon icon={faUserPlus} />
                </button>
                <UsersTable onEditUser={handleShow} />
            </div>
            <UserForm show={show} handleClose={handleClose} user={selectedUser} />
        </>
    );
}

export default User;
