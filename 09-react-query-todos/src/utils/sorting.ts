import type { Todo } from "../services/TodoAPI.types";

export const sortTodos = (todos: Todo[]) => {
	return todos
		.sort((a, b) => a.title.localeCompare(b.title))
		.sort((a, b) => Number(a.completed) - Number(b.completed));
}
