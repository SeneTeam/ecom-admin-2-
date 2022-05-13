import { AxiosResponse } from 'axios';

import { customAxios } from '../../plugins/axios';
import { ICreateEmployeeRole, IEmployeeRole } from '../../types/services/employees.types';

class EmployeeRolesService {
  public async createRole(
    data: ICreateEmployeeRole,
  ): Promise<AxiosResponse<IEmployeeRole>> {
    return await customAxios.post('/employee-roles', data);
  }

  public async getAll(): Promise<AxiosResponse<IEmployeeRole[]>> {
    return await customAxios.get('/employee-roles');
  }

  public async getById(id: string): Promise<AxiosResponse<IEmployeeRole>> {
    return await customAxios.post(`/employee-roles/${id}`);
  }
}

export const employeeRolesService = new EmployeeRolesService();
