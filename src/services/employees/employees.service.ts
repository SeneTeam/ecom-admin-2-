import axios from "axios";

const ENDPOINT = import.meta.env.VITE_API_URL;

export const getEmployees = () => {
  const url = `${ENDPOINT}/api/employees`;
  return axios
    .get(url)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};
