# DataStax Node.js Driver for Apache Cassandra Quickstart

A basic demo CRUD application using the DataStax Node.js Driver for Apache Cassandra. 
Run the [quickstart-complete.js](quickstart-complete.js) file if you want to run the application with the complete code.

Contributors: [Rebecca Mills](https://github.com/beccam)

## Project Layout

* [quickstart.js](src/quickstart.js) - main application file with space to fill in CRUD operation code
* [users.cql](users.cql) - Use this file to create the schema 

## Objectives

* To demonstrate how to perform basic CRUD operations with the DataStax Node.js Driver.
* The intent is to help users get up and running quickly with the driver. 

## How this Sample Works
This project walks through basic CRUD operations using Cassandra. The demo application will first insert a row of user data, select that same row back out, update the row and finally delete the user. The README includes the code snippets to be filled in to the main application code to complete the functionality.

## Prerequisites
  * A running instance of [Apache Cassandra®](http://cassandra.apache.org/download/) 1.2+
  * [Node.js](https://nodejs.org/en/download/) server environment
  * Use npm to install the driver: `npm install cassandra-driver`
  
  ## Create the keyspace and table
The `users.cql` file provides the schema used for this project:

```sql
CREATE KEYSPACE demo
    WITH replication = {'class': 'SimpleStrategy', 'replication_factor': '1'};

CREATE TABLE demo.users (
    lastname text PRIMARY KEY,
    age int,
    city text,
    email text,
    firstname text);
```

## Connect to your cluster

All of our code is contained in the `quickstart.js` file. 
The `cassandra.Client()` instance connects to our cluster.
You need to provide the address or host name of your node and your local data center name.
```javascipt
// TO DO: Fill in your own host and data center
const client = new cassandra.Client({ 
  contactPoints: ['127.0.0.1'], 
  localDataCenter: 'datacenter1',  
  keyspace: 'demo' 
});
```

## CRUD Operations
Fill the code in the functions that will add a user, get a user, update a user and delete a user from the table with the driver.

### INSERT a user
```javascript
function insertUser(lastname, age, city, email, firstname) {
  // TO DO: execute a prepared statement that inserts one user into the table
  const insert = 'INSERT INTO users (lastname, age, city, email, firstname) VALUES (?,?,?,?,?)';
  const params = [ lastname, age, city, email, firstname ];
  return client.execute(insert, params, { prepare : true });
}
```
### SELECT a user
```javascript
function selectUser(lastname) {
  // TO DO: execute a prepared statement that retrieves one user from the table
  const select = 'SELECT firstname, age FROM users WHERE lastname = ?';
  const params = [ lastname ] ;
  return client.execute(select, params, { prepare : true });
}
```

### UPDATE a user's age
```javascript
function updateUser(age, lastname) {
  // TO DO: execute a prepared statement that updates the age of one user
  const update = 'UPDATE users SET age = ? WHERE lastname = ?';
  return client.execute(update, [ age, lastname ], { prepare : true } )
}
```   

### DELETE a user
```javascript
function deleteUser(lastname) {
  // TO DO: execute a prepared that deletes one user from the table
  const remove = 'DELETE FROM users WHERE lastname = ?';
  const params = [ lastname ];
  return client.execute(remove, params, { prepare: true })
}
```
 ## License
Copyright 2019 Rebecca Mills

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.   

