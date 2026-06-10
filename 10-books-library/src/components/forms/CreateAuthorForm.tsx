import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm, type SubmitHandler } from "react-hook-form";
import useCreateAuthor from "../../hooks/useCreateAuthor";
import type { NewAuthor } from "../../services/BooksAPI.types";

const CreateAuthorForm = () => {
	const { handleSubmit, register, formState: { errors } } = useForm<NewAuthor>();
	const createAuthorMutation = useCreateAuthor();

	const onCreateAuthorSubmit: SubmitHandler<NewAuthor> = (data) => {
		console.log("Submitted (and validated) data:", data);

		createAuthorMutation.mutate(data);
		/*
		const mutationPromise = createAuthorMutation.mutateAsync(data);
		toast.promise(mutationPromise, {
			pending: "Creating author...",
			success: "Created author!",
			error: "Failed to create author",
		});
		*/
	}

	return (
		<Form onSubmit={handleSubmit(onCreateAuthorSubmit)}>
			<Form.Group className="mb-3" controlId="name">
				<Form.Label>Author Name</Form.Label>
				<Form.Control
					isInvalid={!!errors.name}
					placeholder="Astrid Lindgren"
					type="text"
					{...register("name", {
						minLength: {
							message: "Name must be at least 3 characters",
							value: 3,
						},
						required: "Is an author really an author without a name? 🤔",
					})}
				/>
				{errors.name && <Form.Control.Feedback type="invalid">{errors.name.message}</Form.Control.Feedback>}
			</Form.Group>

			<Form.Group className="mb-3" controlId="date_of_birth">
				<Form.Label>Date of Birth</Form.Label>
				<Form.Control
					isInvalid={!!errors.date_of_birth}
					type="date"
					{...register("date_of_birth", {
						required: {
							message: "An author has to have been born",
							value: true,
						},
					})}
				/>
				{errors.date_of_birth && <Form.Control.Feedback type="invalid">{errors.date_of_birth.message}</Form.Control.Feedback>}
			</Form.Group>

			<div className="d-flex justify-content-end">
				<Button variant="success" type="submit">
					Create
				</Button>
			</div>
		</Form>
	);
};

export default CreateAuthorForm;
