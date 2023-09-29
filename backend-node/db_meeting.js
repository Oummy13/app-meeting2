import { useHistory } from 'react-router-dom';
const express = require('express');
  const multer = require('multer');
  const csv = require('csv-parser');
  const MongoClient = require('mongodb').MongoClient;
  
  const app = express();
  const port = 3000;
  
  const storage = multer.memoryStorage();
  const upload = multer({ storage: storage });
  
  const url = 'mongodb://localhost:27017';
  const dbName = 'meeting';
  const collectionName = 'meetings';

const meetingSchema = {
    meeting_name: { type: String, required: true },
    orga_email: { type: String, required: true },
    // particip_email: { type: [String], required: true },
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
    link: { type: String, required: true }
  };
  
  
app.use(express.json());
  
router.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
  
const bufferString = req.file.buffer.toString('utf-8');
const results = [];
  
const validateAndInsert = (row) => {
// validation checks here
if (!row.meeting_name || !row.orga_email || !row.start_date || !row.end_date || !row.link) {
        return;
    }
  
// Prepare the document to be inserted into MongoDB
const document = {
    meeting_name: row.meeting_name,
    orga_email: row.orga_email,
    // particip_email: row.particip_email.split(','),
    start_date: new Date(row.start_date),
    end_date: new Date(row.end_date),
    link: row.link,
    };
  
    results.push(document);
};

// Process the CSV file
csv()
    .on('data', (row) => {
        validateAndInsert(row);
    })
    .on('end', () => {
// Connect to MongoDB and insert the documents
MongoClient.connect(url, (err, client) => {
    if (err) {
        return res.status(500).json({ error: 'Database connection error' });
    }
  
const db = client.db(dbName);
db.collection(collectionName).insertMany(results, (err, result) => {
if (err) {
        return res.status(500).json({ error: 'Database insertion error' });
    }
  
res.status(200).json({ message: 'Data imported successfully' });
    client.close();
        });
    });
 });
  
 // Start processing the CSV stream
const stream = require('stream');
const readable = new stream.Readable();
readable._read = () => {}; // Required for readable streams
readable.push(bufferString);
readable.push(null);
readable.pipe(csv());
});
  
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
    