import { useState } from "react";
import Alert from "react-bootstrap/Alert";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import { Link, useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import ConfirmationModal from "../components/ConfirmationModal";
import useGetTodo from "../hooks/useGetTodo";
import { supabase } from "../lib/supabase";
import type { Todo } from "../types/Todo.types";

const TodoPage = () => {
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const { id } = useParams();
	const todoId = Number(id);
	const navigate = useNavigate();
	const { error, isLoading, todo } = useGetTodo(todoId);

	const handleDelete = async () => {
		setShowDeleteModal(false);
		console.log("Would delete todo with id:", id);

		// Delete todo in Supabase
		const { data, error } = await supabase
			.from("todos")
			.delete()
			.eq("id", todoId)
			.select()
			.single();
		console.log("Delete todo result:", { data, error });

		if (error) {
			toast.error(`Error: ${error.message}`, { icon: () => "⚠️" });
			return;
		}

		// 🥂
		toast.success(`Todo "${data?.title}" deleted`, { icon: () => "💣" });

		// Redirect user to todos list
		// and replace the current history entry
		navigate("/todos", {
			replace: true,
		});
	}

	const handleToggle = async (todo: Todo) => {
		console.log("Would toggle todo:", todo);

		// Update todo in Supabase
		const { data, error } = await supabase
			.from("todos")
			.update({ completed: !todo.completed })
			.eq("id", todo.id)
			.select()
			.single();
		console.log("Toggle todo result:", { data, error });

		if (error) {
			toast.error(`Error: ${error.message}`, { icon: () => "⚠️" });
			return;
		}

		// 🥂
		if (data.completed) {
			toast.success("Todo marked as completed", { icon: () => "✅" });
		} else {
			toast.success("Todo marked as not completed", { icon: () => "😥" });
		}
	}

	if (error) {
		return <Container className="py-4">
			<Alert variant="danger">
				<Alert.Heading>Doh! Bad stuff happened. Try again later?</Alert.Heading>
				<p><strong>Error:</strong> {error.message}</p>
			</Alert>
		</Container>
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
		</Container>
	)
}

export default TodoPage;
