import { useState } from "react";
import Alert from "react-bootstrap/Alert";
import { Link, useNavigate } from "react-router";
import AddNewTodoForm from "../components/AddNewTodoForm";
import * as TodoAPI from "../services/TodoAPI";
import type { CreateTodoPayload, Todo } from "../types/Todo";

const CreateTodoPage = () => {
	const [createdTodo, setCreatedTodo] = useState<Todo | null>(null);
	const [error, setError] = useState<string | false>(false);
	const [isMutating, setIsMutating] = useState(false);  // 👶🏻☢️🥷🏻🐢
	const navigate = useNavigate();

	const handleCreateTodo = async (title: string) => {
		setCreatedTodo(null);
		setError(false);
		setIsMutating(true);

		const payload: CreateTodoPayload = {
			title,
			completed: false,
		}

		try {
			const todo = await TodoAPI.createTodo(payload);
			setCreatedTodo(todo);

			setTimeout(() => {
				navigate("/todos/" + todo.id);
			}, 2000);

		} catch (err) {
			console.error("Error thrown when creating todo:", payload, err);
			setError(err instanceof Error ? err.message : "It's not me, it's you");

		} finally {
			setIsMutating(false);
		}
	}

	return (
		<>
			<h1>Create todo</h1>

			{error && <Alert variant="warning">{error}</Alert>}

			{isMutating && <p role="status">Mutating 👶🏻☢️🥷🏻🐢...</p>}

			<AddNewTodoForm onAdd={handleCreateTodo} />

			{createdTodo && (
				<Alert variant="success">
					<Alert.Heading>Created todo successfully</Alert.Heading>

					<Link to={"/todos/" + createdTodo.id} className="btn btn-success" role="button">
						Go to todo &raquo;
					</Link>
				</Alert>
			)}

			<Link to="/todos" className="btn btn-secondary mt-4" role="button">
				&laquo; All todos
			</Link>
		</>
	)
}

export default CreateTodoPage;
