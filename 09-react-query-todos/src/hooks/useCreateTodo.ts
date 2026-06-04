import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createTodo, getTodos } from "../services/TodoAPI";
import type { CreateTodoPayload, Todo } from "../services/TodoAPI.types";
import { sortTodos } from "../utils/sorting";

const useCreateTodo = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: CreateTodoPayload) => createTodo(data),
		onSuccess: async (createdTodo) => {
			// set the response from the mutation as the query cache entry for this todo
			queryClient.setQueryData(["todo", { id: createdTodo.id }], createdTodo);

			// get ["todos"] from the cache (if it exists and is fresh 🌱)
			// otherwise fetch the todos from the api
			const cachedTodos = await queryClient.fetchQuery({
				queryKey: ["todos"],
				queryFn: async () => sortTodos(await getTodos()),
			});

			// bail if the newly created todo already exists in the cached todos
			if (cachedTodos.find(todo => todo.id === createdTodo.id)) {
				// FOUND IT! 🤩
				return;
			}

			// create a new array based on the cachedTodos + the newly created todo
			queryClient.setQueryData<Todo[]>(["todos"], sortTodos([...cachedTodos, createdTodo]));

			// 🥂
			toast.success("Todo created", { icon: () => "🎉" });
		},
	});
}

export default useCreateTodo;
