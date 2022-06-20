import React from 'react';
import {Routes, Route,Navigate} from 'react-router-dom';

import DashBoardSDM from './Dashboard';
import Header from './common/Header';
import OperationalProjects from './projects/OperationalProjects';
import StrategicProjects from './projects/StrategicProjects';
import TeamsOverview from './TeamsOverview';
import LiveIssues from './projects/LiveIssues';

function SDMApp(){
    const SDM = localStorage.getItem("sdm")

    return (
        <div >
      <Header/>
        <Routes>
            {
                SDM &&(
                    <>
                     <Route path="/" exact element={<DashBoardSDM />} />
                     <Route path="/operational" element={<OperationalProjects />} />
                     <Route path="/strategic" element={<StrategicProjects />} />
                    <Route path="/teams_overview" element={<TeamsOverview/> } />
                    <Route path="/live_issues" element={<LiveIssues/>}/>
                    </>
                )
            }
             <Route path="*" element={<Navigate to={SDM ? "/" : "/"}/>} />
        </Routes>
        </div>
    );
}

export default SDMApp;