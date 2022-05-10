import axios from "axios";
import { validToken } from "../../utils/valid-token";

const ENDPOINT = import.meta.env.VITE_API_URL;

export const getEmployees = () => {
  const url = `${ENDPOINT}/api/employees`;
  return axios
    .get(url, {
      headers: {
        Authorization: "Bearer " + validToken(),
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};
