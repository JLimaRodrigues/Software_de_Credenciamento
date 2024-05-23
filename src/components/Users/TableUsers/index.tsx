import React, { useState } from 'react';
import { Pessoa, db } from "../../../backend/db";
import { deletePessoa, getPessoa } from "../../../backend/dataService";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableFooter, TablePagination, IconButton, Tooltip, TableSortLabel } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import TablePaginationActions from './PaginationActionsProps';
import { useLiveQuery } from 'dexie-react-hooks';

interface HeadCell {
  disablePadding: boolean;
  id: keyof Pessoa;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  { id: 'id', numeric: true, disablePadding: false, label: 'ID' },
  { id: 'nome', numeric: false, disablePadding: false, label: 'Nome' },
  { id: 'login', numeric: false, disablePadding: false, label: 'Login' },
  { id: 'cpf', numeric: false, disablePadding: false, label: 'CPF' },
  // Adicione mais colunas conforme necessário
];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface EnhancedTableHeadProps {
  order: Order;
  orderBy: string;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Pessoa) => void;
}

function EnhancedTableHead(props: EnhancedTableHeadProps) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property: keyof Pessoa) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span style={{ visibility: 'hidden' }}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell>Ações</TableCell>
      </TableRow>
    </TableHead>
  );
}

const TableUsers: React.FC = () => {
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof Pessoa>('id');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const pessoasQuery = useLiveQuery(() => db.pessoas.toArray());

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Pessoa,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const updatePessoa = async (id: number): Promise<void> => {
    try {
      const response = await getPessoa(id);
      console.log('Pessoa: ', response);
    } catch (error) {
      console.log('Erro: ', error);
    }
  };

  const deletePessoa = async (id: number): Promise<void> => {
    try {
      await deletePessoa(id);
    } catch (error) {
      console.log('Erro: ', error);
    }
  };

  if (!pessoasQuery) return null;

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - pessoasQuery.length) : 0;

  const visibleRows = stableSort(pessoasQuery, getComparator(order, orderBy))
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <TableContainer component={Paper}>
      <Table>
        <EnhancedTableHead
          order={order}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
        />
        <TableBody>
          {visibleRows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.nome}</TableCell>
              <TableCell>{row.login}</TableCell>
              <TableCell>{row.cpf}</TableCell>
              <TableCell>-</TableCell>
              <TableCell>-</TableCell>
              <TableCell style={{ display: 'flex' }}>
                <Tooltip title="Editar Usuário">
                  <IconButton onClick={() => updatePessoa(row.id)} style={{ color: '#138dba' }}>
                    <FontAwesomeIcon icon={faPen} />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Excluir Usuário">
                  <IconButton onClick={() => deletePessoa(row.id)} style={{ color: '#ba132c' }}>
                    <FontAwesomeIcon icon={faTrash} />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={7} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={pessoasQuery.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

export default TableUsers;
