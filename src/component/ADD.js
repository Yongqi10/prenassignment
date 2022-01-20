import React from 'react';
import { useState } from 'react/cjs/react.development';
import './style.css'
function ADD() {

    const [name,setName] = useState("")

    const ADD = async ()=>{
        

        try {
            const body = {name}
            const response = await fetch("http://localhost:5000/list/movies/",{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            })
            console.log(response)
            window.location = "/List"
            
        } catch (err) {
            console.error(err.message)
        }



    }

    return (  

        <div className='width'>
            <input type = "text" className='form-control' onChange={(e)=>{
                setName(e.target.value)
            }}/>
            <button className='form-control btn btn-primary mb-2' onClick={ADD}>ADD</button>
        </div>

    );
}

export default ADD;