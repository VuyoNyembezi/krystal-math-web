import React from 'react';

import {Routes, Route, Navigate} from 'react-router-dom';




import Header from './common/Header';
import DevOverview from './DevOverview';
import ProjectManager from './ProjectManager';
import DevTaskManager from './TaskManager'
import DashBoardDev from './Dashboard';


function DevApp(){
    const Dev = localStorage.getItem("dev")


    return (
        <div >
      <Header/>
        <Routes>
            {
                Dev &&(
                    <>
                     <Route path="/" exact element={<DashBoardDev />} />
                     <Route path="/tasks" element={<DevTaskManager />} />
                     <Route path="/projects" element={<ProjectManager />} />
                    <Route path="/my_overview" element={<DevOverview/> } />
                    </>
                )
            }
             <Route path="*" element={<Navigate to={Dev ? "/" : "/"}/>} />
        </Routes>
        </div>
    );
}

export default DevApp;