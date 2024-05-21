import React, { useEffect, useState } from "react";
import { Pessoa } from "../../backend/db";
import { deletePessoa, getPessoa, getPessoas } from "../../backend/dataService";

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

    const UpdatePessoa = async (id: number): Promise<void> => {
        try {
            const response = await getPessoa(id);
            console.log('Pessoa: ', response)
        } catch (error) {
            console.log('Erro: ', error)
        }
    }

    const DeletePessoa = async (id: number): Promise<void> => {
        try {
            await deletePessoa(id);
            fetchPessoas();
        } catch (error) {
            console.log('Erro: ', error)
        }
    }

    const ListaDePessoas = pessoas.map(pessoa => <li key={pessoa.id}>Login: {pessoa.login}, Senha: {pessoa.senha}, Nome: {pessoa.nome}, CPF: {pessoa.cpf}, <button onClick={() => UpdatePessoa(pessoa.id)}>Atualizar</button><button onClick={() => DeletePessoa(pessoa.id)}>Excluir {pessoa.id}</button></li>);

    return (
        <>
            <h2>Usuários Page</h2>
            <p>Bem-vindo à Usuários Page!</p>
            <ul>{ListaDePessoas}</ul>
        </>
    );
}

export default User;