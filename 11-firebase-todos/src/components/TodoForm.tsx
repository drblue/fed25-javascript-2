import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import type { NewTodo } from "../types/Todo.types";

interface TodoFormProps {
	className?: string;
	isCreating?: boolean;
	onAdd: (data: NewTodo) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ className, isCreating = false, onAdd }) => {
	const [inputTodoTitle, setInputTodoTitle] = useState("");

	const handleSubmit = async (e: React.SubmitEvent) => {
		e.preventDefault();

		// Tell parent to create a new todo with `inputTodoTitle` as the title
		await onAdd({
			title: inputTodoTitle.trim(),
			completed: false,
		});

		// Clear input field
		setInputTodoTitle("");
	}

	return (
		<Form onSubmit={handleSubmit} className={className}>
			<Form.Group controlId="title" className="mb-3">
				<Form.Label>Title</Form.Label>
				<Form.Control
					isInvalid={inputTodoTitle.trim().length > 0 && inputTodoTitle.trim().length < 3}
					onChange={(e) => setInputTodoTitle(e.target.value)}
					placeholder="Learn about GTD"
					type="text"
					value={inputTodoTitle}
					autoFocus
					required
				/>
				<Form.Control.Feedback type="invalid">
					Please enter 3 characters or more.
				</Form.Control.Feedback>
			</Form.Group>

			<Button
				disabled={inputTodoTitle.trim().length < 3 || isCreating}
				type="submit"
				variant="success"
			>Save</Button>
		</Form>
	)
}

export default TodoForm;
