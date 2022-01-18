const Pool = require('pg').Pool

const pool = new Pool({

    user: "postgres",
    password: "s865984106",
    host: 'localhost',
    port: 5432,
    database: 'Movies'
});

module.exports = pool;