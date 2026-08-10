import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import type { Todo } from "../types/Todo.types";

const useGetTodo = (id: number) => {
	const [error, setError] = useState<Error | false>(false);
	const [isLoading, setIsLoading] = useState(true);
	const [todo, setTodo] = useState<Todo | null>(null);

	if (!id || isNaN(id)) {
		throw new Error("useGetTodo can't work without a valid id");
	}

	const getTodo = async () => {
		setError(false);
		setIsLoading(true);
		setTodo(null);

		// Get single todo from Supabase
		const { data, error } = await supabase
			.from("todos")
			.select()
			.eq("id", id)
			.single();
		console.log({data});
		setIsLoading(false);

		if (error) {
			setError(error);
			return;
		}

		setTodo(data);
	}

	useEffect(() => {
		getTodo();
	}, []);

	return {
		error,
		getTodo,
		isLoading,
		todo,
	}
}

export default useGetTodo;
