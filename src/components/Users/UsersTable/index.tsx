import React, { useState } from 'react';
import { Pessoa, db } from "../../../backend/db";
import { deletePessoa } from "../../../backend/dataService";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

import TableFooter from '../../TableFooter';
import useTable from '../../tools';
import './styles.css';

import { useLiveQuery } from 'dexie-react-hooks';


interface UsersTableProps {
  onEditUser: (user: Pessoa) => void;
}

const UsersTable: React.FC<UsersTableProps> = ({ onEditUser }) => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");

  const pessoasQuery = useLiveQuery(() => db.pessoas.toArray(), []);

  const data = pessoasQuery || [];
  const filteredData = data.filter((pessoa: Pessoa) =>
    pessoa.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const { slice, range } = useTable(filteredData, page, rowsPerPage);

  const DeletePessoa = async (id: number): Promise<void> => {
    try {
      await deletePessoa(id);
    } catch (error) {
      console.log('Erro: ', error);
    }
  };

  if (!pessoasQuery) return <div>Loading...</div>;

  return (
    <>
      <div className="search-bar">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by Name..."
        />
      </div>
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
        {slice.length > 0 && ( slice.map((el: Pessoa) => (
            <tr className="table-rows-item" key={el.id}>
              <td className="table-cell">{el.id}</td>
              <td className="table-cell">{el.nome}</td>
              <td className="table-cell">{el.login}</td>
              <td className="table-cell">{el.cpf}</td>
              <td className="table-cell">-</td>
              <td className="table-cell">-</td>
              <td className="table-cell" style={{ display: 'flex' }}>
                <button onClick={() => onEditUser(el)} style={{ backgroundColor: '#138dba'}} title='Editar Usuário'>
                  <FontAwesomeIcon icon={faPen} />
                </button>
                <button onClick={() => DeletePessoa(el.id)} style={{ backgroundColor: '#ba132c'}} title='Excluir Usuário'>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
          )))}
          {slice.length === 0 && (
            <tr className="table-rows-item" >
              <td className="table-cell" colSpan={7}>Não há registros</td>
            </tr>
          )}
        </tbody>
      </table>
      <TableFooter
        range={range}
        setPage={setPage}
        page={page}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
      />
    </>
  );
}

export default UsersTable;
