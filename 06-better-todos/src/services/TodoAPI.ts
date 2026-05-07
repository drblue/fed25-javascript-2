/**
 * Service for communicating with the json-server backend
 */
import axios from "axios";
import type { CreateTodoPayload, Todo, UpdateTodoPayload } from "../types/Todo";

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
export const createTodo = async (payload: CreateTodoPayload) => {
	const res = await axios.post<Todo>(BASE_URL + "/todos", payload);
	return res.data;
}

/**
 * Update a todo
 *
 * @param todoId Todo to update
 * @param payload Data to update todo with
 */
export const updateTodo = async (todoId: number, payload: UpdateTodoPayload) => {
	const res = await axios.patch<Todo>(BASE_URL + "/todos/" + todoId, payload);
	return res.data;
}

/**
 * Delete a todo
 *
 * @param todoId Todo to delete
 */
export const deleteTodo = async (todoId: number) => {
	await axios.delete(BASE_URL + "/todos/" + todoId);
	return true;
}
