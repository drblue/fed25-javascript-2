import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import type { Todo } from "../services/TodoAPI.types";

interface EditTodoFormProps {
	onSave: (title: string) => void;
	todo: Todo;
}

const EditTodoForm: React.FC<EditTodoFormProps> = ({ onSave, todo }) => {
	const [inputTitle, setInputTitle] = useState(todo.title);

	const handleSubmit = (e: React.SubmitEvent) => {
		e.preventDefault();

		// Tell parent to save the data
		onSave(inputTitle.trim());
	}

	return (
		<Form onSubmit={handleSubmit} className="mb-4">
			<Form.Group className="mb-3" controlId="title">
				<Form.Label>Title</Form.Label>
				<Form.Control
					onChange={(e) => setInputTitle(e.target.value)}
					placeholder="Buy milk"
					type="text"
					value={inputTitle}
				/>

				{inputTitle.trim().length > 0 && inputTitle.trim().length < 3 && (
					<Form.Text className="text-danger text-small">
						Please enter 3 characters or more.
					</Form.Text>
				)}
			</Form.Group>

			<Button
				disabled={inputTitle.trim().length < 3}
				type="submit"
				variant="success"
			>Save</Button>
		</Form>
	)
}

export default EditTodoForm;
