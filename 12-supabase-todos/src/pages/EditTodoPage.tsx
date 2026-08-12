import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import { useNavigate, useParams } from "react-router";
import type { TodoFormData } from "../types/Todo.types";
import TodoForm from "../components/TodoForm";
import useGetTodo from "../hooks/useGetTodo";
import { supabase } from "../lib/supabase";
import { toast } from "react-toastify";

const EditTodoPage = () => {
	const { id } = useParams();
	const todoId = Number(id);
	const navigate = useNavigate();
	const { error, isLoading, todo } = useGetTodo(todoId);

	if (!id) {
		throw new Error("TodoPage can't work without id");
	}

	const updateTodo = async (data: Partial<TodoFormData>) => {
		// Update the todo
		console.log(`Would update todo id ${id} with:`, data);

		// Update todo in Supabase
		const { error } = await supabase
			.from("todos")
			.update(data)
			.eq("id", todoId)
		console.log("Toggle todo result:", { error });

		if (error) {
			return error.message;
		}

		// 🥂
		toast.success("Todo updated", { icon: () => "✨" });

		// Redirect user to /todos/:id
		navigate("/todos/" + id);

		return null;
	}

	if (error) {
		return (
			<Container className="py-4">
				<Alert variant="danger">
					<Alert.Heading>Doh! Bad stuff happened. Try again later?</Alert.Heading>
					<p><strong>Error:</strong> {error.message}</p>
				</Alert>
			</Container>
		)
	}

	if (isLoading) {
		return (
			<Container className="py-4">
				<Spinner animation="border" size="sm" /> Loading todo... nom nom nom 🍪
			</Container>
		)
	}

	return todo && (
		<Container className="py-4">
			<title>{`Edit: ${todo.title}`}</title>
			<h1 title={"Todo #" + todo.id}>Edit: {todo.title}</h1>

			<TodoForm
				className="mb-4"
				initialValues={todo}
				key={id}
				onSave={updateTodo}
			/>

			<Button
				onClick={() => navigate(-1)}
				variant="secondary"
			>
				&laquo; Go back
			</Button>
		</Container>
	)
}

export default EditTodoPage;
