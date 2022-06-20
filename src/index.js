import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/App.css';
import 'react-calendar/dist/Calendar.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import AccountApp from './components/accounts/AccountApp';
import AdminApp from './components/administration/AdminApp';
import ManagersApp from './components/mainProjects/ManagersApp';

import SDMApp from './components/operations/sdm/OperationSDMApp';
import OperationTLApp from './components/operations/teamLeader/OperationsTLApp';
import DevApp from './components/operations/developer/OperationsDevApp';
ReactDOM.render(
  
   <Router>
    <Routes>
    <Route path="*" element={<AccountApp />} /> 
    <Route path="/admin/*" element={<AdminApp/>} />
    <Route path="/main_projects/*" element={<ManagersApp />} />
    <Route path="/team_leader/operations/*" element={<OperationTLApp/>}/>
    <Route path="/sdm/operations/*" element={<SDMApp/>}/>
    <Route path="/dev/*" element={<DevApp/>} />
    </Routes>
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

