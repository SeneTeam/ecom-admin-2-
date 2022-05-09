import React from 'react';
import Select from 'react-select';

import { ValueType } from '../../types';
import { TableActionsType } from '../../types/props';
import Icon from '../Atoms/Icon';
import Pagination from '../Molecules/custom/Pagination';

const showEntriesOptions = [
  { value: '10', label: '10' },
  { value: '25', label: '25' },
  { value: '50', label: '50' },
  { value: '100', label: '100' },
];

interface TableProps<T> {
  data: T[];
  uniqueCol: keyof T;
  hide?: (keyof T)[];
  showNumbering?: boolean;
  actions?: TableActionsType<T>[];
  handleClickRow?: () => void;
  statusColumn?: string;

  //pagination
  rowsPerPage?: number;
  totalPages?: number;
  currentPage?: number;
  onChangePage: (_page: number) => void;
  onChangePageSize?: (_size: number) => void;
}

export default function Table<T>({
  data,
  //   uniqueCol,
  hide = [],
  showNumbering = true,
  actions,
  handleClickRow,

  //pagination
  rowsPerPage = 10,
  totalPages = 1,
  currentPage = 0,
  onChangePage,
  onChangePageSize,
}: //   ,
TableProps<T>) {
  function handleCountSelect(e: ValueType) {
    if (onChangePageSize) onChangePageSize(parseInt(e.value + ''));
  }

  return (
    <div className="border rounded">
      <table className="table table-responsive my-0">
        <tbody>
          <tr className="rounded bg-light">
            {showNumbering && <th>#</th>}
            {Object.keys(data[0])
              .filter((key) => !hide.includes(key as keyof T))
              .map((key) => (
                <td key={key} className="text-capitalize font-bold px-2">
                  {key}
                </td>
              ))}
            {actions && <th>Actions</th>}
          </tr>
          {/* Table body */}
          {data.map((row, index) => (
            <tr key={index} onClick={() => handleClickRow && handleClickRow()}>
              {showNumbering && <td>{index + 1}</td>}
              {Object.keys(row)
                .filter((key) => !hide.includes(key as keyof T))
                .map((key) => (
                  <td key={key} className="text-sm px-2">
                    {/* @ts-ignore */}
                    {row[key]}
                  </td>
                ))}
              {actions && (
                <td className="px-2">
                  <div className="dropdown">
                    <button className="btn w-auto px-1 outline-none">
                      <Icon name={'more'} size={24} />
                    </button>
                  </div>

                  {/* {actions.map((action) => (
                    <div key={action.name}>
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => action.handleAction(row)}>
                        {action.name}
                      </button>
                    </div>
                  ))} */}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="d-flex justify-content-between my-2">
        <div className="d-flex align-items-center py-2">
          <span className="px-3">Rodyti</span>
          <Select
            name="rowstoDisplay"
            value={showEntriesOptions.find((option) => option.value === rowsPerPage + '')}
            // @ts-ignore
            onChange={handleCountSelect}
            options={showEntriesOptions}
          />
        </div>
        <Pagination
          totalElements={data.length}
          paginate={onChangePage}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
}
