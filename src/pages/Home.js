import React, { useEffect } from 'react';
import { useState } from 'react/cjs/react.development';
import '../component/style.css'

function Home(props) {

    const setIsLogin = props.setIsLogin
    const [Name,setName] = useState(()=>{return ""})

    const nameAPI = async ()=>{

        try {
            const response = await fetch('http://localhost:5000/Home',{
            method:"GET",
            headers: {token: localStorage.token}
            })
            const data = await response.json()
            setName(()=>data.name)
        } catch (err) {
            console.error(err.message)
        }

    }

    useEffect(()=>{
        nameAPI()
    },[Name])



    const Logout = ()=>{
        localStorage.removeItem('token')
        setIsLogin(false)
        
    }


    return (<div className='logout'>
    <h1 className='width'>HELLO!!&nbsp;{Name}</h1>
    <button className="btn btn-primary mt-2 btnLogout" onClick={Logout}>Logout</button>
    </div>);
}

export default Home;