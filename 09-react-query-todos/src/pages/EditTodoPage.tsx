import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import { useNavigate, useParams } from "react-router";
import EditTodoForm from "../components/EditTodoForm";
import * as TodoAPI from "../services/TodoAPI";
import type { UpdateTodoPayload } from "../services/TodoAPI.types";

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
		onSuccess: (updatedTodo) => {
			// set the response from the mutation as the query cache entry for this todo
			queryClient.setQueryData(["todo", { id: todoId }], updatedTodo);

			// prefetch ["todos"] query as it's very likely the user will return to the
			// todo list as their next step
			queryClient.prefetchQuery({
				queryKey: ["todos"],
				queryFn: async () => {
					const data = await TodoAPI.getTodos();
					const sortedTodos = data
						.sort((a, b) => a.title.localeCompare(b.title))
						.sort((a, b) => Number(a.completed) - Number(b.completed));
					return sortedTodos;
				},
				staleTime: 0,  // always prefetch, even if the existing data is considered fresh 🌱
			});

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
