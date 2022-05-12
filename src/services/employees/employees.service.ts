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

export const getEmployeeSummary = async ({
  id,
  year,
  month,
}: {
  id: string;
  year: number;
  month: number;
}) => {
  const url = `${ENDPOINT}/api/employees/${id}/year=${year}/month=${month}`;
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
