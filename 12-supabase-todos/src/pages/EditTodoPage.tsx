import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import { useNavigate, useParams } from "react-router";
import type { Todo, TodoFormData } from "../types/Todo.types";
import TodoForm from "../components/TodoForm";

const todo: Todo = {
	id: 1337,
	title: "Learn to fake better data 😅",
	completed: true,
};
const error: Error | false = false;
const isLoading = false;

const EditTodoPage = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	// const { data: todo, error, isLoading } = useGetTodo(id);

	if (!id) {
		throw new Error("TodoPage can't work without id");
	}

	const updateTodo = async (data: Partial<TodoFormData>) => {
		// Update the todo
		console.log(`Would update todo id ${id} with:`, data);

		// 🥂
		// toast.success("Todo updated", { icon: () => "✨" });

		// Redirect user to /todos/:id
		// navigate("/todos/" + id);
	}

	if (error) {
		return <Alert variant="danger">
			<Alert.Heading>Doh! Bad stuff happened. Try again later?</Alert.Heading>
			{/* <p><strong>Error:</strong> {error.message}</p> */}
		</Alert>
	}

	if (isLoading) {
		return <p>Loading todo... nom nom nom 🍪</p>
	}

	return todo && (
		<>
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
		</>
	)
}

export default EditTodoPage;
