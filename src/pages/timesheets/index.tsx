import React, { useState } from "react";
import Timeline from "../../components/Organisms/Timeline";
import Pagination from "../../components/Molecules/custom/Pagination";
import "../../styles/pages/Timesheets.scss";
import { employeeStore } from "../../store/employees.store";

const showEntriesOptions = [
  { value: "5", label: "5" },
  { value: "10", label: "10" },
  { value: "25", label: "25" },
  { value: "50", label: "50" },
  { value: "100", label: "100" },
];

const Timesheets = () => {
  const { data: employeesData } = employeeStore.getAll();
  const [_currentPage, setcurrentPage] = useState(0);
  const [_rowsPerPage, setrowsPerPage] = useState("5");

  function handlePageChange(e: number) {
    // setcurrentPage(e);
    return {};
  }

  return (
    <div className="timesheet-page d-flex">
      <div className="timesheet-page-board">
        {employeesData && employeesData.data.length > 0 && (
          <>
            <Timeline
              employees={employeesData.data}
              onChangePage={handlePageChange}
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
