import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Alert from "react-bootstrap/Alert";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import { Link, useNavigate, useParams } from "react-router";
import ConfirmationModal from "../components/ConfirmationModal";
import * as TodoAPI from "../services/TodoAPI";
import type { Todo } from "../services/TodoAPI.types";

const TodoPage = () => {
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const { id } = useParams();
	const todoId = Number(id);
	const navigate = useNavigate();
	const { data: todo, error, isError, isLoading, refetch } = useQuery({
		queryKey: ["todo", { id: todoId }],
		queryFn: () => TodoAPI.getTodo(todoId),
	});

	const handleDelete = async (todo: Todo) => {
		await TodoAPI.deleteTodo(todo.id);

		// Redirect to "/todos" (and replace the current history entry with the new URL)
		navigate("/todos", {
			replace: true,
		});
	}

	const handleToggle = async (todo: Todo) => {
		await TodoAPI.updateTodo(todo.id, {
			completed: !todo.completed,
		});

		// Refetch the todo so we get the updated todo
		refetch();
	}

	if (isError) {
		return <Alert variant="warning">{error.message}</Alert>;
	}

	if (isLoading) {
		return <p>Loading todo...</p>;
	}

	return todo && (
		<>
			<h1>{todo.title}</h1>

			<p><strong>Status:</strong> {todo.completed
				? <Badge bg="success">👌🏻 Completed</Badge>
				: <Badge bg="warning">😥 Not completed</Badge>
			}</p>

			<div className="buttons mb-4">
				{/* Toggle */}
				<Button
					onClick={() => handleToggle(todo)}
					variant="success"
				>Toggle</Button>

				{/* Edit */}
				<Link
					className="btn btn-warning"
					role="button"
					to={`/todos/${todo.id}/edit`}
				>Edit</Link>

				{/* Delete */}
				<Button
					onClick={() => setShowDeleteModal(true)}
					variant="danger"
				>Delete</Button>

				<ConfirmationModal
					confirmButtonText="Delete 4 realz"
					onCancel={() => setShowDeleteModal(false)}
					onConfirm={() => handleDelete(todo)}
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
