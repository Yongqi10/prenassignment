import React from 'react';
import Home from './pages/Home';
import Nav from './component/Nav';
import List from './pages/List';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
    <Nav/>
    <Routes>
      <Route path = '/' element = {<Home/>}/>
      <Route path = '/Home' element = {<Home/>}/>
      <Route path = '/List' element  = {<List/>}/>
    </Routes>
    
    </BrowserRouter>
  )
}

export default App;
