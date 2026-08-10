import { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import { Link, useParams } from "react-router";
import ConfirmationModal from "../components/ConfirmationModal";
import { supabase } from "../lib/supabase";
import type { Todo } from "../types/Todo.types";

const TodoPage = () => {
	const [error, setError] = useState<Error | false>(false);
	const [isLoading, setIsLoading] = useState(true);
	const [todo, setTodo] = useState<Todo | null>(null);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const { id } = useParams();
	const todoId = Number(id);
	// const navigate = useNavigate();
	// const { data: todo, error, getData, isLoading } = useGetTodo(id);

	if (!todoId || isNaN(todoId)) {
		throw new Error("TodoPage can't work without id");
	}

	const getTodo = async () => {
		setError(false);
		setIsLoading(true);
		setTodo(null);

		// Get single todo from Supabase
		const { data, error } = await supabase
			.from("todos")
			.select()
			.eq("id", todoId)
			.single();
		console.log({data});
		setIsLoading(false);

		if (error) {
			setError(error);
			return;
		}

		setTodo(data);
	}

	const handleDelete = async () => {
		setShowDeleteModal(false);
		console.log("Would delete todo with id:", id);

		// 🥂
		// toast.success("Todo deleted", { icon: () => "💣" });

		// Redirect user to todos list
		// and replace the current history entry
		// navigate("/todos", {
		// 	replace: true,
		// });
	}

	const handleToggle = async (todo: Todo) => {
		console.log("Would toggle todo:", todo);

		// 🥂
		// toast.success("Todo toggled", { icon: () => "📋" });
	}

	useEffect(() => {
		getTodo();
	}, []);

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
			<title>{todo.title}</title>
			<h1 title={"#" + todo.id}>{todo.title}</h1>

			<p><strong>Status:</strong> {todo.completed
				? <Badge bg="success">👌🏻 Completed</Badge>
				: <Badge bg="warning">😥 Not completed</Badge>
			}</p>

			<div className="buttons mb-4">
				{/* Toggle */}
				<Button onClick={() => handleToggle(todo)} variant="success">
					Toggle
				</Button>

				{/* Edit */}
				<Link className="btn btn-warning" role="button" to={`/todos/${id}/edit`}>
					Edit
				</Link>

				{/* Delete */}
				<Button onClick={() => setShowDeleteModal(true)} variant="danger">
					Delete
				</Button>

				<ConfirmationModal
					confirmButtonText="Delete 4 realz"
					onCancel={() => setShowDeleteModal(false)}
					onConfirm={() => handleDelete()}
					show={showDeleteModal}
					title="Confirm delete"
					variant="danger"
				>
					Delete todo "{todo.title}"?
				</ConfirmationModal>
			</div>

			{/* Here be button-link back to all todos */}
			<Link to="/todos" className="btn btn-secondary" role="button">
				&laquo; All todos
			</Link>
		</>
	)
}

export default TodoPage;
