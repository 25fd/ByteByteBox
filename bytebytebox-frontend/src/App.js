import React, { Fragment } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';
import FileUploadPage from './pages/FileUploadPage';
import RegistrationPage from './pages/RegistrationPage';
import LoginPage from './pages/LoginPage';
import LandingPage from './pages/LandingPage';
import Header from './components/header';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user } = useAuth(); // Get the authenticated user from the AuthContext

  return user ? <Outlet /> : <Navigate to="/login" />
};

function App() {
  return (
    <Router>
      <Fragment>
      <AuthProvider>
        <Routes>
        <Route exact path='/' element={<PrivateRoute/>}>
            <Route exact path='/' element={<LandingPage/>}/>
           
          </Route>
          <Route
            path="/register"
            element={[<Header />, <RegistrationPage />]}
          />
          <Route path="/login" element={<LoginPage />} />
        <Route exact path='/upload' element={[<Header />, <FileUploadPage/>]}/>

        </Routes>
      </AuthProvider>
      </Fragment>
    </Router>
  );
}

export default App;
