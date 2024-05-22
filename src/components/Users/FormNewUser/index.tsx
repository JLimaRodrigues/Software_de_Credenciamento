import React, { useState } from "react";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addPessoa } from "../../../backend/dataService";
import { isNotEmpty, isValidEmail, isValidCPF, isValidPassword } from './validate';


const FormNewUser: React.FC<{ show: boolean, handleClose: () => void }> = ({ show, handleClose }) => {
    const [name, setName] = useState('');
    const [login, setLogin] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [cpf, setCpf] = useState('');
    const [errors, setErrors] = useState<string[]>([]);

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

    const handleRegister = (event: React.FormEvent) => {
        event.preventDefault();
        const validationErrors = validateForm();
        if (validationErrors.length > 0) {
            setErrors(validationErrors);
            return;
        }
        // Aqui você pode adicionar a lógica de registro, como chamar uma API
        console.log({ name, login, email, password, cpf });
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
                                    type="text"
                                    id="formCpf"
                                    value={cpf}
                                    onChange={handleTextChange(setCpf)}
                                    placeholder=" "
                                />
                                <label className={cpf ? 'Active' : ''} htmlFor="formCpf">
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
                                <label className={password ? 'Active' : ''} htmlFor="formPassword">
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
                                <label className={confirmPassword ? 'Active' : ''} htmlFor="formConfirmPassword">
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
