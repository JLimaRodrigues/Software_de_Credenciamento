import React, { useState } from "react";
import { auth } from "../../backend/dataService";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    let navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const data = await auth(username, password);
            if (data) {
                navigate('/home')
            } else {
                console.warn('Usuário ou senha inválidos');
            }
        } catch (error) {
            console.warn('Erro: ', error);
        }
      };

    return (
        <>
            <h2>Login</h2>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
        </>
    );
}

export default Login;