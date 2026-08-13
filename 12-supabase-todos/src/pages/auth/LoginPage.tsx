import { useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import type { LoginFormData } from "../../types/Form.types";
import { toast } from "react-toastify";

const LoginPage = () => {
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const { handleSubmit, register, formState: { errors, isSubmitting } } = useForm<LoginFormData>();
	const { login } = useAuth();
	const navigate = useNavigate();

	const onLogin: SubmitHandler<LoginFormData> = async ({ email, password }) => {
		console.log("Will log in user:", email, password);

		// Pass email and password along to login in AuthContext
		const { data, error } = await login(email, password);
		console.log("Supabase login response:", { data, error });

		// If error, set error state and toast
		if (error) {
			setErrorMessage(error.message);
			toast.error(error.message, { icon: () => "😢" });
			return;
		}

		// If successful, toast 🥂 and redirect ➡️
		toast.success("🥂 Great job, you remembered your password! Good for you!");
		navigate("/");
	}

	return (
		<Container className="py-4 center-y">
			<Row>
				<Col md={{ span: 6, offset: 3 }}>
					<Card className="mb-3">
						<Card.Body>
							<Card.Title className="mb-3">Log in</Card.Title>

							{errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

							<Form className="mb-3" onSubmit={handleSubmit(onLogin)}>
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

								<Form.Group controlId="password" className="mb-3">
									<Form.Label>Password</Form.Label>
									<Form.Control
										isInvalid={!!errors.password}
										type="password"
										autoComplete="new-password"
										{...register("password", {
											required: "You're kidding, right? Enter a password, stupid",
											minLength: {
												message: "It said to ENTER AT LEAST 6 CHARACTERS, can't read, can we?",
												value: 6,
											},
										})}
									/>
									<Form.Control.Feedback type="invalid">
										{errors.password?.message || "Invalid value"}
									</Form.Control.Feedback>
								</Form.Group>

								<Button
									disabled={isSubmitting}
									type="submit"
									variant="primary"
								>
									{isSubmitting
										? "Logging in..."
										: "Log in"}
								</Button>
							</Form>

							{/* <div className="text-center">
								<Link to="/forgot-password">Forgot Password?</Link>
							</div> */}
						</Card.Body>
					</Card>

					<div className="text-center">
						No account? <Link to="/signup">Sign up</Link>
					</div>
				</Col>
			</Row>
		</Container>
	)
}

export default LoginPage;
