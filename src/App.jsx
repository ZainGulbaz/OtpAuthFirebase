import React from 'react';
import Login from './components/login/Login';
import Home from './components/home/home';
import { Routes,Route } from 'react-router-dom';
import NavBar from './components/navbar/NavBar';
const App = () => {
 
    return (
      
        <div style={{ "marginTop": "2px" }}>
          <NavBar/>
          <Routes>
            <Route exact path="/" element={<Login/>}/>
            <Route exact path="/home" element={<Home/>}/>
          </Routes>
        </div>
    );
}
  
export default App;