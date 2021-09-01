const express = require('express');
const Datastore = require('nedb');
const mysql = require('mysql');
require('dotenv').config();

//puppeteer do wyjebania

const app = express();
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening at ${port}`));
app.use(express.static('website/public'));

var pool = mysql.createPool({
    host: 'remotemysql.com',
    port: '3306', 
    user: 'v2AqjSz2oR', 
    password: 'MuvdDi9iwR',
    database: 'v2AqjSz2oR',
    connectionLimit: '100',
    multipleStatements: true
});

const database = new Datastore('database.db');
database.loadDatabase();


app.get('/api', (request, response) => {
    // database.find({}, (err, data) => {
    //     if (err) {
    //         response.end();
    //         console.log('error')
    //         return;
    //     }
    //     response.json(data);
    // });

    pool.query('select * from Main', function(err, data){
        if (err) {
                     response.end();
                     console.log('error')
                     return;
                 }
                 response.json(data);
            });
     })
    


