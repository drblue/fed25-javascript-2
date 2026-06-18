import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import Alert from "react-bootstrap/Alert";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import { Link, useNavigate, useParams } from "react-router";
import ConfirmationModal from "../components/ConfirmationModal";
import useGetTodo from "../hooks/useGetTodo";
import { todosCol } from "../libs/firebase";
import type { Todo } from "../types/Todo.types";
import { toast } from "react-toastify";

const TodoPage = () => {
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const { id } = useParams();
	const navigate = useNavigate();
	const { data: todo, error, getData, isLoading } = useGetTodo(id);

	if (!id) {
		throw new Error("TodoPage can't work without id");
	}

	const handleDelete = async () => {
		setShowDeleteModal(false);

		// Delete todo from Firebase
		const docRef = doc(todosCol, id);
		await deleteDoc(docRef);

		// 🥂
		toast.success("Todo deleted", { icon: () => "💣" });

		// Redirect user to todos list
		// and replace the current history entry
		navigate("/todos", {
			replace: true,
		});
	}

	const handleToggle = async (todo: Todo) => {
		// Toggle todo in Firestore
		const docRef = doc(todosCol, id);
		await updateDoc(docRef, {
			completed: !todo.completed,
		});

		// Get the updated todo
		await getData(id);

		// 🥂
		toast.success("Todo toggled", { icon: () => "📋" });
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
			<title>{todo.title}</title>
			<h1 title={"#" + todo._id}>{todo.title}</h1>

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
