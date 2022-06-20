import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import DashBoardInfo from "./DashboardInfo";
import Header from "./common/Header";
import ManageMembers from "./ManageUser";
import ManageTeam from "./TeamManage";
import OperationalProjects from "./projects/OperationalProjects";
import StrategicProjects from "./projects/StrategicProjects";
import TeamOverview from "./TeamOverview";

function OperationTLApp() {
  const TeamLeader = localStorage.getItem("team_leader");

  return (
    <div>
      <Header />
      <Routes>
        {TeamLeader && (
          <>
            <Route path="/" exact element={<DashBoardInfo />} />

            <Route path="/members_manager" element={<ManageMembers />} />
            <Route path="/task_manager" element={<ManageTeam />} />
            <Route path="/operational" element={<OperationalProjects />} />
            <Route path="/strategic" element={<StrategicProjects />} />
            <Route path="/overview" element={<TeamOverview />} />
          </>
        )}
        <Route path="*" element={<Navigate to={TeamLeader ? "/" : "/"} />} />
      </Routes>
    </div>
  );
}

export default OperationTLApp;
