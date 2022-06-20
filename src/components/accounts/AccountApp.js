import React from 'react';
import Login from './Login';
import Register from './Register';
import {Route, Routes} from 'react-router-dom';

import ResetPassword from './ResetPassword';
import ForgotPassword from './ForgotPassword';
import { Container } from 'react-bootstrap';




function AccountApp() {

  return (
    <Container fluid  >  
    <Routes>
    
    <Route path="/" exact element={<Login />} />
      <Route path="/accounts/register" element={<Register />} />
      <Route path="/accounts/forgot_password" element={<ForgotPassword />} />
      <Route path="/accounts/reset_key" element={<ResetPassword />} />
    </Routes>
    </Container>
  );
}

export default AccountApp;
