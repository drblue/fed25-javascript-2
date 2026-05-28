/**
 * Service for communicating with the json-server backend
 */
import axios from "axios";
import type { CreateTodoPayload, Todo, UpdateTodoPayload } from "../types/Todo";

const BASE_URL = "http://localhost:3000";
const FAKE_DELAY = 1500;

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
 * Execute a HTTP GET request to an endpoint
 *
 * @param endpoint Endpoint to HTTP GET
 * @returns {Promise<T>}
 */
const get = async <T>(endpoint: string) => {
	const res = await http.get<T>(endpoint);

	if (FAKE_DELAY) {
		await new Promise(r => setTimeout(r, FAKE_DELAY));
	}

	return res.data;
}

/**
 * Execute a HTTP POST request to an endpoint
 *
 * @param endpoint Endpoint to HTTP POST
 * @returns {Promise<T>}
 */
const post = async <TResponse, TPayload>(endpoint: string, payload: TPayload) => {
	const res = await http.post<TResponse>(endpoint, payload);

	if (FAKE_DELAY) {
		await new Promise(r => setTimeout(r, FAKE_DELAY));
	}

	return res.data;
}

/**
 * Execute a HTTP PATCH request to an endpoint
 *
 * @param endpoint Endpoint to HTTP PATCH
 * @returns {Promise<T>}
 */
const patch = async <TResponse, TPayload>(endpoint: string, payload: TPayload) => {
	const res = await http.patch<TResponse>(endpoint, payload);

	if (FAKE_DELAY) {
		await new Promise(r => setTimeout(r, FAKE_DELAY));
	}

	return res.data;
}

/**
 * Execute a HTTP DELETE request to an endpoint
 *
 * @param endpoint Endpoint to HTTP DELETE
 * @returns {Promise<T>}
 */
const del = async <T>(endpoint: string) => {
	const res = await http.delete<T>(endpoint);

	if (FAKE_DELAY) {
		await new Promise(r => setTimeout(r, FAKE_DELAY));
	}

	return res.data;
}

/**
 * Get all todos
 */
export const getTodos = async () => {
	return await get<Todo[]>("/todos");
}

/**
 * Get todo
 */
export const getTodo = async (id: number) => {
	return await get<Todo>("/todos/" + id);
}

/**
 * Create a new todo
 *
 * @param payload Object with properties and values for the new todo
 */
export const createTodo = async (payload: CreateTodoPayload) => {
	return post<Todo, CreateTodoPayload>("/todos", payload);
}

/**
 * Update a todo
 *
 * @param todoId Todo to update
 * @param payload Data to update todo with
 */
export const updateTodo = async (todoId: number, payload: UpdateTodoPayload) => {
	return patch<Todo, UpdateTodoPayload>("/todos/" + todoId, payload)
}

/**
 * Delete a todo
 *
 * @param todoId Todo to delete
 */
export const deleteTodo = async (todoId: number) => {
	await del("/todos/" + todoId);
	return true;
}
