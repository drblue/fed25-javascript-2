import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTodo, getTodos } from "../services/TodoAPI";
import type { Todo } from "../services/TodoAPI.types";
import { sortTodos } from "../utils/sorting";

const useDeleteTodo = (
	id: number,
	onError: () => void = () => {},
	onMutate: () => void = () => {},
) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: () => deleteTodo(id),
		onError,
		onMutate,
		onSuccess: async () => {
			// remove the query for this specific todo
			queryClient.removeQueries({ queryKey: ["todo", { id }] });

			// get ["todos"] from the cache (if it exists and is fresh 🌱)
			// otherwise fetch the todos from the api
			const cachedTodos = await queryClient.fetchQuery({
				queryKey: ["todos"],
				queryFn: async () => sortTodos(await getTodos()),
			});

			// set a new list of todos in the cache where the deleted todo has been removed
			queryClient.setQueryData<Todo[]>(["todos"], cachedTodos.filter(t => t.id !== id));
		},
	});
}

export default useDeleteTodo;
