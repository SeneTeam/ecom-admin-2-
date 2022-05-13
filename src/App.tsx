import "./App.css";

import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import UserContext from "./contexts/UserContext";
import MainLayout from "./layouts/MainLayout";
import ShowCase from "./pages/__test/Showcase";
import PageNotFound from "./pages/404";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Signin from "./pages/auth/Signin";
import Employees from "./pages/employees";
import Timesheets from "./pages/timesheets";
import EmployeeDetails from "./pages/employees/EmployeeDetails";
import { IUser } from "./types/services/user.types";

const App = () => {
  const [user, setUser] = useState<IUser>();
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Signin />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* dashboard */}
          <Route path="dashboard" element={<MainLayout />}>
            <Route path="employees">
              <Route index element={<Employees />}></Route>
              <Route path=":id" element={<EmployeeDetails />} />
              <Route path="timesheet" element={<Timesheets />} />
            </Route>
          </Route>
          <Route path="/usage" element={<ShowCase />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
};
export default App;
