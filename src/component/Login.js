import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import "./style.css";

function Login(props) {

const {setIsLogin} = props

const [username,setUsername] = useState(()=>{return ''})
const [password,setPassword] = useState(()=>{return ''})

const onChangeUsername = (e)=>{
    setUsername(()=>e.target.value)

}
const onChangePassword = (e)=>{

    setPassword(()=>e.target.value)
}

const LoginAPI = async(e)=>{

    const body = {username,password}
    e.preventDefault()
    try {

        const response = await fetch('http://localhost:5000/auth/Login',{
            method:"POST",
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(body),
        })   

        const data = await response.json()
        localStorage.setItem('token',data.token)
        setIsLogin(true)
    } catch (err) {
        console.error(err.message)
    }

}


  return (
    <Fragment>
      <form className="p-fix width" onSubmit={LoginAPI}>
        <h1 className="Title">Login</h1>
        <span>Username:</span>
        <input className="form-control mt-2" type="text" onChange={onChangeUsername}></input>
        <span>Password:</span>
        <input className="form-control mt-2" type="password" onChange={onChangePassword}></input>

        <button className="btn btn-primary mt-2 " type="submit">Login</button>
        <Link to="/Register">
          <button className="btn btn-primary mt-2 btnRegister">Register</button>
        </Link>
      </form>
    </Fragment>
  );
}

export default Login;
