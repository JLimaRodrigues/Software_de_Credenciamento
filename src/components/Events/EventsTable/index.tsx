import React, { useState } from 'react';
import { Evento, db } from "../../../backend/db";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

import TableFooter from '../../TableFooter';
import useTable from '../../tools';
import '../../Users/UsersTable/styles.css';

import { useLiveQuery } from 'dexie-react-hooks';


interface EventsTableProps {
  onEditEvent: (user: Evento) => void;
}

const EventsTable: React.FC<EventsTableProps> = ({ onEditEvent }) => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");

  const eventosQuery = useLiveQuery(() => db.eventos.toArray(), []);

  const data = eventosQuery || [];
  const filteredData = data.filter((evento: Evento) =>
    evento.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const { slice, range } = useTable(filteredData, page, rowsPerPage);

  const DeleteEvento = async (id: number): Promise<void> => {
    try {
      //await DeleteEvento(id);
      console.log(id)
    } catch (error) {
      console.log('Erro: ', error);
    }
  };

  if (!eventosQuery) return <div>Loading...</div>;

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
            <th className="table-header">Empresa</th>
            <th className="table-header">Endereço</th>
            <th className="table-header">Tipo de Evento</th>
            <th className="table-header">Qtd Participantes</th>
            <th className="table-header">Ações</th>
          </tr>
        </thead>
        <tbody>
          {slice.map((el: Evento) => (
            <tr className="table-rows-item" key={el.id}>
              <td className="table-cell">{el.id}</td>
              <td className="table-cell">{el.nome}</td>
              <td className="table-cell">{el.empresa}</td>
              <td className="table-cell">{el.endereco}</td>
              <td className="table-cell">{el.tipo_evento}</td>
              <td className="table-cell">{el.qtd_participantes}</td>
              <td className="table-cell" style={{ display: 'flex' }}>
                <button onClick={() => onEditEvent(el)} style={{ backgroundColor: '#138dba'}} title='Editar Usuário'>
                  <FontAwesomeIcon icon={faPen} />
                </button>
                <button onClick={() => DeleteEvento(el.id)} style={{ backgroundColor: '#ba132c'}} title='Excluir Usuário'>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
          ))}
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

export default EventsTable;
