import axios from "axios";
import { validToken } from "../../utils/valid-token";

const ENDPOINT = import.meta.env.VITE_API_URL;

export const getEmployees = async () => {
  const url = `${ENDPOINT}/api/employees`;
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: "Bearer " + validToken(),
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
