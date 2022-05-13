import React from "react";
import { useParams } from "react-router-dom";

import Breadcrump from "../../components/Molecules/Breadcrump";
import { Tab, Tabs } from "../../components/Molecules/custom/Tabs";
import EmployeeInfo from "../../components/Organisms/employees/EmployeeInfo";
import { employeeStore } from "../../store/employees.store";

export default function EmployeeDetails() {
  const { id } = useParams();
  console.log("", id);
  const { data: employee } = employeeStore.getById(id as string);
  console.log("", employee?.data);
  return (
    <div className="px-3">
      <Breadcrump
        title="Jonas Jonaitis"
        navigation={["Žmonių valdymas", "Darbuotojai", "Jonas Jonaitis"]}
      />
      <Tabs className="mt-5">
        <Tab label="DARBUOTOJO DUOMENYS">
          <EmployeeInfo employee={employee?.data!} />
        </Tab>
        <Tab label="DARBO PRIEMONĖS">
          <h2 className="text-3xl text-green-400">DARBO PRIEMONĖS</h2>
        </Tab>
        <Tab label="ISTORIJA">
          <h2 className="text-3xl text-yellow-300 font-bold">ISTORIJA</h2>
        </Tab>
        <Tab label="DOKUMENTAI">
          <h2 className="text-3xl text-green-400">DOKUMENTAI</h2>
        </Tab>
        <Tab label="FORMŲ GENERAVIMAS">
          <h2 className="text-3xl text-yellow-300 font-bold">
            FORMŲ GENERAVIMAS
          </h2>
        </Tab>
      </Tabs>
    </div>
  );
}
