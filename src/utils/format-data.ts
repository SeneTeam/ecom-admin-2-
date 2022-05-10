import { Employee } from "../types/employee";

export type TimesheetEmployee = {
  id: string;
  name: string;
  role: string;
  profileUrl: string;
};

export const formatEmployeesData = (
  employees: Employee[]
): TimesheetEmployee[] => {
  return employees.map((employee) => ({
    id: employee.id,
    name: `${employee.firstName} ${employee.lastName}`,
    role: employee.employeeRole.name,
    profileUrl: employee.profileUrl,
  }));
};
