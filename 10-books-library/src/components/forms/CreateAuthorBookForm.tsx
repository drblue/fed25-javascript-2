/**
 * THIS COMPONENT ISN'T USED ANYMORE
 *
 * IT HAS BEEN REPLACED BY CreateBookForm
 */

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm, type SubmitHandler } from "react-hook-form";
import useCreateBook from "../../hooks/useCreateBook";
import type { NewBook } from "../../services/BooksAPI.types";

interface CreateAuthorBookFormProps {
	authorId: number;
}

const currentYear = new Date().getFullYear();

const CreateAuthorBookForm: React.FC<CreateAuthorBookFormProps> = ({ authorId }) => {
	const { handleSubmit, register, formState: { errors } } = useForm<NewBook>();
	const createBookMutation = useCreateBook();

	const onCreateAuthorBookSubmit: SubmitHandler<NewBook> = (data) => {
		console.log("Submitted (and validated) data:", data);

		createBookMutation.mutate({
			...data,
			authorId,
		});
	}

	return (
		<Form onSubmit={handleSubmit(onCreateAuthorBookSubmit)}>
			<Form.Group className="mb-3" controlId="title">
				<Form.Label>Title</Form.Label>
				<Form.Control
					isInvalid={!!errors.title}
					placeholder="Whispers in the Abyss"
					type="text"
					{...register("title", {
						minLength: {
							message: "Title must be at least 3 characters",
							value: 3,
						},
						required: "A book without a title isn't a book",
					})}
				/>
				{errors.title && <Form.Control.Feedback type="invalid">{errors.title.message}</Form.Control.Feedback>}
			</Form.Group>

			<Form.Group className="mb-3" controlId="pages">
				<Form.Label>Pages</Form.Label>
				<Form.Control
					isInvalid={!!errors.pages}
					type="number"
					{...register("pages", {
						min: {
							message: "Book has to have at least 1 page",
							value: 1,
						},
						required: "A book without pages isn't a book",
						valueAsNumber: true,
					})}
				/>
				{errors.pages && <Form.Control.Feedback type="invalid">{errors.pages.message}</Form.Control.Feedback>}
			</Form.Group>

			<Form.Group className="mb-3" controlId="published">
				<Form.Label>Published</Form.Label>
				<Form.Control
					isInvalid={!!errors.published}
					type="number"
					{...register("published", {
						min: {
							message: "Publish year has to be 1455 or later",
							value: 1455,
						},
						max: {
							message: `Publish year has to be ${currentYear} or earlier`,
							value: currentYear,
						},
						required: "A book that's not published isn't a valid book",
						valueAsNumber: true,
					})}
				/>
				{errors.published && <Form.Control.Feedback type="invalid">{errors.published.message}</Form.Control.Feedback>}
			</Form.Group>

			<div className="d-flex justify-content-end">
				<Button variant="success" type="submit" disabled={createBookMutation.isPending}>
					Create
				</Button>
			</div>
		</Form>
	)
}

export default CreateAuthorBookForm;
