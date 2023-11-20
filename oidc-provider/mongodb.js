import { MongoClient } from 'mongodb';

const uri = 'mongodb://root:example@localhost:27017';
const client = new MongoClient(uri);

async function connect() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    return client.db('users'); // the database name
  } catch (e) {
    console.error('Error connecting to MongoDB', e);
    throw e;
  }
}

export default connect;
