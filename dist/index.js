"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const pg_1 = require("pg");
const config_1 = require("./config");
exports.client = new pg_1.Client({
    connectionString: config_1.DB_URL
});
// dropTables();
// createTables();
// Example usage
//   createUser('ajay123', 'password@133201', 'ajay');
// getUser(1);
// createTodo(1,"share market","buy irb broo....");
// updateTodo(1);
// getTodos(1);
const joinData = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield exports.client.connect();
        const query = `
          SELECT users.id, users.username, users.password, todos.title, todos.description
          FROM users
          JOIN todos ON users.id = todos.user_id
          WHERE users.id = $1
      `;
        const result = yield exports.client.query(query, [userId]);
        if (result.rows.length > 0) {
            console.log('User and address found:', result.rows[0]);
            return result.rows[0];
        }
        else {
            console.log('No user or address found with the given ID.');
            return null;
        }
    }
    catch (err) {
        console.error('Error during fetching user and address:', err);
        throw err;
    }
    finally {
        yield exports.client.end();
    }
});
joinData(1);
