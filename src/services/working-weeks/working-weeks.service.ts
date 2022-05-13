import { AxiosResponse } from 'axios';

import { customAxios } from '../../plugins/axios';
import { IEmploymentTypeInfo } from '../../types/services/employees.types';

class WorkingWeeks {
  public async getAll(): Promise<AxiosResponse<IEmploymentTypeInfo[]>> {
    return await customAxios.get('/working-weeks');
  }

  public async getById(id: string): Promise<AxiosResponse<IEmploymentTypeInfo>> {
    return await customAxios.post(`/working-weeks/${id}`);
  }
}

export const workingWeeksService = new WorkingWeeks();
