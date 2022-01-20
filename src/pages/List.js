import React, { Fragment, useEffect, useState } from 'react';
import ADD from '../component/ADD';
import Delete from '../component/Delete';
import Edit from '../component/Edit';
import '../component/style.css'

function List() {

    const [Listmovie,setListMovie] = useState('')
    const [loading, setLoading] = useState(true)
    
    const api = async () =>{
        try {
            const response = await fetch('http://localhost:5000/list/movies/')
            const data = await response.json()
            setListMovie(data)
            setLoading(false)

        } catch (err) {
            console.error(err.message)
        }
    }

    useEffect(()=>{
        api()
    },[])


    return (<Fragment>
    <ADD />
    <table className="table table-dark table-striped width">
        <thead>
            <tr>
                <th scope="col">Movie Name</th>
                <th scope="col">Edit</th>
                <th scope="col">DELETE</th> 
            </tr>
        </thead>

        <tbody>

            {   (loading === false)?
                Listmovie.map((item)=>{
                    return(
                    <tr key = {item.movie_id}>
                <td>
                    {item.name}
                </td>
                <td><Edit id = {item.movie_id}/></td> 
                <td><Delete id = {item.movie_id}/></td> 
            </tr>
                    

                )})
                :
                null

            }
        </tbody>
    </table>
    </Fragment>);
}

export default List;