const express = require("express");
const app = express();
const cors = require('cors')
const pool = require('./db');
const res = require("express/lib/response");




//middleware
app.use(cors())
app.use(express.json()) //req.body


//ROUTES

//create a movie 


app.post('/movies', async (req,res)=>{

    try {
       const {name} = req.body
       console.log(req.body)
       const movie = await pool.query("INSERT INTO movie (name) VALUES($1) RETURNING *",[name]) //RETURNING * mean return the data
        res.json(movie.rows[0])
    }

    catch(err)
    {
        console.error(err.message)
    }

})
//get all movies

app.get('/movies', async (req,res)=>{

    try{

        const allMovies = await pool.query("SELECT * FROM movie");
        res.json(allMovies.rows)


    }catch(err)
    {
        console.error(err.message)
    }

})


//get a movie

app.get('/movies/:id', async(req, res)=>{

    try {

        const {id} = req.params
        const movie = await pool.query(`SELECT * FROM movie WHERE movie_id = ${id}`)
        res.json(movie.rows[0])
        
    } catch (error) {
        console.error(error.message)
    }

})
//update a movie

app.put('/movies/:id', async (req,res)=>{
    try {

        const{id} = req.params
        const {name} = req.body
        const update = await pool.query('UPDATE movie SET name = $1 WHERE movie_id = $2',[name, id])
        console.log(id,name)
        res.json(`movie name was updated! to ${name}`)
        
    } catch (error) {
        console.error(error.message)
    }

})

//delete a movie
app.delete('/movies/:id', async (req,res)=>{
    try {

        const {id} = req.params
        const deleteMovie = await pool.query(`DELETE FROM movie WHERE movie_id = ${id}`)
        res.json(`movies is deleted!`)
        
    } catch (err) {
        console.error(err.message)
    }

})

app.listen(5000,()=>{

    console.log("server has started")
})