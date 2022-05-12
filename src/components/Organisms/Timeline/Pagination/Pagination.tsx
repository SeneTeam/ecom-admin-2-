import React, { useState } from "react";

type PaginationProps = {
  totalResults: number;
  currentPage: number;
  itemsPerPage: number;
  changePage: (page: number) => void;
};

const Pagination = ({
  totalResults,
  currentPage,
  changePage,
  itemsPerPage,
}: PaginationProps) => {
  const [totalPages, setTotalPages] = useState(0);

  return (
    <div className="d-flex align-items-end mt-5 timeline-pagination justify-content-between">
      <div className="d-flex align-items-center">
        <span className="bold">Rodyti</span>
        <select
          value={itemsPerPage}
          className="ms-3 p-2"
          onChange={(e) => changePage(Number(e.target.value))}
        >
          <option value={1}>1</option>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
        </select>
      </div>
      <div className="me-5">
        <span>
          Puslapis <strong>{currentPage}</strong> iš{" "}
          <strong>{Math.ceil(totalResults / itemsPerPage)}</strong> / Viso{" "}
          <strong>{totalResults}</strong> rezultatų
        </span>
      </div>
    </div>
  );
};

export default Pagination;
