const mongoose = require('mongoose');
mongoose.connect('mongodb://mongo/apinodepmn');
const express = require('express')
const app = express()
const port = 3003

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// const express = require('express');
// const csv = require('csv-parser');
// const fs = require('fs');

// app.use(express.json());

// app.post('/import', (req, res) => {
//   if (!req.body.csvFile) {
//     return res.status(400).json({ error: 'CSV file is required' });
//   }

//   const csvData = req.body.csvFile;

//   // Vous pouvez maintenant traiter le fichier CSV ici, par exemple avec la bibliothèque 'csv-parser'
//   // Le code ci-dessous lit le fichier CSV et renvoie les données en tant qu'objet JSON.
//   const results = [];

//   csvData.pipe(csv())
//     .on('data', (data) => results.push(data))
//     .on('end', () => {
//       res.json(results);
//     });
// });

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
