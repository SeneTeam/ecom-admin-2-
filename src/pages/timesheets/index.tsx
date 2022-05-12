import React, { useEffect, useState, useMemo, useLayoutEffect } from "react";
import Sidebar from "../../components/Organisms/Sidebar";
import Timeline from "../../components/Organisms/Timeline";
import { getEmployees } from "../../services/employees/employees.service";
import {
  formatEmployeesData,
  TimesheetEmployee,
} from "../../utils/format-data";
import "../../styles/pages/Timesheets.scss";
import Pagination from "../../components/Organisms/Timeline/Pagination";

const Timesheets = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemPerPage] = useState(10);

  const [employeesData, setEmployeesData] = useState<
    TimesheetEmployee[] | null
  >(null);

  const [filteredEmployeesData, setFilteredEmployeesData] = useState<
    TimesheetEmployee[] | null
  >(null);

  const setEmployees = async () => {
    if (!employeesData) {
      const response = await getEmployees();

      const formatedResponse = formatEmployeesData(response);
      setEmployeesData(formatedResponse);
      setFilteredEmployeesData(formatedResponse);
    }
  };

  useEffect(() => {
    if (employeesData) {
      setFilteredEmployeesData(
        employeesData?.filter((_, i) => i < itemsPerPage)
      );
    }
  }, [itemsPerPage]);

  useEffect(() => {
    setEmployees();
  }, []);

  return (
    <div className="timesheet-page d-flex w-100">
      <Sidebar />
      <div className="timesheet-page-board">
        {filteredEmployeesData && filteredEmployeesData.length > 0 && (
          <>
            <Timeline employees={filteredEmployeesData} />
            <Pagination
              totalResults={employeesData?.length!}
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              changePage={(page: number) => setItemPerPage(page)}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Timesheets;
