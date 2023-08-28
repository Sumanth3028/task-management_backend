import React from 'react';
import SignupForm from './components/Auth/SignupForm';
import LoginForm from './components/Auth/LoginForm';
import { Route, Routes } from 'react-router-dom';

import TaskList from './components/Task/TaskList';




function App() {
  return (
    <div className='w-full h-full  bg-[#ffffff]'>

   <Routes>
    <Route path='/login' element={<LoginForm/>} />
    <Route path='/' element={<SignupForm/>} />
    <Route path='/task' element={<TaskList/>} />
   </Routes>

    </div>
  );
}


export default App;
