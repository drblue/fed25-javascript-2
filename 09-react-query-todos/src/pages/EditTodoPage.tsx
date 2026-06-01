import { useQuery } from "@tanstack/react-query";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import { useNavigate, useParams } from "react-router";
import EditTodoForm from "../components/EditTodoForm";
import * as TodoAPI from "../services/TodoAPI";

const EditTodoPage = () => {
	const { id } = useParams();
	const todoId = Number(id);
	const navigate = useNavigate();

	const { data: todo, error, isError, isLoading } = useQuery({
		queryKey: ["todo", { id: todoId }],
		queryFn: () => TodoAPI.getTodo(todoId),
	});

	const handleSave = async (title: string) => {
		if (!todo) {
			throw new Error("Can't submit, `todo` is null");
		}

		if (!title) {
			return;
		}

		// Tell API to update the todo
		await TodoAPI.updateTodo(todo.id, {
			title,
		});

		// Redirect user to /todos/:id
		navigate("/todos/" + todo.id);
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
				key={todoId}
				onSave={handleSave}
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
