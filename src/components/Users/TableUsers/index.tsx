import React, { useState } from 'react';
import { Pessoa, db } from "../../../backend/db";
import { deletePessoa, getPessoa, getPessoas } from "../../../backend/dataService";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

import TableFooter from './TableFooter';
import useTable from './tools';
import './styles.css';

import { useLiveQuery } from 'dexie-react-hooks';

const TableUsers: React.FC = () => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const pessoasQuery = useLiveQuery(() => db.pessoas.toArray(), []);

  const data = pessoasQuery || [];
  const { slice, range } = useTable(data, page, rowsPerPage);
  

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
      } catch (error) {
          console.log('Erro: ', error)
      }
  }


  return (
        <>
          <table className="table">
          <thead className="table-rows-header">
            <tr>
              <th className="table-header">ID</th>
              <th className="table-header">Nome</th>
              <th className="table-header">Login</th>
              <th className="table-header">CPF</th>
              <th className="table-header">N° de inscrição</th>
              <th className="table-header">Empresa</th>
              <th className="table-header">Ações</th>
            </tr>
          </thead>
          <tbody>
            {slice.map((el) => (
              <tr className="table-rows-item" key={el.id}>
                <td className="table-cell">{el.id}</td>
                <td className="table-cell">{el.nome}</td>
                <td className="table-cell">{el.login}</td>
                <td className="table-cell">{el.cpf}</td>
                <td className="table-cell">-</td>
                <td className="table-cell">-</td>
                <td className="table-cell" style={{ display: 'flex' }}>
                    <button onClick={() => UpdatePessoa(el.id)} style={{ backgroundColor: '#138dba'}} title='Editar Usuário'>
                            <FontAwesomeIcon icon={faPen} />
                    </button>
                    <button onClick={() => DeletePessoa(el.id)} style={{ backgroundColor: '#ba132c'}} title='Excluir Usuário'>
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
      </>
    );
}

export default TableUsers;