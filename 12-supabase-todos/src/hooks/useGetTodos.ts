import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import type { Todo } from "../types/Todo.types";

const useGetTodos = () => {
	const [error, setError] = useState<Error | false>(false);
	const [isLoading, setIsLoading] = useState(true);
	const [todos, setTodos] = useState<Todo[] | null>(null);

	const getTodos = async () => {
		setError(false);
		setIsLoading(true);
		setTodos(null);

		// Query `todos`-table
		const { data, error } = await supabase
			.from("todos")
			.select()
			.order("title");
		console.log({data});
		setIsLoading(false);

		if (error) {
			setError(error);
			return;
		}

		setTodos(data);
	}

	useEffect(() => {
		// Get todos on mount
		getTodos();
	}, []);

	return {
		error,
		getTodos,
		isLoading,
		todos,
	}
}

export default useGetTodos;
