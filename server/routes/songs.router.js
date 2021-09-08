const express = require('express');
const router = express.Router();

let songs = [
    {
        rank: 355, 
        artist: 'Ke$ha', 
        track: 'Tik-Toc', 
        published: '1/1/2009'
    },
    {
        rank: 356, 
        artist: 'Gene Autry', 
        track: 'Rudolph, the Red-Nosed Reindeer', 
        published: '1/1/1949'
    },
    {
        rank: 357, 
        artist: 'Oasis', 
        track: 'Wonderwall', 
        published: '1/1/1996'
    }
];

// Bring in pg
const pg = require('pg');
const pool = new pg.Pool({
    // Configure pg
    database: 'proth', // Name of the database you want to connect to
    host:  'localhost', // where is your database running?
    port: '5432', // Postico default
    max: 10, // how many queries at one time
    idleTimeoutMillis: 30000 // 30 seconds before timeout, after it will stop 
                            // trying to connect to pg and throw an error
});

pool.on('connect', () => {
    console.log('pg connected to post postgresql!');
});

pool.on('error', (error) => {
    console.log('unable to connect to postgresql', error);
});

router.get('/', (req, res) => {
    const queryText = 'SELECT * FROM "songs" ORDER BY "artist" LIMIT 100;';
    pool.query(queryText).then((result) => { // Pass to our database, **NOT req.body**
        // result.rows is the data from our database as an Array
        res.send(result.rows);
    }).catch(error => {
        // Send back 500 on failure
    console.log('There was an error making a query', error);
    res.sendStatus(500);
    }); 
});

router.post('/', (req, res) => {
    songs.push(req.body);
    res.sendStatus(200); // Indicates success and nothing else number assumes 
                        // status code same as res.send(200);
});

module.exports = router;