import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';

import Header from './common/Header';
import DashBoard from './Dashboard';
import OperationTools from './OperationTools';
import UserTools from './UserTools';
import MainProjectTools from './MainProjectTools';
import SystemUsers from './SystemUsers';

function AdminApp(){
const Admin =localStorage.getItem("admin_state")
    return (
        <div >
       <Header />
        <Routes>
            { Admin &&
            <>
                <Route path="/" exact element={<DashBoard />} /> 
                <Route path="/operational_tools" element={<OperationTools/>} />
                <Route path="/user_tools" element={<UserTools/>} />
                <Route path="/main_project_tools" element={<MainProjectTools />} />
                <Route path="/users" element={<SystemUsers />} />
            </>    
         } 
         <Route path="*" element={<Navigate to={Admin ? "/" : "/"}/>} />     
        </Routes>
        </div>
    );
}

export default AdminApp;