import React, { useEffect } from "react";
import './styles.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackwardStep, faForwardStep, faPlay } from "@fortawesome/free-solid-svg-icons";

const TableFooter: React.FC<{
  range: number[],
  setPage: (value: number) => void,
  page: number,
  rowsPerPage: number,
  setRowsPerPage: (value: number) => void,
}> = ({ range, setPage, page, rowsPerPage, setRowsPerPage }) => {

  useEffect(() => {
    if (range.length < 1 && page !== 1) {
      setPage(page - 1);
    }
  }, [range, page, setPage]);

  const handleFirstPage = () => setPage(1);
  const handleLastPage = () => setPage(range.length);
  const handlePreviousPage = () => setPage(page > 1 ? page - 1 : 1);
  const handleNextPage = () => setPage(page < range.length ? page + 1 : range.length);

  const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(parseInt(e.target.value));
  };

  return (
    <div className="table-footer">
        <div className="rows-per-page">
        <select value={rowsPerPage} onChange={handleRowsPerPageChange}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
        </select>
      </div>
      <div className="pagination-controls">
        <button onClick={handleFirstPage} disabled={page === 1} className="button-table">
            <FontAwesomeIcon icon={faBackwardStep} />
        </button>
        <button onClick={handlePreviousPage} disabled={page === 1} className="button-table">
            <FontAwesomeIcon icon={faPlay} flip="horizontal" />
        </button>
        {range.map((el, index) => (
          (el === page || el === page - 1 || el === page + 1) && (
            <button
              key={index}
              className={`button-table ${page === el ? 'table-active-button' : 'table-inactive-button'}`}
              onClick={() => setPage(el)}
            >
              {el}
            </button>
          )
        ))}
        <button onClick={handleNextPage} disabled={page === range.length} className="button-table">
        <FontAwesomeIcon icon={faPlay} />
        </button>
        <button onClick={handleLastPage} disabled={page === range.length} className="button-table">
            <FontAwesomeIcon icon={faForwardStep} />
        </button>
      </div>
    </div>
  );
}

export default TableFooter;
