import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { NewTodo } from "../types/Todo.types";

interface TodoFormProps {
	className?: string;
	isCreating?: boolean;
	onAdd: (data: NewTodo) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ className, isCreating = false, onAdd }) => {
	const { handleSubmit, register, reset, formState: { errors } } = useForm<NewTodo>({
		defaultValues: {
			completed: false,
		},
	});

	const onFormSubmit: SubmitHandler<NewTodo> = async (formData) => {
		console.log("Yum, I got some validated data 😋:", formData);

		// Tell parent to create a new todo with `inputTodoTitle` as the title
		await onAdd(formData);

		// Clear input field
		reset();
	}

	return (
		<Form onSubmit={handleSubmit(onFormSubmit)} className={className}>
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
