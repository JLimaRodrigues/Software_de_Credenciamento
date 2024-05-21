import React, { useState, useEffect } from 'react';
import { Pessoa } from "../../../backend/db";
import { deletePessoa, getPessoa, getPessoas } from "../../../backend/dataService";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

const TableUsers: React.FC = () => {

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


    return (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Nome</TableCell>
                <TableCell>Login</TableCell>
                <TableCell>CPF</TableCell>
                <TableCell>Nº Inscrição</TableCell>
                <TableCell>Empresa</TableCell>
                <TableCell>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pessoas.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.nome}</TableCell>
                  <TableCell>{row.login}</TableCell>
                  <TableCell>{row.cpf}</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell style={{ display: 'flex' }}>
                    <button onClick={() => UpdatePessoa(row.id)} style={{ backgroundColor: '#138dba'}} title='Editar Usuário'>
                        <FontAwesomeIcon icon={faPen} />
                    </button>
                    <button onClick={() => DeletePessoa(row.id)} style={{ backgroundColor: '#ba132c'}} title='Excluir Usuário'>
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );
}

export default TableUsers;