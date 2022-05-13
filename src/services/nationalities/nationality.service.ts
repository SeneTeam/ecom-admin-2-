import { AxiosResponse } from 'axios';
import { customAxios } from '../../plugins/axios';
import {INationality } from '../../types/services/nationalities.types';

class NationalityService {
  public async fetchAll(): Promise<AxiosResponse<INationality[]>> {
    return await customAxios.get('/nationalities');
  }

  public async fetchById(id: string): Promise<AxiosResponse<INationality>> {
      return await customAxios.get(`/nationalities/${id}`);
  }

}

export const nationalityService = new NationalityService();
