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
exports.createTodo = createTodo;
exports.updateTodo = updateTodo;
exports.getTodos = getTodos;
const __1 = require("..");
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
function createTodo(userId, title, description) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield __1.client.connect();
            const insertQuery = "INSERT INTO todos (user_id,title,description) VALUES ($1,$2,$3)";
            const values = [userId, title, description];
            const res = yield __1.client.query(insertQuery, values);
            console.log("todo is : ", res);
        }
        catch (error) {
            console.log("error : ", error);
        }
        finally {
            __1.client.end();
        }
    });
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
function updateTodo(todoId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield __1.client.connect();
            const updateQuery = "UPDATE todos SET done = true WHERE $1 RETURNING *";
            const values = [todoId];
            const res = yield __1.client.query(updateQuery, values);
            console.log("todo is : ", res);
        }
        catch (error) {
            console.log("error : ", error);
        }
        finally {
            __1.client.end();
        }
    });
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
function getTodos(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield __1.client.connect();
            const getTodosQuery = "SELECT * FROM todos WHERE id = $1";
            const values = [userId];
            const res = yield __1.client.query(getTodosQuery, values);
            console.log("todo is : ", res.rows);
        }
        catch (error) {
            console.log("error : ", error);
        }
        finally {
            __1.client.end();
        }
    });
}
