const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");

router.get('/',authorization, async(req,res)=>{

    try {

        //after pass in the authorization req have req.user
        const currentUser = await pool.query("SELECT name FROM users WHERE id = $1",[req.user])
        res.json(currentUser.rows[0])

    } catch (err) {
        res.status(500).json(err.message)
    }

})



module.exports = router