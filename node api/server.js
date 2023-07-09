const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;

app.use(express.json());

// MongoDB Atlas connection string
const uri = "mongodb+srv://fahadyaseen102:fahad12345@cluster0.vxygmmh.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to MongoDB Atlas');
  } catch (error) {
    console.log('Error connecting to MongoDB Atlas:', error);
  }
}

connectToDatabase().catch(console.dir);

// POST request handler for '/api/saveLocation'
app.post('/api/saveLocation', async (req, res) => {
  try {
    // Retrieve the location coordinates from the request body
    const { latitude, longitude } = req.body;

    // Store the location data in the database
    const database = client.db('Location');
    const collection = database.collection('locdata');

    const locationData = {
      latitude,
      longitude,
    };

    const result = await collection.insertOne(locationData);
    console.log('Location data stored in MongoDB:', result.insertedId);

    // Send a response
    res.status(200).json({ message: 'Location saved successfully.' });
  } catch (error) {
    console.log('Error storing location data in MongoDB:', error);
    res.status(500).json({ message: 'Error storing location data.' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
