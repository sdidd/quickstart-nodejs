# Cassandra Database Access Module

## Overview

This module provides a set of functions to interact with a Cassandra database using the Cassandra driver for Node.js. It includes functions for basic CRUD (Create, Read, Update, Delete) operations, as well as additional functionalities like retrieving all users, updating multiple user properties, deleting all users, retrieving user count, and filtering users by age or city.

## Installation

To use this module, you need to have Node.js installed on your system. Install the required dependencies using the following command:

```bash
npm install cassandra-driver

Usage
Initialization

javascript

import {
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
} from 'path/to/cassandra-module';

// Initialize Cassandra client
// Note: Replace contactPoints, localDataCenter, keyspace, and authentication details with your own values
const client = new Client({
  contactPoints: ['127.0.0.1'],
  localDataCenter: 'datacenter1',
  keyspace: 'demo',
  authProvider: new cassandra.auth.PlainTextAuthProvider('cassandra', 'cassandra')
});

Functions
insertUser(lastname, age, city, email, firstname)

Inserts a new user into the database.

javascript

await insertUser('Doe', 30, 'New York', 'john.doe@example.com', 'John');

selectUser(lastname)

Retrieves user information based on the provided last name.

javascript

const user = await selectUser('Doe');
console.log(user);

updateUser(age, lastname)

Updates the age of a user with the specified last name.

javascript

await updateUser(35, 'Doe');

deleteUser(lastname)

Deletes a user from the database based on the last name.

javascript

await deleteUser('Doe');

getAllUsers()

Retrieves information for all users in the database.

javascript

const allUsers = await getAllUsers();
console.log(allUsers);

updateUserProperties(lastname, age, city, email, firstname)

Updates multiple properties of a user based on the last name.

javascript

await updateUserProperties('Doe', 35, 'Los Angeles', 'john.doe@example.com', 'John');

deleteAllUsers()

Deletes all users from the database.

javascript

await deleteAllUsers();

getUserCount()

Retrieves the total number of users in the database.

javascript

const userCount = await getUserCount();
console.log(userCount);

getUsersByAge(min, max)

Retrieves users within a specific age range.

javascript

const usersInRange = await getUsersByAge(25, 40);
console.log(usersInRange);

getUsersByCity(city)

Retrieves users from a specific city.

javascript

const usersInCity = await getUsersByCity('New York');
console.log(usersInCity);

License

This project is licensed under the MIT License.

css


Feel free to use and modify this formatted documentation according to your preferences.