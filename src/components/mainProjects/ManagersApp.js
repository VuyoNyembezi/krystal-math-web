import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProjectsOverView from "./charts/ProjectOverview";

import Header from "./common/Header";
import ManagerDashboard from "./ManagerDashboard";
import OperationalProjects from "./projects/OperationalProjects";
import StrategicProjects from "./projects/StrategicProjects";

function ManagersApp() {
  const manager = localStorage.getItem("manager");
  return (
    <div>
      <Header />
      <Routes>
        {manager && (
          <>
            {/* <Route path="/" exact element={<DashBoard />} />  */}
            <Route path="/" exact element={<ManagerDashboard />} />
            <Route
              path="/operational_projects"
              element={<OperationalProjects />}
            />
            <Route path="/strategic_projects" element={<StrategicProjects />} />
            <Route path="/projects_overView" element={<ProjectsOverView />} />
          </>
        )}
        <Route path="*" element={<Navigate to={manager ? "/" : "/"} />} />
      </Routes>
    </div>
    // </div>
  );
}

export default ManagersApp;
