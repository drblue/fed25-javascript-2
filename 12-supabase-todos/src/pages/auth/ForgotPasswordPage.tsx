import { useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Link } from "react-router";
import type { ForgotPasswordFormData } from "../../types/Form.types";
import { toast } from "react-toastify";
import { supabase } from "../../lib/supabase";

const ForgotPasswordPage = () => {
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [emailSent, setEmailSent] = useState(false);
	const { handleSubmit, register, formState: { errors, isSubmitting } } = useForm<ForgotPasswordFormData>();

	const onForgotPassword: SubmitHandler<ForgotPasswordFormData> = async ({ email }) => {
		console.log("Will send forgot password email to stupid user:", email);

		// Send forgot password reset email using Supabase
		const { error } = await supabase.auth.resetPasswordForEmail(email, {
			redirectTo: window.location.origin + "/profile",
		});
		console.log("Supabase reset password for email response:", { error });

		// If error, set error state and toast
		if (error) {
			setErrorMessage(error.message);
			toast.error(error.message, { icon: () => "😢" });
			return;
		}

		// If successful, toast 🥂
		setEmailSent(true);
		toast.success("😬 Password reset email sent");
	}

	return (
		<Container className="py-4 center-y">
			<Row>
				<Col md={{ span: 6, offset: 3 }}>
					<Card className="mb-3">
						<Card.Body>
							<Card.Title className="mb-3">Forgot password?</Card.Title>

							{errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
							{emailSent && <Alert variant="success">📬 Check your email for the password-reset link.</Alert>}

							<Form className="mb-3" onSubmit={handleSubmit(onForgotPassword)}>
								<Form.Group controlId="email" className="mb-3">
									<Form.Label>Email</Form.Label>
									<Form.Control
										autoComplete="email"
										isInvalid={!!errors.email}
										placeholder="snelhest2000@horsemail.com"
										type="email"
										{...register("email", {
											required: "You have to enter an email 🤦🏻",
										})}
									/>
									<Form.Control.Feedback type="invalid">
										{errors.email?.message || "Invalid value"}
									</Form.Control.Feedback>
								</Form.Group>

								<Button
									disabled={isSubmitting}
									type="submit"
									variant="primary"
								>
									{isSubmitting
										? "Summoning halp..."
										: "HALP PLZ!!!"}
								</Button>
							</Form>

							<div className="text-center">
								Suddenly remembered your password? <Link to="/login">Log in</Link>
							</div>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	)
}

export default ForgotPasswordPage;
