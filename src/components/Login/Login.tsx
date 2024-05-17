import React, { useState } from "react";

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
       console.log(`Login: ${username}, Senha: ${password}`);
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