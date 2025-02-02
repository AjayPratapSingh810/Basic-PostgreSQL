import { client } from '../index';

export async function createTables() {
    await client.connect(); 
    const result =await client.query(`
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            name VARCHAR(255) NOT NULL
        );
    `);
    console.log("result ",result);

    await client.query(`
        CREATE TABLE IF NOT EXISTS todos (
            id SERIAL PRIMARY KEY,
            user_id INTEGER NOT NULL REFERENCES users(id),
            title VARCHAR(255) NOT NULL,
            description TEXT,
            done BOOLEAN DEFAULT false
        );
    `);
}

export async function dropTables() {
    await client.connect(); 
    await client.query(`DROP TABLE IF EXISTS todos;`);
    await client.query(`DROP TABLE IF EXISTS users;`);
}

module.exports = { createTables, dropTables };