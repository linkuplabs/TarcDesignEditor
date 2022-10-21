import React, {  useContext} from 'react';
import { BrowserRouter , Route, Routes } from 'react-router-dom'

import AppSidebar from "./components/appsidebar/AppSidebar";

import './App.css';

function App() {
  return (
    <BrowserRouter>
          <Routes>
          <Route path="/" element={<AppSidebar />} />
          </Routes>
    </BrowserRouter>
  );
}

export default App;
