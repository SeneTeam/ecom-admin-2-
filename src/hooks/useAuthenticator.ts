import { useContext, useEffect, useState } from 'react';

import UserContext from '../contexts/UserContext';
import { userService } from '../services/users/user.service';

export default function useAuthenticator() {
  const { user, setUser } = useContext(UserContext);
  console.log('usercontext', user);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log(user);
    const fetchUser = async () => {
      setIsLoading(true);
      try {
        const user = await userService.fetchCurrentUser();
        setUser(user.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (!user) {
      console.log(true);
      fetchUser();
    }
  }, [setUser, user]);

  return { user, isLoading };
}
