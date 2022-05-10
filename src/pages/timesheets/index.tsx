import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Organisms/Sidebar";
import Timeline from "../../components/Organisms/Timeline";
import CustomTimeline from "../../components/Organisms/Timeline/Timeline";
import { getEmployees } from "../../services/employees/employees.service";
import {
  formatEmployeesData,
  TimesheetEmployee,
} from "../../utils/format-data";

export default function Timesheets() {
  const [employeesData, setEmployeesData] = useState<TimesheetEmployee[]>([]);

  const setEmployees = async () => {
    const response = await getEmployees();

    setEmployeesData(formatEmployeesData(response));
  };

  useEffect(() => {
    setEmployees();
  }, []);

  return (
    <div>
      <div className="tb">
        {employeesData.length > 0 && <Timeline employees={employeesData} />}
      </div>
    </div>
  );
}
