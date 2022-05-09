import React from 'react';

import Indicator from '../../Atoms/custom/Indicator';
import Icon from '../../Atoms/Icon';

type PaginationProps = {
  totalElements: number;
  paginate: (_pnber: number) => void;
  currentPage: number;
  rowsPerPage?: number;
  totalPages?: number;
};
const Pagination = ({ totalPages = 1, paginate, currentPage = 0 }: PaginationProps) => {
  const pageNumbers = [1];

  for (let i = 1; i < totalPages; i++) {
    pageNumbers.push(i + 1);
  }

  return totalPages > 1 ? (
    <div className="py-2">
      <div className="px-0 d-flex justify-content-end align-items-center shadow-sm bg-white rounded py-1">
        <div className="mr-2">
          <button
            className="btn btn-sm"
            disabled={currentPage === 0}
            onClick={() => {
              paginate(currentPage - 1);
            }}>
            <Icon name="arrow-left" size={16} />
          </button>
        </div>
        {pageNumbers.map((number) => (
          <div className="pr-1" key={number}>
            <Indicator
              isCircular={false}
              isActive={currentPage + 1 === number}
              handleClick={() => paginate(number - 1)}>
              {number}
            </Indicator>
          </div>
        ))}
        <div className="mr-2">
          <button
            disabled={currentPage === totalPages - 1}
            className="btn btn-sm"
            onClick={() => {
              paginate(currentPage + 1);
            }}>
            <Icon name="arrow-right2" size={16} />
          </button>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};
export default Pagination;
