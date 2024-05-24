import React, { useEffect } from "react";
import './styles.css';

const TableFooter: React.FC<{range: any[], setPage: (value: number) => void, page: number, slice: any[]}> = ({ range, setPage, page, slice}) => {

    useEffect(() => {
        if (slice.length < 1 && page !== 1) {
          setPage(page - 1);
        }
      }, [slice, page, setPage]);
      return (
        <div className="table-footer">
        {range.map((el, index) => (
            <button
            key={index}
            className={` button-table " ${
                page === el ? 'table-active-button' : 'table-inactive-button'
            }`}
            onClick={() => setPage(el)}
            >
            {el}
            </button>
        ))}
        </div>
      );
}

export default TableFooter;