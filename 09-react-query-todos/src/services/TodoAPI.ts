/**
 * Service for communicating with the json-server backend
 */
import axios from "axios";
import type { CreateTodoPayload, Todo, UpdateTodoPayload } from "../types/Todo";

const BASE_URL = "http://localhost:3000";

// Create a new axios instance
const http = axios.create({
	baseURL: BASE_URL,
	timeout: 10000,
	headers: {
		"Accept": "application/json",
		"Content-Type": "application/json",
	},
});

/**
 * Get all todos
 */
export const getTodos = async () => {
	const res = await http.get<Todo[]>("/todos");
	return res.data;
}

/**
 * Get todo
 */
export const getTodo = async (id: number) => {
	const res = await http.get<Todo>("/todos/" + id);
	return res.data;
}

/**
 * Create a new todo
 *
 * @param payload Object with properties and values for the new todo
 */
export const createTodo = async (payload: CreateTodoPayload) => {
	const res = await http.post<Todo>("/todos", payload);
	return res.data;
}

/**
 * Update a todo
 *
 * @param todoId Todo to update
 * @param payload Data to update todo with
 */
export const updateTodo = async (todoId: number, payload: UpdateTodoPayload) => {
	const res = await http.patch<Todo>("/todos/" + todoId, payload);
	return res.data;
}

/**
 * Delete a todo
 *
 * @param todoId Todo to delete
 */
export const deleteTodo = async (todoId: number) => {
	await http.delete("/todos/" + todoId);
	return true;
}
