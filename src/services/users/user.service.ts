import { AxiosResponse } from 'axios';

import { customAxios } from '../../plugins/axios';
import { IUser } from '../../types/services/user.types';

class UserService {
  public async fetchCurrentUser(): Promise<AxiosResponse<IUser>> {
    return await customAxios.get('/users/current-user');
  }
}

export const userService = new UserService();
