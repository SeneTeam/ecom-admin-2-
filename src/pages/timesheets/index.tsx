import React, { useEffect, useState, useMemo } from "react";
import Sidebar from "../../components/Organisms/Sidebar";
import Timeline from "../../components/Organisms/Timeline";
import CustomTimeline from "../../components/Organisms/Timeline/Timeline";
import { getEmployees } from "../../services/employees/employees.service";
import {
  formatEmployeesData,
  TimesheetEmployee,
} from "../../utils/format-data";

export default function Timesheets() {
  const [employeesData, setEmployeesData] = useState<
    TimesheetEmployee[] | null
  >(null);

  const setEmployees = async () => {
    if (!employeesData) {
      const response = await getEmployees();
      console.log("this is happenind");

      setEmployeesData(formatEmployeesData(response));
    }
  };

  useEffect(() => {
    setEmployees();
  }, []);

  return (
    <div>
      <div className="tb">
        {employeesData && employeesData.length > 0 && (
          <Timeline employees={employeesData} />
        )}
      </div>
    </div>
  );
}
