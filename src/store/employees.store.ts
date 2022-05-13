import { useMutation, useQuery } from 'react-query';

import { employeeService } from '../services/employees/employee.service';

class EmployeeStore {
  createEmployee() {
    return useMutation(employeeService.create);
  }
  updateEmployee() {
    return useMutation(employeeService.update);
  }
  getAll() {
    return useQuery(['employees'], () => employeeService.fetchAll());
  }
  getById(id?: string) {
    return useQuery(['employeeById', id], () => employeeService.fetchById(id || ''), {
      enabled: !!id,
    });
  }
}

export const employeeStore = new EmployeeStore();
