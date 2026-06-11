import { DevTool } from "@hookform/devtools";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm, type SubmitHandler } from "react-hook-form";
import useCreateAuthor from "../../hooks/useCreateAuthor";
import useUpdateAuthor from "../../hooks/useUpdateAuthor";
import type { Author } from "../../services/BooksAPI.types";
import { authorSchema, type AuthorSchema } from "../../schemas/AuthorSchema";
import { zodResolver } from "@hookform/resolvers/zod";

interface AuthorFormProps {
	author?: Author;
}

const AuthorForm = ({ author }: AuthorFormProps) => {
	const { control, handleSubmit, register, reset, watch, formState: { errors, isDirty } } = useForm<AuthorSchema>({
		defaultValues: {
			name: author?.name,
			date_of_birth: author?.date_of_birth,
		},
		resolver: zodResolver(authorSchema),
	});
	const createAuthorMutation = useCreateAuthor();
	const updateAuthorMutation = useUpdateAuthor(author?.id ?? 0);

	// eslint-disable-next-line react-hooks/incompatible-library
	const authorName = watch("name");
	console.log("Current author name:", authorName);

	const onAuthorSubmit: SubmitHandler<AuthorSchema> = (data) => {
		console.log("Submitted (and validated) data:", data);

		// if we're passed an author via props
		// then we should update, otherwise create
		if (author) {
			// UPDATE!
			updateAuthorMutation.mutate(data);
		} else {
			// CREATE!
			createAuthorMutation.mutate(data, {
				onSuccess: () => {
					// reset form
					reset();
				},
			});
		}
	}

	return (
		<>
			<Form onSubmit={handleSubmit(onAuthorSubmit)}>
				<Form.Group className="mb-3" controlId="name">
					<Form.Label>Author Name</Form.Label>
					<Form.Control
						isInvalid={!!errors.name}
						placeholder="Astrid Lindgren"
						type="text"
						{...register("name")}
					/>
					{errors.name && <Form.Control.Feedback type="invalid">{errors.name.message}</Form.Control.Feedback>}
				</Form.Group>
				<Form.Group className="mb-3" controlId="date_of_birth">
					<Form.Label>Date of Birth</Form.Label>
					<Form.Control
						isInvalid={!!errors.date_of_birth}
						type="date"
						{...register("date_of_birth")}
					/>
					{errors.date_of_birth && <Form.Control.Feedback type="invalid">{errors.date_of_birth.message}</Form.Control.Feedback>}
				</Form.Group>
				<div className="d-flex justify-content-end">
					<Button
						disabled={createAuthorMutation.isPending || updateAuthorMutation.isPending || !isDirty}
						type="submit"
						variant="success"
					>
						Save
					</Button>
				</div>
			</Form>

			<DevTool control={control} />
		</>
	);
};

export default AuthorForm;
