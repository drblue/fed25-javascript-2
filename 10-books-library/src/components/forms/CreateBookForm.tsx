import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm, type SubmitHandler } from "react-hook-form";
import useAuthors from "../../hooks/useAuthors";
import useCreateBook from "../../hooks/useCreateBook";
import type { NewBook } from "../../services/BooksAPI.types";

interface CreateBookFormProps {
	authorId?: number;
}

const currentYear = new Date().getFullYear();

const CreateBookForm: React.FC<CreateBookFormProps> = ({ authorId }) => {
	const { handleSubmit, register, formState: { errors } } = useForm<NewBook>();
	const createBookMutation = useCreateBook();
	const { data: authors } = useAuthors();

	const onCreateAuthorBookSubmit: SubmitHandler<NewBook> = (data) => {
		console.log("Submitted (and validated) data:", data);
		console.log("authorId prop:", authorId);

		createBookMutation.mutate(data);
	}

	const sortedAuthors = authors && [...authors].sort((a, b) => a.name.localeCompare(b.name));

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

			<Form.Group className="mb-3" controlId="authorId">
				<Form.Label>Author</Form.Label>
				<Form.Select
					{...register("authorId", {
						required: "A book without an author is not a book",
						valueAsNumber: true,
						disabled: !sortedAuthors,
					})}
				>
					{sortedAuthors
						? sortedAuthors.map(author => (
							<option key={author.id} value={author.id}>{author.name}</option>
						))
						: <option>Loading...</option>}
				</Form.Select>
				{errors.authorId && <Form.Control.Feedback type="invalid">{errors.authorId.message}</Form.Control.Feedback>}
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

export default CreateBookForm;
