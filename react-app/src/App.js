import React from 'react';
import { Login, GeneralForm, FormViewer } from './components';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from './components/navigation/PrivateRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/form" element={<GeneralForm />} />
        <Route element={<PrivateRoute />}>
          <Route path="/view-forms" element={<FormViewer />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
