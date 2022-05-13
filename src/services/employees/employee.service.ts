import { AxiosResponse } from "axios";

import { customAxios } from "../../plugins/axios";
import { ICreateEmployee, IUpdateEmployee } from "../../types/props";
import {
  EmployeeDto,
  EmployeeSummaryDto,
} from "../../types/services/employees.types";

class EmployeeService {
  public async create(
    employee: ICreateEmployee
  ): Promise<AxiosResponse<EmployeeDto>> {
    return await customAxios.post(`/employees`, employee);
  }

  public async update(
    employee: IUpdateEmployee
  ): Promise<AxiosResponse<EmployeeDto>> {
    return await customAxios.put(`/employees/${employee.id}`, employee);
  }

  public async fetchAll(): Promise<AxiosResponse<EmployeeDto[]>> {
    return await customAxios.get("/employees");
  }

  public async fetchById(id: string): Promise<AxiosResponse<EmployeeDto>> {
    console.log("fethcig");
    return await customAxios.get(`/employees/${id}`);
  }

  public async fetchEmployeeSummary(
    id: string,
    year: number,
    month: number
  ): Promise<AxiosResponse<EmployeeSummaryDto>> {
    console.log("fethcig");
    return await customAxios.get(
      `/employees/${id}/summary/year=${year}/month=${month}`
    );
  }
}

export const employeeService = new EmployeeService();
