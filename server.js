import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path'; // Import `dirname` and `join`
import pkg from 'body-parser';
const { json } = pkg;
import { Client } from 'cassandra-driver';
import cassandra from 'cassandra-driver';
import { insertUser, selectUser, updateUser, deleteUser,getAllUsers,getUserCount,getUsersByAge,getUsersByCity } from './quickstart-complete.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

let authProvider = new cassandra.auth.PlainTextAuthProvider('cassandra', 'cassandra');
app.use(json());
app.use(express.static(join(__dirname, 'public'))); // Use `join` instead of `path.join`

// TO DO: Fill in your own Cassandra connection configuration
const client = new Client({
  contactPoints: ['127.0.0.1'],
  localDataCenter: 'datacenter1',
  keyspace: 'demo',
  authProvider: authProvider
});

// TO DO: Add error handling, validation, and security measures

app.post('/insertUser', async (req, res) => {
  const { lastname, age, city, email, firstname } = req.body;
  try {
    await insertUser(lastname, age, city, email, firstname);
    res.status(201).send('User inserted successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/selectUser/:lastname', async (req, res) => {
  const { lastname } = req.params;
  try {
    const result = await selectUser(lastname);
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.put('/updateUser/:lastname', async (req, res) => {
  const { lastname } = req.params;
  const { age } = req.body;
  try {
    await updateUser(age, lastname);
    res.status(200).send('User updated successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.delete('/deleteUser/:lastname', async (req, res) => {
  const { lastname } = req.params;
  try {
    await deleteUser(lastname);
    res.status(200).send('User deleted successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Additional APIs
// Get all users
// Get all users
app.get('/getAllUsers', async (req, res) => {
    try {
      const result = await getAllUsers(); // Call the function to retrieve all users
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error occurred while getting all users.');
    }
  });
  
  // Update multiple properties of a user
  app.put('/updateUserProperties/:lastname', async (req, res) => {
    const { lastname } = req.params;
    const { age, city, email, firstname } = req.body;
    try {
      await updateUserProperties(lastname, age, city, email, firstname);
      res.status(200).send('User properties updated successfully');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  // Delete all users
  app.delete('/deleteAllUsers', async (req, res) => {
    try {
      await deleteAllUsers();
      res.status(200).send('All users deleted successfully');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  // Get user count
  app.get('/getUserCount', async (req, res) => {
    try {
      const result = await getUserCount();
      res.status(200).json({ count: result.rows[0].count });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  // Get users within a specific age range
  app.get('/getUsersByAge/:min/:max', async (req, res) => {
    const { min, max } = req.params;
    try {
      const result = await getUsersByAge(parseInt(min), parseInt(max));
      res.status(200).json(result.rows);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  // Get users from a specific city
  app.get('/getUsersByCity/:city', async (req, res) => {
    const { city } = req.params;
    try {
      const result = await getUsersByCity(city);
      res.status(200).json(result.rows);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });
  

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

