# DataStax Node.js Driver for Apache Cassandra Quickstart

A basic Node.js demo CRUD application using the DataStax Python Driver for Apache Cassandra. 
The intent is to help users get up and running quickly with the driver. 
If you are having trouble, the complete code solution for `quickstart.js` can be found [here](https://gist.github.com/beccam/c896674cc555e8857783f3fe91fbc8a0).

## Prerequisites
  * A running instance of [Apache Cassandra®](http://cassandra.apache.org/download/) 1.2+
  * [Node.js](https://nodejs.org/en/download/) 
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
The `cassandra.Client()` instancec connects to our cluster.
You need to provide the address or host name of your node and your local data center name.
```javascipt
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
  const insert = 'INSERT INTO users (lastname, age, city, email, firstname) VALUES (?,?,?,?,?)';
  const params = [ lastname, age, city, email, firstname ];
  return client.execute(insert, params, { prepare : true });
}
```
### SELECT a user
```javascript
function selectUser(lastname) {
  const select = 'SELECT firstname, age FROM users WHERE lastname = ?';
  return client.execute(select, lastname, { prepare : true });
}
```

### UPDATE a user's age
```javascript
function updateUser(age, lastname) {
    const update = 'UPDATE users SET age = ? WHERE lastname = ?';
    return client.execute(update, [ age, lastname ], { prepare : true } )
}
```   

### DELETE a user
```javascript
function deleteUser(lastname) {
    const query = 'DELETE FROM users WHERE lastname = ?';
    return client.execute(query, lastname)
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

