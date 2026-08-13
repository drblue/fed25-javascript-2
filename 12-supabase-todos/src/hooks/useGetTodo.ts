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
		console.log("getTodo result:", data, error);
		setIsLoading(false);

		if (error) {
			setError(error);
			return;
		}

		setTodo(data);
	}

	useEffect(() => {
		getTodo();

		const channel = supabase
			.channel("todos-changes")
			.on(
				"postgres_changes",
				{
					event: "*",
					schema: "public",
					table: "todos",
					filter: `id=eq.${id}`,  // only subscribe to changes to this todo, not all todos
				}, (payload) => {
					// something changed!
					console.log(`Detected change in todo with id ${id}:`, payload);

					// instead of triggering a new request, use the updated data from the response
					// getTodo();
					setTodo(payload.new as Todo);
				})
			.subscribe();
		console.log(`📮 Subscribed to changes in the todo with id ${id}`);

		return () => {
			// 🧹 Clean up by removing channel
			supabase.removeChannel(channel);
			console.log(`🧹 Stopped listening for changes to the todo with id ${id}`);
		}
	}, []);

	return {
		error,
		getTodo,
		isLoading,
		todo,
	}
}

export default useGetTodo;
