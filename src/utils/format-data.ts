import { Employee } from "../types/employee";

export const formatEmployeesData = (employees: Employee[]) => {
  return employees.map((employee) => ({
    name: `${employee.firstName} ${employee.lastName}`,
    role: employee.employeeRole.name,
  }));
};
