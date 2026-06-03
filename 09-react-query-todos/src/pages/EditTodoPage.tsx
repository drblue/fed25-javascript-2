import { useQuery } from "@tanstack/react-query";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import { useNavigate, useParams } from "react-router";
import EditTodoForm from "../components/EditTodoForm";
import useUpdateTodo from "../hooks/useUpdateTodo";
import * as TodoAPI from "../services/TodoAPI";

const EditTodoPage = () => {
	const { id } = useParams();
	const todoId = Number(id);
	const navigate = useNavigate();

	const { data: todo, error, isError, isLoading } = useQuery({
		queryKey: ["todo", { id: todoId }],
		queryFn: () => TodoAPI.getTodo(todoId),
	});

	const updateTodoMutation = useUpdateTodo(todoId);

	const handleOnSave = (title: string) => {
		updateTodoMutation.mutate({
			title,
		}, {
			onSuccess: () => {
				// console.log("updateTodoMutation.mutate onSuccess running (will run second)");

				// Redirect user to /todos/:id
				navigate("/todos/" + todoId);
			},
		});
	}

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
				onSave={handleOnSave}
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
