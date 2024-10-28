
//Set up the server
import express from 'express';
let app = express();

import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';

const defaultData = { gear: [] };
const adapter = new JSONFile('db.json');
const db = new Low(adapter, defaultData);

//Serve static files from a public folder
app.use(express.static('public'));
app.use(express.json());
//Set port variable to listen for requests
let port = 3000;
app.listen(port, () => {
  console.log('Server listening on localhost:', port);
});

console.log("working...");

app.get('/gear', (request, response) => {
  db.read()
  .then(() => {
    let gearData = { gear: db.data.gear };
    response.json(gearData);
  });
});


app.post('/newEntry', (request, response) => {
   console.log(request.body);
   let newEntry = request.body;

   db.data.gear.push(newEntry)
    db.write()
    .then(() => {
      response.json({'msg': 'Success'});
    });
});

