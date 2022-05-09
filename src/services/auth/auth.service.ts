import axios from 'axios';
import { LoginInfo } from '../../types/services/auth.types';

const ENDPOINT = import.meta.env.VITE_API_URL;

export const signin = (data: LoginInfo) => {
  const url = `${ENDPOINT}/api/authenticate/login`;
  return axios.post(url, data)
    .then(res => {
        console.log(res);
      return res.data
    }).catch((err) => {
      return err
    })
};
