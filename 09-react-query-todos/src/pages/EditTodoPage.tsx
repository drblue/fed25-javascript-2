import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import { useNavigate, useParams } from "react-router";
import EditTodoForm from "../components/EditTodoForm";
import * as TodoAPI from "../services/TodoAPI";
import type { UpdateTodoPayload } from "../services/TodoAPI.types";
import { sortTodos } from "../utils/sorting";

const EditTodoPage = () => {
	const { id } = useParams();
	const todoId = Number(id);
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const { data: todo, error, isError, isLoading } = useQuery({
		queryKey: ["todo", { id: todoId }],
		queryFn: () => TodoAPI.getTodo(todoId),
	});

	const updateTodoMutation = useMutation({
		mutationFn: (data: UpdateTodoPayload) => TodoAPI.updateTodo(todoId, data),
		onSuccess: async (updatedTodo) => {
			// set the response from the mutation as the query cache entry for this todo
			queryClient.setQueryData(["todo", { id: todoId }], updatedTodo);

			// get ["todos"] from the cache (if it exists and is fresh 🌱)
			// otherwise fetch the todos from the api
			const cachedTodos = await queryClient.fetchQuery({
				queryKey: ["todos"],
				queryFn: async () => sortTodos(await TodoAPI.getTodos()),
			});

			// replace the todo with the updated todo
			queryClient.setQueryData(["todos"], sortTodos(cachedTodos.map(t => {
				if (t.id !== updatedTodo.id) {
					return t;  // this is not the todo you're looking for
				}

				return updatedTodo;  // replace object in array with the updated todo
			})));

			// Redirect user to /todos/:id
			navigate("/todos/" + todoId);
		},
	});

	if (isError) {
		return <Alert variant="warning">{error.message}</Alert>;
	}

	if (isLoading) {
		return <p>Loading todo...</p>;
	}

	return todo && (
		<>
			<h1 title={"Todo #" + todo.id}>Edit: {todo.title}</h1>

			<EditTodoForm
				isSaving={updateTodoMutation.isPending}
				key={todoId}
				onSave={(title: string) => updateTodoMutation.mutate({ title })}
				todo={todo}
			/>

			<Button
				onClick={() => navigate(-1)}
				variant="secondary"
			>
				&laquo; Go back
			</Button>
		</>
	)
}

export default EditTodoPage;
