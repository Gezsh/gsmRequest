const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(cors({
  origin: '*'
}));

// MongoDB connection URI
const uri = 'mongodb+srv://Gezsh:21a74b28c34d@cluster0.wgpztnq.mongodb.net/user?retryWrites=true&w=majority&appName=Cluster0';
const dbName = 'gsm'; // Replace 'your_database_name' with your actual database name

// POST endpoint to handle user information
app.post('/data', async (req, res) => {
  // Extract user information from the request body
  const { id, firstName, lastName } = req.body;

  try {
    // Connect to MongoDB
    const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = client.db(dbName);

    // Insert user information into MongoDB
    const result = await db.collection('users').insertOne({ id, firstName, lastName });

    // Log the inserted user information
    console.log(`Inserted user information - ID: ${id}, First Name: ${firstName}, Last Name: ${lastName}`);

    // Respond with a success message
    res.status(200).send('User information received and stored successfully!');
  } catch (error) {
    console.error('Error occurred while inserting user information:', error);
    res.status(500).send('An error occurred while processing the request.');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
