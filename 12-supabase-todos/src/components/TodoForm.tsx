import { useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { TodoFormData } from "../types/Todo.types";

interface TodoFormProps {
	className?: string;
	initialValues?: TodoFormData;
	isCreating?: boolean;
	onSave: (data: TodoFormData) => Promise<string | null>;
}

const TodoForm: React.FC<TodoFormProps> = ({
	className,
	initialValues = { completed: false },
	isCreating = false,
	onSave,
 }) => {
	const [saveError, setSaveError] = useState<string | false>(false);
	const { handleSubmit, register, reset, formState: { errors } } = useForm<TodoFormData>({
		defaultValues: initialValues,
	});

	const onFormSubmit: SubmitHandler<TodoFormData> = async (formData) => {
		console.log("Yum, I got some validated data 😋:", formData);
		setSaveError(false);

		// Tell parent to save data
		const error = await onSave(formData);

		if (error) {
			setSaveError(error);
		} else {
			setSaveError(false);
		}

		// Clear input field
		reset();
	}

	return (
		<Form onSubmit={handleSubmit(onFormSubmit)} className={className}>
			{saveError && <Alert variant="danger">{saveError}</Alert>}

			<Form.Group controlId="title" className="mb-3">
				<Form.Label>Title</Form.Label>
				<Form.Control
					isInvalid={!!errors.title}
					placeholder="Learn about GTD"
					type="text"
					{...register("title", {
						minLength: {
							message: "Title has to be at least 3 characters",
							value: 3,
						},
						required: {
							message: "Title is required",
							value: true,
						},
					})}
				/>
				<Form.Control.Feedback type="invalid">
					{errors.title?.message || "Invalid input"}
				</Form.Control.Feedback>
			</Form.Group>

			<Button
				disabled={isCreating}
				type="submit"
				variant="success"
			>Save</Button>
		</Form>
	)
}

export default TodoForm;
