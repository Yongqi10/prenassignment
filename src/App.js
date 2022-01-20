import React, { useEffect } from "react";
import Home from "./pages/Home";
import Nav from "./component/Nav";
import List from "./pages/List";
import Login from "./component/Login";
import Register from "./component/Register";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { useState } from "react/cjs/react.development";

function App() {
  const [isLogin, setIsLogin] = useState(false);


  const alreadyLogin = async()=>{

    try {

      const response = await fetch('http://localhost:5000/auth/is-verify',{
      method:"GET",
      headers:{token: localStorage.token}
      })

      const data = await response.json()
      
      data === true? setIsLogin(true):setIsLogin(false)

    } catch (err) {
      console.error(err.message)
    }

  }

  useEffect(()=>{

    alreadyLogin()

  },[])


  return (
    <BrowserRouter>
      {isLogin === true ? <Nav /> : null}
      <Routes>
        <Route
          path="/"
          element={<Login setIsLogin={setIsLogin} />}
        />

        <Route
          path="/Login"
          element={
            !isLogin ? (
              <Login setIsLogin={setIsLogin}/>
            ) : (
              <Navigate to="/Home" />
            )
          }
        />

        <Route
          path="/Register"
          element={
            !isLogin ? (
              <Register setIsLogin={setIsLogin}/>
            ) : (
              <Navigate to="/Home" />
            )
          }
        />
        <Route
          path="/Home"
          element={
            isLogin ? (
              <Home isLogin={isLogin} setIsLogin={setIsLogin} />
            ) : (
              <Navigate to="/Login" />
            )
          }
        />
        <Route
          path="/List"
          element={isLogin ? <List /> : <Navigate to="/Login" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
