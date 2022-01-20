const router = require("express").Router();
const pool = require("../db");

//create a movie 
router.post('/movies', async (req,res)=>{

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

router.get('/movies', async (req,res)=>{

    try{

        const allMovies = await pool.query("SELECT * FROM movie");
        res.json(allMovies.rows)


    }catch(err)
    {
        console.error(err.message)
    }

})


//get a movie

router.get('/movies/:id', async(req, res)=>{

    try {

        const {id} = req.params
        const movie = await pool.query(`SELECT * FROM movie WHERE movie_id = ${id}`)
        res.json(movie.rows[0])
        
    } catch (error) {
        console.error(error.message)
    }

})
//update a movie

router.put('/movies/:id', async (req,res)=>{
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
router.delete('/movies/:id', async (req,res)=>{
    try {

        const {id} = req.params
        const deleteMovie = await pool.query(`DELETE FROM movie WHERE movie_id = ${id}`)
        res.json(`movies is deleted!`)
        
    } catch (err) {
        console.error(err.message)
    }

})



module.exports = router;