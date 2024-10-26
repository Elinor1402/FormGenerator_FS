import React from 'react';
import { Login, GeneralForm, FormViewer,NotFound } from './components';
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
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
