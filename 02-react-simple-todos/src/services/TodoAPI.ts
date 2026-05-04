/**
 * Service for communicating with the json-server backend
 */
import axios from "axios";
import type { Todo } from "../types/Todo";

const BASE_URL = "http://localhost:3000";

/**
 * Get all todos
 */
export const getTodos = async () => {
	const res = await axios.get<Todo[]>(BASE_URL + "/todos");
	return res.data;
}

/**
 * Create a new todo
 *
 * @param payload Object with properties and values for the new todo
 */

/**
 * Update a todo
 *
 * @param todoId Todo to update
 * @param payload Data to update todo with
 */

/**
 * Delete a todo
 *
 * @param todoId Todo to delete
 */
