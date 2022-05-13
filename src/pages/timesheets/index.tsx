import React, { useEffect, useState, useMemo, useLayoutEffect } from "react";
import Timeline from "../../components/Organisms/Timeline";
import { getEmployees } from "../../services/employees/employees.service";
import {
  formatEmployeesData,
  TimesheetEmployee,
} from "../../utils/format-data";
import "../../styles/pages/Timesheets.scss";

const Timesheets = () => {
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
      <div className="timesheet-page-board">
        {filteredEmployeesData && filteredEmployeesData.length > 0 && (
          <>
            <Timeline employees={filteredEmployeesData} />
          </>
        )}
      </div>
    </div>
  );
};

export default Timesheets;
