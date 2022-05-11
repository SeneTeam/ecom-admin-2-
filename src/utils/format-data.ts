import { Employee, WorkAction } from "../types/employee";

export type TimesheetEmployee = {
  id: string;
  name: string;
  role: string;
  profileUrl: string;
  workActions: WorkAction[];
};

export const formatEmployeesData = (
  employees: Employee[]
): TimesheetEmployee[] => {
  return employees.map((employee) => ({
    id: employee.id,
    name: `${employee.firstName} ${employee.lastName}`,
    role: employee.employeeRole.name,
    profileUrl: employee.profileUrl,
    workActions: employee.workActions,
  }));
};
