import './App.css';
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Layout from './views/Layout';
import Social from './components/Social';
import Profile from './components/Profile';
import Home from './components/Home';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginForm/>}></Route>
        <Route path='/home' element={<Layout/>}>
          <Route index element={<ProtectedRoute><Home/></ProtectedRoute>}></Route>
          <Route path='profile' element={<Profile/>}></Route>
          <Route path='social' element={<Social/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;