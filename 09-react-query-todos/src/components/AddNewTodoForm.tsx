import { useEffect, useRef, useState } from "react";

interface AddNewTodoFormProps {
	isCreating: boolean;
	onAdd: (title: string) => Promise<void>;
}

const AddNewTodoForm: React.FC<AddNewTodoFormProps> = ({ isCreating, onAdd }) => {
	const [inputTodoTitle, setInputTodoTitle] = useState("");
	const inputTodoTitleRef = useRef<HTMLInputElement>(null);

	const handleSubmit = async (e: React.SubmitEvent) => {
		e.preventDefault();

		// Tell parent to create a new todo with `inputTodoTitle` as the title
		await onAdd(inputTodoTitle.trim());

		// Clear input field
		setInputTodoTitle("");
	}

	useEffect(() => {
		if (!inputTodoTitleRef.current) {
			return;
		}

		inputTodoTitleRef.current.focus();
	}, []);

	return (
		<form onSubmit={handleSubmit} className="mb-3">
			<div className="input-group">
				<input
					aria-label="New todo title"
					className="form-control"
					onChange={(e) => setInputTodoTitle(e.target.value)}
					placeholder="Learn about GTD"
					ref={inputTodoTitleRef}
					type="text"
					value={inputTodoTitle}
					// autoFocus
					required
				/>

				<button
					className="btn btn-success"
					disabled={inputTodoTitle.trim().length < 3 || isCreating}
					type="submit"
				>👶🏻</button>
			</div>

			{inputTodoTitle.trim().length > 0 && inputTodoTitle.trim().length < 3 && (
				<div className="form-text text-danger text-small">Please enter 3 characters or more.</div>
			)}
		</form>
	)
}

export default AddNewTodoForm;
