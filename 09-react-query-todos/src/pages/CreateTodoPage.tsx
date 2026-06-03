import { useMutation, useQueryClient } from "@tanstack/react-query";
import Alert from "react-bootstrap/Alert";
import { Link } from "react-router";
import AddNewTodoForm from "../components/AddNewTodoForm";
import * as TodoAPI from "../services/TodoAPI";
import type { CreateTodoPayload, Todo } from "../services/TodoAPI.types";

const CreateTodoPage = () => {
	const queryClient = useQueryClient();

	const createTodoMutation = useMutation({
		mutationFn: (data: CreateTodoPayload) => TodoAPI.createTodo(data),
		onSuccess: async (createdTodo) => {
			// set the response from the mutation as the query cache entry for this todo
			queryClient.setQueryData(["todo", { id: createdTodo.id }], createdTodo);

			// get ["todos"] from the cache (if it exists and is fresh 🌱)
			// otherwise fetch the todos from the api
			const cachedTodos = await queryClient.fetchQuery({
				queryKey: ["todos"],
				queryFn: async () => {
					const data = await TodoAPI.getTodos();
					const sortedTodos = data
						.sort((a, b) => a.title.localeCompare(b.title))
						.sort((a, b) => Number(a.completed) - Number(b.completed));
					return sortedTodos;
				},
			});

			// bail if the newly created todo already exists in the cached todos
			if (cachedTodos.find(todo => todo.id === createdTodo.id)) {
				// FOUND IT! 🤩
				return;
			}

			// create a new array based on the cachedTodos + the newly created todo
			queryClient.setQueryData<Todo[]>(["todos"], [...cachedTodos, createdTodo]);
		},
	});

	const handleCreateTodo = async (title: string) => {
		const payload: CreateTodoPayload = {
			title,
			completed: false,
		}

		// Call mutation 🐢☢️
		await createTodoMutation.mutateAsync(payload);
	}

	return (
		<>
			<h1>Create todo</h1>

			{createTodoMutation.isError && <Alert variant="warning">{createTodoMutation.error.message}</Alert>}

			<AddNewTodoForm isCreating={createTodoMutation.isPending} onAdd={handleCreateTodo} />

			{createTodoMutation.isSuccess && (
				<Alert variant="success">
					<Alert.Heading>Created todo successfully</Alert.Heading>

					<Link to={"/todos/" + createTodoMutation.data.id} className="btn btn-success" role="button">
						Go to todo &raquo;
					</Link>
				</Alert>
			)}

			<Link to="/todos" className="btn btn-secondary mt-4" role="button">
				&laquo; All todos
			</Link>
		</>
	)
}

export default CreateTodoPage;
