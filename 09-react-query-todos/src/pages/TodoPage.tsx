import { useState } from "react";
import Alert from "react-bootstrap/Alert";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import { Link, useNavigate, useParams } from "react-router";
import ConfirmationModal from "../components/ConfirmationModal";
import useDeleteTodo from "../hooks/useDeleteTodo";
import useTodo from "../hooks/useTodo";
import useUpdateTodo from "../hooks/useUpdateTodo";

const TodoPage = () => {
	const [queryEnabled, setQueryEnabled] = useState(true);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const { id } = useParams();
	const todoId = Number(id);
	const navigate = useNavigate();

	const { data: todo, error, isError, isLoading } = useTodo(todoId, queryEnabled);

	const onError = () => {
		// disable query for this specific todo, so it's not refetched onSuccess
		setQueryEnabled(false);
	}

	const onMutate = () => {
		// something went wrong, re-enable query
		setQueryEnabled(true);
	}

	const deleteTodoMutation = useDeleteTodo(
		todoId,
		onError,
		onMutate,
	);

	const updateTodoMutation = useUpdateTodo(todoId);

	const handleDelete = () => {
		// Hide modal
		setShowDeleteModal(false);

		// Call mutation to delete todo
		deleteTodoMutation.mutate(undefined, {
			onSuccess: () => {
				// Redirect to "/todos" (and replace the current history entry with the new URL)
				navigate("/todos", {
					replace: true,
				});
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
			<h1>{todo.title}</h1>

			<p><strong>Status:</strong> {todo.completed
				? <Badge bg="success">👌🏻 Completed</Badge>
				: <Badge bg="warning">😥 Not completed</Badge>
			}</p>

			<div className="buttons mb-4">
				{/* Toggle */}
				<Button
					disabled={updateTodoMutation.isPending}
					onClick={() => updateTodoMutation.mutate({ completed: !todo.completed })}
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
					disabled={deleteTodoMutation.isPending}
					onClick={() => setShowDeleteModal(true)}
					variant="danger"
				>Delete</Button>

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
