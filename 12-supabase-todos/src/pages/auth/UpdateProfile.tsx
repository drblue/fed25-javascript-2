import { useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { UpdateProfileFormData } from "../../types/Form.types";

const UpdateProfile = () => {
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const { handleSubmit, register, formState: { errors, isSubmitting } } = useForm<UpdateProfileFormData>();

	const onUpdateProfile: SubmitHandler<UpdateProfileFormData> = async (data) => {
		console.log("Will update user with:", data);

		// Update user metadata in Supabase

		// Handle any errors that may occur

		// If successful, show toast 🥂
		// toast.success("🛟 Great profile!");
	}

	return (
		<Container className="py-4 center-y">
			<Row>
				<Col md={{ span: 6, offset: 3 }}>
					<Card className="mb-3">
						<Card.Body>
							<Card.Title className="mb-3">Update profile</Card.Title>

							{errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

							<Form className="mb-3" onSubmit={handleSubmit(onUpdateProfile)}>
								<Form.Group controlId="name" className="mb-3">
									<Form.Label>Name</Form.Label>
									<Form.Control
										autoComplete="name"
										isInvalid={!!errors.display_name}
										placeholder="Johnny Doe"
										type="text"
										{...register("display_name", {
											minLength: {
												message: "If you have a name, it has to be at least 3 characters long",
												value: 3,
											},
										})}
									/>
									<Form.Control.Feedback type="invalid">
										{errors.display_name?.message || "Invalid value"}
									</Form.Control.Feedback>
								</Form.Group>

								<Form.Group controlId="photo_url" className="mb-3">
									<Form.Label>Photo URL</Form.Label>
									<Form.Control
										autoComplete="url"
										isInvalid={!!errors.photo_url}
										placeholder="https://randomuser.me/api/portraits/women/68.jpg"
										type="url"
										{...register("photo_url")}
									/>
									<Form.Control.Feedback type="invalid">
										{errors.photo_url?.message || "Invalid value"}
									</Form.Control.Feedback>
								</Form.Group>

								<Button
									disabled={isSubmitting}
									type="submit"
									variant="primary"
								>
									{isSubmitting
										? "Saving..."
										: "Save"}
								</Button>
							</Form>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	)
}

export default UpdateProfile;
