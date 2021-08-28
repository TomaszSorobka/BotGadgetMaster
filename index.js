const express = require('express');
const Datastore = require('nedb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening at ${port}`));
app.use(express.static('website/public'));

const database = new Datastore('database.db');
database.loadDatabase();


app.get('/api', (request, response) => {
    database.find({}, (err, data) => {
        if (err) {
            response.end();
            console.log('error')
            return;
        }
        response.json(data);
    });
    
});

