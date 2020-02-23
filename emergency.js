const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const request = require('request');

const port = process.argv.slice(2)[0];
const app = express();

app.use(bodyParser.json());

const sproviderService = 'http://sprovider-service:5555';

const emergency = [
   {
       id: 1,
       displayName: 'Suffering from fever',
       necessarywork: ['treating'],
       img: 'disease.jpg',
       assignedsprovider: 0
   },
   {
       id: 2,
       displayName: 'Robbery',
       necessarywork: ['protecting people'],
       img: 'police.jpg',
       assignedsprovider: 0
   },
   {
       id: 3,
       displayName: 'House is burning',
       necessarywork: ['fireservice'],
       img: 'fire.png',
	   assignedsprovider: 0
   }
];

app.get('/emergency', (req, res) => {
   console.log('Returning emergency list');
   res.send(emergency);
});

app.post('/assignment', (req, res) => {
   request.post({
       headers: {'content-type': 'application/json'},
       url: `${sproviderService}/sprovider/${req.body.sproviderId}`,
       body: `{
           "busy": true
       }`
   }, (err, sproviderResponse, body) => {
       if (!err) {
           const emergencyId = parseInt(req.body.emergencyId);
           const emerge = emergency.find(subject => subject.id === emergencyId);
           emerge.assignedsprovider = req.body.sproviderId;
           res.status(202).send(emerge);
       } else {
           res.status(400).send({problem: ` Service provider responded with emergency condition ${err}`});
       }
   });
});

app.use('/img', express.static(path.join(__dirname,'img')));

console.log(`Emergency service listening on port ${port}`);
app.listen(port);
