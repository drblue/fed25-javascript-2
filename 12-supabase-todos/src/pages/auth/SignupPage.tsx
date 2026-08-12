import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Link } from "react-router";
import type { SignupFormData } from "../../types/Form.types";

const SignupPage = () => {
	const { handleSubmit, register, formState: { errors, isSubmitting } } = useForm<SignupFormData>();

	const onSignup: SubmitHandler<SignupFormData> = (formData) => {
		console.log("Will sign up user:", formData);
	}

	return (
		<Container className="py-4 center-y">
			<Row>
				<Col md={{ span: 6, offset: 3 }}>
					<Card className="mb-3">
						<Card.Body>
							<Card.Title className="mb-3">Sign up</Card.Title>

							{false && <Alert variant="danger">{false || "Unknown error"}</Alert>}

							<Form className="mb-3" onSubmit={handleSubmit(onSignup)}>
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

								<Form.Group controlId="confirmPassword" className="mb-3">
									<Form.Label>Confirm Password</Form.Label>
									<Form.Control
										isInvalid={!!errors.confirmPassword}
										type="password"
										autoComplete="off"
										{...register("confirmPassword", {
											required: "You're kidding, right? Enter a password, stupid",
											minLength: {
												message: "It said to ENTER AT LEAST 6 CHARACTERS, can't read, can we?",
												value: 6,
											},
											validate: (value, formData) => {
												// Is the current value the same as in the `password` form field?
												/*
												if (value === formData.password) {
													return true;
												}

												return "The passwords do not match 🤦🏻";
												*/
												return value === formData.password || "The passwords do not match 🤦🏻";
											},
										})}
									/>
									<Form.Control.Feedback type="invalid">
										{errors.confirmPassword?.message || "Invalid value"}
									</Form.Control.Feedback>
								</Form.Group>

								<Button
									disabled={isSubmitting}
									type="submit"
									variant="primary"
								>
									{isSubmitting
										? "Creating account..."
										: "Create Account"}
								</Button>
							</Form>

							{/* <div className="text-center">
								<Link to="/forgot-password">Forgot Password?</Link>
							</div> */}
						</Card.Body>
					</Card>

					<div className="text-center">
						Already have an account? <Link to="/login">Log in</Link>
					</div>
				</Col>
			</Row>
		</Container>
	)
}

export default SignupPage;
