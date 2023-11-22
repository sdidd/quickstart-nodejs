import { Client } from 'cassandra-driver';
import cassandra from 'cassandra-driver';

let authProvider = new cassandra.auth.PlainTextAuthProvider('cassandra', 'cassandra');
// TO DO: Fill in your own host and data center
const client = new Client({
  contactPoints: ['127.0.0.1'],
  localDataCenter: 'datacenter1',
  keyspace: 'demo',
  authProvider: authProvider
});

function insertUser(lastname, age, city, email, firstname) {
  // TO DO: execute a prepared statement that inserts one user into the table
  const insert = 'INSERT INTO users (lastname, age, city, email, firstname) VALUES (?,?,?,?,?)';
  const params = [ lastname, age, city, email, firstname ];
  return client.execute(insert, params, { prepare : true });
}

function selectUser(lastname) {
  // TO DO: execute a prepared statement that retrieves one user from the table
  const select = 'SELECT firstname, age FROM users WHERE lastname = ?';
  const params = [ lastname ] ;
  return client.execute(select, params, { prepare : true });
}

function updateUser(age, lastname) {
  // TO DO: execute a prepared statement that updates the age of one user
  const update = 'UPDATE users SET age = ? WHERE lastname = ?';
  return client.execute(update, [ age, lastname ], { prepare : true } )
}

function deleteUser(lastname) {
  // TO DO: execute a prepared that deletes one user from the table
  const remove = 'DELETE FROM users WHERE lastname = ?';
  const params = [ lastname ];
  return client.execute(remove, params, { prepare: true })
}


// Function to retrieve all users
async function getAllUsers() {
  // TO DO: Implement functionality to retrieve all users
  const selectAll = 'SELECT * FROM users';
  const params = [];
  return await client.execute(selectAll, params, { prepare: true });
}

function updateUserProperties(lastname, age, city, email, firstname) {
  // TO DO: Implement functionality to update multiple user properties
  const update = 'UPDATE users SET age = ?, city = ?, email = ?, firstname = ? WHERE lastname = ?';
  const params = [ age, city, email, firstname, lastname ];
  return client.execute(update, params, { prepare: true });
}

function deleteAllUsers() {
  // TO DO: Implement functionality to delete all users
  const query = 'TRUNCATE users';
  return client.execute(query, [], { prepare: true });
}

function getUserCount() {
  // TO DO: Implement functionality to retrieve user count
  const query = 'SELECT COUNT(*) as count FROM users';
  return client.execute(query, [], { prepare: true });
}

function getUsersByAge(min, max) {
  // TO DO: Implement functionality to retrieve users within a specific age range
  const query = 'SELECT * FROM users WHERE age >= ? AND age <= ?';
  const params = [ min, max ];
  return client.execute(query, params, { prepare: true });
}

function getUsersByCity(city) {
  // TO DO: Implement functionality to retrieve users from a specific city
  const query = 'SELECT * FROM users WHERE city = ?';
  const params = [ city ];
  return client.execute(query, params, { prepare: true });
}

export {
  insertUser,
  selectUser,
  updateUser,
  deleteUser,
  getAllUsers,
  updateUserProperties,
  deleteAllUsers,
  getUserCount,
  getUsersByAge,
  getUsersByCity
};