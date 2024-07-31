import { client } from "..";
/*
 * Function should insert a new todo for this user
 * Should return a todo object
 * {
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }
 */
export async function createTodo(userId: number, title: string, description: string) {
    try{
        await client.connect();
        const insertQuery = "INSERT INTO todos (user_id,title,description) VALUES ($1,$2,$3)";
        const values = [userId,title,description];
        const res = await client.query(insertQuery,values);
        console.log("todo is : ",res);
    }catch(error){
        console.log("error : ",error);
    }finally{
        client.end();
    }
}
/*
 * mark done as true for this specific todo.
 * Should return a todo object
 * {
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }
 */
export async function updateTodo(todoId: number) {
    try{
        await client.connect();
        const updateQuery = "UPDATE todos SET done = true WHERE $1 RETURNING *";
        const values = [todoId];
        const res = await client.query(updateQuery,values);
        console.log("todo is : ",res);
    }catch(error){
        console.log("error : ",error);
    }finally{
        client.end();
    }
}

/*
 *  Get all the todos of a given user
 * Should return an array of todos
 * [{
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }]
 */
export async function getTodos(userId: number) {
    try{
        await client.connect();
        const getTodosQuery = "SELECT * FROM todos WHERE id = $1";
        const values = [userId];
        const res = await client.query(getTodosQuery,values);
        console.log("todo is : ",res.rows);
    }catch(error){
        console.log("error : ",error);
    }finally{
        client.end();
    }
}