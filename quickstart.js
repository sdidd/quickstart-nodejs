const cassandra = require('cassandra-driver');
const client = new cassandra.Client({ contactPoints: ['127.0.0.1'], localDataCenter: 'datacenter1',  keyspace: 'demo' });

function insertUser(lastname, age, city, email, firstname) {
  const insert = 'INSERT INTO users (lastname, age, city, email, firstname) VALUES (?,?,?,?,?)';
  const params = [ lastname, age, city, email, firstname ];
  return client.execute(insert, params, { prepare : true });
}

function selectUser(lastname) {
  const select = 'SELECT firstname, age FROM users WHERE lastname = ?';
  return client.execute(select, lastname, { prepare : true });
}

function updateUser(age, lastname) {
    const update = 'UPDATE users SET age = ? WHERE lastname = ?';
    return client.execute(update, [ age, lastname ], { prepare : true } )
}

function deleteUser(lastname) {
    const query = 'DELETE FROM users WHERE lastname = ?';
    return client.execute(query, lastname)
}

async function example() {
  await insertUser('Jones', 35, 'Austin', 'bob@example.com', 'Bob');
  const rs1 = await selectUser(['Jones']);
  if (rs1.rows.length > 0) {
    const user1 = rs1.rows[0];
    console.log("name = %s, age = %d", user1.firstname, user1.age);
  } else {
    console.log("No results");
  }
  await updateUser(36, 'Jones');
  const rs2 = await selectUser(['Jones']);
  if (rs2.rows.length > 0) {
    const user2 = rs2.rows[0];
    console.log("name = %s, age = %d", user2.firstname, user2.age);
  } else {
    console.log("No results");
  }
  deleteUser(['Jones']);

  await client.shutdown();
}

example();
