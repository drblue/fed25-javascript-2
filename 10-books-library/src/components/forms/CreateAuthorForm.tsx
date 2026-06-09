import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const CreateAuthorForm = () => {
	return (
		<Form>
			<Form.Group className="mb-3" controlId="name">
				<Form.Label>Author Name</Form.Label>
				<Form.Control
					placeholder="Astrid Lindgren"
					required
					type="text"
				/>
			</Form.Group>

			<Form.Group className="mb-3" controlId="date_of_birth">
				<Form.Label>Date of Birth</Form.Label>
				<Form.Control
					type="date"
				/>
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
