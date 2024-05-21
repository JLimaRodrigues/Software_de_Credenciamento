import React, { useEffect, useState } from "react";
import { Pessoa } from "../../backend/db";
import { getPessoas } from "../../backend/dataService";

const User: React.FC = () => {
    const [pessoas, setPessoas] = useState<Pessoa[]>([]);

    useEffect(() => {
        fetchPessoas();
    }, [])

    const fetchPessoas = async () => {
        try {
            const response = await getPessoas();
            if(response){
              setPessoas(response);
            }
        } catch (error) {
            console.error('Erro ao buscar dados das pessoas: ', error)
        }
    };

    const ListaDePessoas = pessoas.map(pessoa => <li key={pessoa.id}>Login: {pessoa.login}, Senha: {pessoa.senha}, Nome: {pessoa.nome}, CPF: {pessoa.cpf}</li>);

    return (
        <>
            <h2>Usuários Page</h2>
            <p>Bem-vindo à Usuários Page!</p>
            <ul>{ListaDePessoas}</ul>
        </>
    );
}

export default User;