require('dotenv').config();
const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

const run = async () => {
  try {
    await client.connect();
    await client.db('admin').command({ ping: 1 });
    console.log('Pinged your deployment. You successfully connected to MongoDB!');
  } catch (err) {
    console.error('MongoDB connection error:', err);
  } finally {
    await client.close();
  }
};

run().catch(console.dir);