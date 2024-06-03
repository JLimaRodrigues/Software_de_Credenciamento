import React, { useState, useEffect } from "react";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addPessoa, updatePessoa } from "../../../backend/dataService";
import { isNotEmpty, isValidEmail, isValidCPF, isValidPassword } from './validate';
import { Pessoa, db } from "../../../backend/db";

interface UserFormProps {
    show: boolean;
    handleClose: () => void;
    user?: Pessoa | null;
}

const UserForm: React.FC<UserFormProps> = ({ show, handleClose, user }) => {
    const [name, setName] = useState('');
    const [login, setLogin] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [cpf, setCpf] = useState('');
    const [errors, setErrors] = useState<string[]>([]);

    useEffect(() => {
        if (user) {
            setName(user.nome);
            setLogin(user.login);
            setEmail(user.email || '');
            setCpf(user.cpf);
            setPassword(user.senha || '');
            setConfirmPassword(user.senha ||'');
        } else {
            resetForm();
        }
    }, [user]);

    const handleTextChange = (setter: React.Dispatch<React.SetStateAction<string>>) =>
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setter(event.target.value);
        };

    const resetForm = () => {
        setName('');
        setLogin('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setCpf('');
        setErrors([]);
    };

    const handleCloseAndReset = () => {
        resetForm();
        handleClose();
    };

    const validateForm = () => {
        const newErrors: string[] = [];
        if (!isNotEmpty(name)) newErrors.push("Name is required");
        if (!isNotEmpty(login)) newErrors.push("Login is required");
        if (!isValidEmail(email)) newErrors.push("Invalid email format");
        if (!isValidCPF(cpf)) newErrors.push("CPF must be 11 digits");
        if (!isValidPassword(password)) newErrors.push("Password must be at least 8 characters long and include one uppercase letter, one lowercase letter, one number, and one special character");
        if (password !== confirmPassword) newErrors.push("Passwords do not match");
        return newErrors;
    };

    const handleRegisterOrUpdate = async (event: React.FormEvent) => {
        event.preventDefault();
        const validationErrors = validateForm();
        if (validationErrors.length > 0) {
            setErrors(validationErrors);
            return;
        }
        try {
            if (user) {
                const updatedUser: Pessoa = {
                    ...user,
                    nome: name,
                    login: login,
                    senha: password,
                    cpf: cpf
                };
                await updatePessoa(updatedUser);
            } else {
                const ultimoRegistro = await db.pessoas.orderBy('id').reverse().first();
                const novoId = ultimoRegistro ? ultimoRegistro.id + 1 : 1;

                const pessoa: Pessoa = {
                    id: novoId,
                    nome: name,
                    email: email,
                    login: login,
                    senha: password,
                    cpf: cpf
                };

                await addPessoa(pessoa);
            }

            resetForm();
            handleClose();
        } catch (error) {
            console.error("Erro ao registrar ou atualizar a pessoa:", error);
        }
    };

    if (!show) {
        return null;
    }

    return (
        <>
            <div className="modal-overlay">
                <div className="modal">
                    <div className="modal-header">
                        <h2>{user ? 'Edit User' : 'Register New User'}</h2>
                        <button className="close-button" onClick={handleCloseAndReset}>
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleRegisterOrUpdate}>
                            <div className="form-group">
                                <input
                                    type="text"
                                    id="formName"
                                    value={name}
                                    onChange={handleTextChange(setName)}
                                    placeholder=" "
                                />
                                <label htmlFor="formName">
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
                                <label htmlFor="formLogin">
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
                                <label htmlFor="formEmail">
                                    Email
                                </label>
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    id="formCpf"
                                    value={cpf}
                                    onChange={handleTextChange(setCpf)}
                                    placeholder=" "
                                />
                                <label htmlFor="formCpf">
                                    CPF
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
                                <label htmlFor="formPassword">
                                    Password
                                </label>
                            </div>
                            <div className="form-group">
                                <input
                                    type="password"
                                    id="formConfirmPassword"
                                    value={confirmPassword}
                                    onChange={handleTextChange(setConfirmPassword)}
                                    placeholder=" "
                                />
                                <label htmlFor="formConfirmPassword">
                                    Confirm Password
                                </label>
                            </div>
                            {errors.length > 0 && (
                                <div className="error-messages">
                                    {errors.map((error, index) => (
                                        <p key={index} className="error-text">{error}</p>
                                    ))}
                                </div>
                            )}
                            <div className="modal-footer">
                                <button type="button" className="button button-warning" onClick={handleCloseAndReset}>Cancel</button>
                                <button type="submit" className="button button-primary">{user ? 'Update' : 'Register'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserForm;