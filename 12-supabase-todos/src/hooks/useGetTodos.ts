import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import type { Todo } from "../types/Todo.types";

const useGetTodos = (userId: string) => {
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
			.eq("user_id", userId)
			.order("title")
			.order("completed");
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

		const channel = supabase
			.channel("todos-changes")
			.on(
				"postgres_changes",
				{
					event: "*",
					schema: "public",
					table: "todos",
				}, (payload) => {
					// something changed!
					console.log("Detected change in todos table:", payload);
					getTodos();
				})
			.subscribe();
		console.log("📮 Subscribed to changes in the todos table");

		return () => {
			// 🧹 Clean up by removing channel
			supabase.removeChannel(channel);
			console.log("🧹 Stopped listening for changes to the todos table");
		}
	}, []);

	return {
		error,
		getTodos,
		isLoading,
		todos,
	}
}

export default useGetTodos;
