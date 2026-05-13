import { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import { Link, useNavigate, useParams } from "react-router";
import ConfirmDeleteButton from "../components/ConfirmDeleteButton";
import * as TodoAPI from "../services/TodoAPI";
import type { Todo } from "../types/Todo";

const TodoPage = () => {
	const [error, setError] = useState<string | false>(false);
	const [isLoading, setIsLoading] = useState(true);
	const [todo, setTodo] = useState<Todo | null>(null);
	const { id } = useParams();
	const todoId = Number(id);
	const navigate = useNavigate();

	const getTodo = async (id: number) => {
		// reset state
		setError(false);
		setIsLoading(true);
		setTodo(null);

		// make request to api
		try {
			const data = await TodoAPI.getTodo(id);
			setTodo(data);
		} catch (err) {
			console.error(`Error thrown when fetching todo with id '${id}':`, err);
			setError(err instanceof Error ? err.message : "It's not me, it's you");
		} finally {
			setIsLoading(false);
		}
	}

	const handleDelete = async (todo: Todo) => {
		await TodoAPI.deleteTodo(todo.id);

		// Redirect to "/todos" (and replace the current history entry with the new URL)
		navigate("/todos", {
			replace: true,
		});
	}

	const handleToggle = async (todo: Todo) => {
		const updatedTodo = await TodoAPI.updateTodo(todo.id, {
			completed: !todo.completed,
		});

		// Update todo state with the updated todo
		setTodo(updatedTodo);
	}

	useEffect(() => {
		// eslint-disable-next-line react-hooks/set-state-in-effect
		getTodo(todoId);
	}, [todoId]);

	if (error) {
		return <Alert variant="warning">{error}</Alert>;
	}

	if (isLoading) {
		return <p>Loading...</p>;
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
				<ConfirmDeleteButton
					onConfirm={() => handleDelete(todo)}
				/>
			</div>

			{/* Here be button-link back to all todos */}
			<Link to="/todos" className="btn btn-secondary" role="button">
				&laquo; All todos
			</Link>
		</>
	)
}

export default TodoPage;
