import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import { useNavigate, useParams } from "react-router";
import useGetTodo from "../hooks/useGetTodo";
import type { TodoFormData } from "../types/Todo.types";
import TodoForm from "../components/TodoForm";
import { doc, updateDoc } from "firebase/firestore";
import { todosCol } from "../libs/firebase";
import { toast } from "react-toastify";

const EditTodoPage = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const { data: todo, error, isLoading } = useGetTodo(id);

	if (!id) {
		throw new Error("TodoPage can't work without id");
	}

	const updateTodo = async (data: Partial<TodoFormData>) => {
		// Update the todo
		const docRef = doc(todosCol, id);

		// Show toast(s) while updating
		// Toast 🥂 + Promise 🤞🏻 = ❤️
		await toast.promise(updateDoc(docRef, data), {
			pending: "🤔 Saving todo",
			success: "🛟 Todo saved 🏊🏻",
			error: "😬 Unable to save todo",
		});

		// 🥂
		// toast.success("Todo updated", { icon: () => "✨" });

		// Redirect user to /todos/:id
		navigate("/todos/" + id);
	}

	if (error) {
		return <Alert variant="danger">
			<Alert.Heading>Doh! Bad stuff happened. Try again later?</Alert.Heading>
			<p><strong>Error:</strong> {error.message}</p>
		</Alert>
	}

	if (isLoading) {
		return <p>Loading todo... nom nom nom 🍪</p>
	}

	return todo && (
		<>
			<title>{`Edit: ${todo.title}`}</title>
			<h1 title={"Todo #" + todo._id}>Edit: {todo.title}</h1>

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
