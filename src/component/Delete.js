import React from 'react';

function Delete(props) {
    const movie_id = props.id
    console.log(movie_id)

    const deleteMovie = async (id) =>{
        try {

            const response = await fetch(`http://localhost:5000/movies/${id}`,{
                method: "delete"
            })
            window.location = "/List"
            console.log("DELETE!",response)
        } catch (err) {
            console.error(err.message)
        }
    }



    return (<button onClick={()=>{
        deleteMovie(movie_id)
        
    }}>Delete</button>);
}

export default Delete;