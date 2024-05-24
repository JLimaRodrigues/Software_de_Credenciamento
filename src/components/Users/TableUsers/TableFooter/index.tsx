import React, { useEffect } from "react";
import './styles.css';

const TableFooter: React.FC<{
  range: number[],
  setPage: (value: number) => void,
  page: number,
}> = ({ range, setPage, page }) => {

  useEffect(() => {
    if (range.length < 1 && page !== 1) {
      setPage(page - 1);
    }
  }, [range, page, setPage]);

  const handleFirstPage = () => setPage(1);
  const handleLastPage = () => setPage(range.length);
  const handlePreviousPage = () => setPage(page > 1 ? page - 1 : 1);
  const handleNextPage = () => setPage(page < range.length ? page + 1 : range.length);

  return (
    <div className="table-footer">
      <button onClick={handleFirstPage} disabled={page === 1} className="button-table">
        {"<<"}
      </button>
      <button onClick={handlePreviousPage} disabled={page === 1} className="button-table">
        {"<"}
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
        {">"}
      </button>
      <button onClick={handleLastPage} disabled={page === range.length} className="button-table">
        {">>"}
      </button>
    </div>
  );
}

export default TableFooter;
