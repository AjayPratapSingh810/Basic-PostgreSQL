import { Client } from 'pg'
import { DB_URL } from './config';
import { createTables, dropTables } from './db/setup';
import { createUser, getUser } from './db/users';
import { createTodo, getTodos, updateTodo } from './db/todos';
export const client = new Client({
    connectionString: DB_URL
});
// dropTables();
// createTables();
  
  // Example usage
//   createUser('ajay123', 'password@133201', 'ajay');
  // getUser(1);

  // createTodo(1,"share market","buy irb broo....");
  // updateTodo(1);
  // getTodos(1);

  const joinData = async(userId:number) =>{

    try {
      await client.connect();
      const query = `
          SELECT users.id, users.username, users.password, todos.title, todos.description
          FROM users
          JOIN todos ON users.id = todos.user_id
          WHERE users.id = $1
      `;
      const result = await client.query(query, [userId]);

      if (result.rows.length > 0) {
          console.log('User and address found:', result.rows[0]);
          return result.rows[0];
      } else {
          console.log('No user or address found with the given ID.');
          return null;
      }
  } catch (err) {
      console.error('Error during fetching user and address:', err);
      throw err;
  } finally {
      await client.end();
  }
  }
  joinData(1);
  