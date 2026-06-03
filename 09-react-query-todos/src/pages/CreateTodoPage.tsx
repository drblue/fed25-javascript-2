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
		onSuccess: (createdTodo) => {
			// set the response from the mutation as the query cache entry for this todo
			queryClient.setQueryData(["todo", { id: createdTodo.id }], createdTodo);

			// instead of nvalidating the `["todos"]` query, we can construct new data
			// based on the previous data + the newly created todo from the mutation
			queryClient.setQueryData<Todo[]>(["todos"], (prevTodos = []) => {
				return [
					...prevTodos,
					createdTodo,
				];
			});
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
