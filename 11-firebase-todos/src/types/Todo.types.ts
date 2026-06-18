export interface Todo {
	_id: string;
	title: string;
	completed: boolean;
}

export type TodoFormData = Omit<Todo, "_id">;
