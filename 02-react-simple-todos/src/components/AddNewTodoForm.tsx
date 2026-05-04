import { useState } from "react";

interface AddNewTodoFormProps {
	onAdd: (title: string) => void;
}

const AddNewTodoForm: React.FC<AddNewTodoFormProps> = ({ onAdd }) => {
	const [inputTodoTitle, setInputTodoTitle] = useState("");

	const handleSubmit = (e: React.SubmitEvent) => {
		e.preventDefault();

		// Tell parent to create a new todo with `inputTodoTitle` as the title
		onAdd(inputTodoTitle.trim());

		// Clear input field
		setInputTodoTitle("");
	}

	return (
		<form onSubmit={handleSubmit} className="mb-3">
			<div className="input-group mb-3">
				<input
					aria-label="New todo title"
					className="form-control"
					onChange={(e) => setInputTodoTitle(e.target.value)}
					placeholder="Learn about GTD"
					type="text"
					value={inputTodoTitle}
					required
				/>

				<button
					className="btn btn-success"
					disabled={inputTodoTitle.trim().length < 3}
					type="submit"
				>👶🏻</button>
			</div>
		</form>
	)
}

export default AddNewTodoForm;
