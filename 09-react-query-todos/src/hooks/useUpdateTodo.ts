import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UpdateTodoPayload } from "../services/TodoAPI.types";
import { getTodos, updateTodo } from "../services/TodoAPI";
import { sortTodos } from "../utils/sorting";

const useUpdateTodo = (id: number) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: UpdateTodoPayload) => updateTodo(id, data),
		onSuccess: async (updatedTodo) => {
			// console.log("useMutation onSuccess running (will run first)");

			// set the response from the mutation as the query cache entry for this todo
			queryClient.setQueryData(["todo", { id }], updatedTodo);

			// get ["todos"] from the cache (if it exists and is fresh 🌱)
			// otherwise fetch the todos from the api
			const cachedTodos = await queryClient.fetchQuery({
				queryKey: ["todos"],
				queryFn: async () => sortTodos(await getTodos()),
			});

			// replace the todo with the updated todo
			queryClient.setQueryData(["todos"], sortTodos(cachedTodos.map(t => {
				if (t.id !== updatedTodo.id) {
					return t;  // this is not the todo you're looking for
				}

				return updatedTodo;  // replace object in array with the updated todo
			})));
		},
	});
}

export default useUpdateTodo;
