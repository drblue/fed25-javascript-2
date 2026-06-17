import { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import { Link, useParams } from "react-router";
import ConfirmationModal from "../components/ConfirmationModal";
import type { Todo } from "../types/Todo.types";
import { doc, getDoc } from "firebase/firestore";
import { todosCol } from "../libs/firebase";

const TodoPage = () => {
	const [error, setError] = useState<Error | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [todo, setTodo] = useState<Todo | null>(null);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const { id } = useParams();

	const handleDelete = () => {
		setShowDeleteModal(false);
		console.log("Would delete todo with id:", id)
	}

	useEffect(() => {
		const getTodo = async () => {
			setError(null);
			setIsLoading(true);
			setTodo(null);

			// Get reference to document in "todos" collection
			// and a snapshot of the document
			const docRef = doc(todosCol, id);
			const snapshot = await getDoc(docRef);

			// Check if document actually existed
			if (!snapshot.exists()) {
				setError(new Error("Document not found"));
				setIsLoading(false);
				return;
			}

			// Transform document to match `Todo` type
			const data = {
				...snapshot.data(),
				_id: snapshot.id,
			}

			// Update state
			setTodo(data);
			setIsLoading(false);
		}
		getTodo();
	}, [id]);

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
