import React, { useState } from "react";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const FormNewUser: React.FC<{ show: boolean, handleClose: () => void }> = ({ show, handleClose }) => {
    const [name, setName] = useState('');
    const [login, setLogin] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleTextChange = (setter: React.Dispatch<React.SetStateAction<string>>) => 
        (event: React.ChangeEvent<HTMLInputElement>) => {
        setter(event.target.value);
    };

    const resetForm = () => {
        setName('');
        setLogin('');
        setEmail('');
        setPassword('');
    };

    const handleCloseAndReset = () => {
        resetForm();
        handleClose();
    };

    const handleRegister = (event: React.FormEvent) => {
        event.preventDefault();
        // Aqui você pode adicionar a lógica de registro, como chamar uma API
        console.log({ name, login, email, password });
        resetForm();
        handleClose();
    };

    if (!show) {
        return null;
    }

    return (
        <>
            <div className="modal-overlay">
                <div className="modal">
                    <div className="modal-header">
                        <h2>Register New User</h2>
                        <button className="close-button" onClick={handleCloseAndReset}>
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleRegister}>
                            <div className="form-group">
                                <input
                                    type="text"
                                    id="formName"
                                    value={name}
                                    onChange={handleTextChange(setName)}
                                    placeholder=" "
                                />
                                <label className={name ? 'Active' : ''} htmlFor="formName">
                                    Name
                                </label>
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    id="formLogin"
                                    value={login}
                                    onChange={handleTextChange(setLogin)}
                                    placeholder=" "
                                />
                                <label className={login ? 'Active' : ''} htmlFor="formLogin">
                                    Login
                                </label>
                            </div>
                            <div className="form-group">
                                <input
                                    type="email"
                                    id="formEmail"
                                    value={email}
                                    onChange={handleTextChange(setEmail)}
                                    placeholder=" "
                                />
                                <label className={email ? 'Active' : ''} htmlFor="formEmail">
                                    Email
                                </label>
                            </div>
                            <div className="form-group">
                                <input
                                    type="password"
                                    id="formPassword"
                                    value={password}
                                    onChange={handleTextChange(setPassword)}
                                    placeholder=" "
                                />
                                <label className={password ? 'Active' : ''} htmlFor="formPassword">
                                    Password
                                </label>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="button button-secondary" onClick={handleCloseAndReset}>Cancel</button>
                                <button type="submit" className="button button-primary">Register</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FormNewUser;