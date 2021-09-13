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
  host: 'eu-cdbr-west-01.cleardb.com',
  port: '3306', 
  user: 'b71a94d125faf7', 
  password: '575376a6',
  database: 'heroku_e84c4376fe837e8',
  connectionLimit: '10',
  multipleStatements: true
});

app.get('/api', (request, response) => {

    pool.query('select * from Main', function(err, data){
        if (err) {
                     response.end();
                     console.log('error')
                     return;
                 }
                 response.json(data);
            });
     })
    


