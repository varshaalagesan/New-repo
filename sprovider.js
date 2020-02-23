const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const port = process.argv.slice(2)[0];
const app = express();
app.use(bodyParser.json());

const work = [
   { id: 1, name: 'Curing diseases' },
   { id: 2, name: 'protecting the people from crimes' },
   { id: 3, name: 'safeguard people from fire accidents' },
   { id: 4, name: 'prevents child abuse' },
	     
];

const sprovider = [
   {
       id: 1,
       //type: 'flying-machine',
	   
       displayName: 'Doctor',
	   tollno: '108',
       work: [1, 4],
       img: 'doctor.png',
       busy: false
   },
   {
       id: 2,
      // type: 'combat-attack',
       displayName: 'Police',
	   tollno: '100',
       work: [2, 4],
       img: 'police.png',
       busy: false
   },
   {
       id: 3,
       //type: 'green-light-side',
       displayName: 'FireBrigade',
	   tollno: '101',
       work: [3, 4],
       img: 'fireengine.png',
       busy: false
   },
   {
       id: 4,
       //type: 'child care',
       displayName: 'childcare',
	   tollno: '1280',
       work: [1, 4],
       img: 'child.png',
       busy: false
   }
];

app.get('/sprovider', (req, res) => {
   console.log('Returning service provider list');
   res.send(sprovider);
});

app.get('/work', (req, res) => {
   console.log('Returning the work of service provider');
   res.send(powers);
});

app.post('/spro/**', (req, res) => {
   const sproviderId = parseInt(req.params[0]);
   const foundsprovider = sprovider.find(subject => subject.id === sproviderId);

   if (foundsprovider) {
       for (let attribute in foundsprovider) {
           if (req.body[attribute]) {
               foundsprovider[attribute] = req.body[attribute];
               console.log(`Set ${attribute} to ${req.body[attribute]} in spro: ${sproviderId}`);
           }
       }
       res.status(202).header({Location: `http://127.0.0.1:${port}/spro/${foundsprovider.id}`}).send(foundsprovider);
   } else {
       console.log(`Service provider not found.`);
       res.status(404).send();
   }
});

app.use('/img', express.static(path.join(__dirname,'img')));

console.log(`service provider listening on port ${port}`);
app.listen(port);
