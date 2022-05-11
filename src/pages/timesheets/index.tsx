import React, { useEffect, useState, useMemo, useLayoutEffect } from "react";
import Sidebar from "../../components/Organisms/Sidebar";
import Timeline from "../../components/Organisms/Timeline";
import { getEmployees } from "../../services/employees/employees.service";
import {
  formatEmployeesData,
  TimesheetEmployee,
} from "../../utils/format-data";
import "../../styles/pages/Timesheets.scss";

const Timesheets = () => {
  const [employeesData, setEmployeesData] = useState<
    TimesheetEmployee[] | null
  >(null);

  const setEmployees = async () => {
    if (!employeesData) {
      const response = await getEmployees();
      console.log("this is happenind");

      const formatedResponse = formatEmployeesData(response);
      setEmployeesData(formatedResponse);
    }
  };

  useEffect(() => {
    setEmployees();
  }, []);

  return (
    <div className="timesheet-page d-flex w-100">
      <Sidebar />
      <div className="timesheet-page-board">
        {employeesData && employeesData.length > 0 && (
          <Timeline employees={employeesData} />
        )}
      </div>
    </div>
  );
};

export default Timesheets;
