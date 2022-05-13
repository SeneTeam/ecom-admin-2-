import React from "react";
import Timeline from "../../components/Organisms/Timeline";
import "../../styles/pages/Timesheets.scss";
import { employeeStore } from "../../store/employees.store";

const Timesheets = () => {
  const { data: employeesData } = employeeStore.getAll();

  return (
    <div className="timesheet-page d-flex w-100">
      <div className="timesheet-page-board">
        {employeesData && employeesData.data.length > 0 && (
          <>
            <Timeline employees={employeesData.data} />
          </>
        )}
      </div>
    </div>
  );
};

export default Timesheets;
