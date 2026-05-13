import { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate, useParams } from "react-router";
import * as TodoAPI from "../services/TodoAPI";
import type { Todo } from "../types/Todo";

const EditTodoPage = () => {
	const [error, setError] = useState<string | false>(false);
	const [inputTitle, setInputTitle] = useState("");
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

		// Make request to API
		try {
			const data = await TodoAPI.getTodo(id);
			setInputTitle(data.title);
			setTodo(data);
		} catch (err) {
			console.error(`Error thrown when fetching todo with id '${id}':`, err);
			setError(err instanceof Error ? err.message : "It's not me, it's you");
		} finally {
			setIsLoading(false);
		}
	}

	const handleSubmit = async (e: React.SubmitEvent) => {
		e.preventDefault();

		if (!todo) {
			throw new Error("Can't submit, `todo` is null");
		}

		// Tell API to update the todo
		await TodoAPI.updateTodo(todo.id, {
			title: inputTitle.trim(),
		});

		// Redirect user to /todos/:id
		navigate("/todos/" + todo.id);
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
			<h1 title={"Todo #" + todo.id}>Edit: {todo.title}</h1>

			<Form onSubmit={handleSubmit} className="mb-4">
				<Form.Group className="mb-3" controlId="title">
					<Form.Label>Title</Form.Label>
					<Form.Control
						onChange={(e) => setInputTitle(e.target.value)}
						placeholder="Buy milk"
						type="text"
						value={inputTitle}
					/>
				</Form.Group>

				<Button
					type="submit"
					variant="success"
				>Save</Button>
			</Form>

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
