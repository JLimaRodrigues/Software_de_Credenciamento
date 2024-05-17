import React, { useState } from "react";
import { addPessoa, getPessoas, syncWithServer } from "../../dataService";
import { Pessoa } from "../../db";

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [pessoas, setPessoas] = useState<Pessoa[]>([]);

    const handleLogin = async () => {
        try {
            addPessoa({nome: 'Teste', sobrenome: 'teste',idade: 23});
            addPessoa({nome: 'teste2', sobrenome: 'teste',idade: 27});
            addPessoa({nome: 'teste3', sobrenome: 'teste',idade: 26});
            const data = await getPessoas();
            setPessoas(data);
            console.log('Pessoas:', data);
        } catch (error) {
            console.warn('Erro: ', error);
        }
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