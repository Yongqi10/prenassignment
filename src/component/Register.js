import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import "./style.css";

function Register(props) {

    const {setIsLogin} = props


    const [username,setUsername] = useState(()=>{return ''})
    const [password,setPassword] = useState(()=>{return ''})
    const [name,setName] = useState(()=>{return ''})



    const onChangeUsername = (e)=>{
        setUsername(()=>e.target.value)

    }
    const onChangePassword = (e)=>{

        setPassword(()=>e.target.value)
    }

    const onChangeName = (e)=>{
        setName(()=>e.target.value)
    }



    const RegisterAPI = async (e)=>{


        e.preventDefault()
        const body = {username,password,name}
            try {
                
                const response = await fetch('http://localhost:5000/auth/Register',{
                method:"POST",
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(body),
                })

                const data = await response.json()
                //return a token and set that into the local storage
                localStorage.setItem('token',data.token)
                setIsLogin(true)

            } catch (err) {
                console.error(err.message)
            }

    }



  return (
    <Fragment>
      <form className="p-fix width" onSubmit={RegisterAPI}>
        <h1 className="Title">Register</h1>
        <span>Username:</span>
        <input className="form-control mt-2" type="text" value={username} onChange={onChangeUsername}></input>
        <span>Password:</span>
        <input className="form-control mt-2" type="password" value={password} onChange={onChangePassword}></input>
        <span>Name:</span>
        <input className="form-control mt-2" type="text" value={name} onChange={onChangeName}></input>


        <button type="submit" className="btn btn-primary mt-2 ">Register</button>

        <Link to="/Login">
          <button className="btn btn-primary mt-2 btnLogin">Login</button>
        </Link>
      </form>
    </Fragment>
  );
}

export default Register;
