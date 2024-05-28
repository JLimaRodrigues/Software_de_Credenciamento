import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import { auth } from "../../backend/dataService";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    let navigate = useNavigate();

    const handleLogin = async () => {
        try {
            //const token = await auth(username, password);
            const pessoa = await auth(username, password);
            if (pessoa) {
                console.log(pessoa);
                localStorage.setItem('user', JSON.stringify(pessoa));
                navigate('/home');
            } else {
                toast.error('Usuário ou senha inválidos');
            }
        } catch (error) {
            toast.error('Erro na requisição');
        }
      };

    return (
        <>
            <h2>Login</h2>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>

            <ToastContainer />
        </>
    );
}

export default Login;