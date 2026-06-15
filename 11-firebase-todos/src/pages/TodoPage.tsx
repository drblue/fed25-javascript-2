import { useState } from "react";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import { Link, useParams } from "react-router";
import ConfirmationModal from "../components/ConfirmationModal";
import type { Todo } from "../types/Todo.types";

const todo: Todo = {
	_id: "Xi6VigUyelerlFbSHKTZ",
	title: "Learn to fake better data 😅",
	completed: true,
};

const TodoPage = () => {
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const { id } = useParams();

	const handleDelete = () => {
		setShowDeleteModal(false);
		console.log("Would delete todo with id:", id)
	}

	return todo && (
		<>
			<title>{todo.title}</title>
			<h1 title={"#" + todo._id}>{todo.title}</h1>

			<p><strong>Status:</strong> {todo.completed
				? <Badge bg="success">👌🏻 Completed</Badge>
				: <Badge bg="warning">😥 Not completed</Badge>
			}</p>

			<div className="buttons mb-4">
				{/* Toggle */}
				<Button onClick={() => console.log("Would toggle todo")} variant="success">
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
