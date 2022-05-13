import { useQuery } from 'react-query';

import { userService } from '../services/users/user.service';

class UserStore {
  getCurrentUser() {
    return useQuery(['getCurrentUser'], () => userService.fetchCurrentUser());
  }
}

export const userStore = new UserStore();
