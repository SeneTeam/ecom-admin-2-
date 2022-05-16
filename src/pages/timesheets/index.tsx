import React, { useEffect, useState } from "react";
import Timeline from "../../components/Organisms/Timeline";
import Pagination from "../../components/Molecules/custom/Pagination";
import "../../styles/pages/Timesheets.scss";
import { employeeStore } from "../../store/employees.store";
import { EmployeeDto } from "../../types/services/employees.types";

const showEntriesOptions = [
  { value: "5", label: "5" },
  { value: "10", label: "10" },
  { value: "25", label: "25" },
  { value: "50", label: "50" },
  { value: "100", label: "100" },
];

const Timesheets = () => {
  const { data: employeesData } = employeeStore.getAll();
  const [filteredEmployees, setFilteredEmployees] = useState<EmployeeDto[]>([]);
  const [_currentPage, setcurrentPage] = useState(0);
  const [_rowsPerPage, setrowsPerPage] = useState("5");

  function handlePageChange(e: number) {
    setcurrentPage(e);
  }

  function handlePageSize(e: number) {
    setrowsPerPage(e.toString());
  }

  useEffect(() => {
    if (employeesData?.data) {
      paginate(employeesData?.data, Number(_rowsPerPage), _currentPage);
    }
  }, [_currentPage, _rowsPerPage]);

  useEffect(() => {
    if (employeesData?.data) {
      setFilteredEmployees(employeesData.data);
    }
  }, [employeesData?.data]);

  function paginate(
    array: EmployeeDto[],
    page_size: number,
    page_number: number
  ) {
    const data = array.slice(
      page_number * page_size,
      (page_number + 1) * page_size
    );
    setFilteredEmployees(data);
  }

  return (
    <div className="timesheet-page d-flex">
      <div className="timesheet-page-board">
        {filteredEmployees && filteredEmployees.length > 0 && (
          <>
            <Timeline
              employees={filteredEmployees}
              data={employeesData?.data || []}
              onChangePage={handlePageChange}
              onChangePageSize={handlePageSize}
              currentPage={_currentPage}
              rowsPerPage={Number(_rowsPerPage)}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Timesheets;
