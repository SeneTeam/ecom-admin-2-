import { AxiosResponse } from 'axios';

import { customAxios } from '../../plugins/axios';
import { IEmployeeRole } from '../../types/services/employees.types';

class DrivingLicenseService {
  public async getAll(): Promise<AxiosResponse<IEmployeeRole[]>> {
    return await customAxios.get('/driving-licenses');
  }

  public async getById(id: string): Promise<AxiosResponse<IEmployeeRole>> {
    return await customAxios.post(`/driving-licenses/${id}`);
  }
}

export const drivingLicenseService = new DrivingLicenseService();
