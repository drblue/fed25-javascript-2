import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Link } from "react-router";

const SignupPage = () => {
	return (
		<Container className="py-4 center-y">
			<Row>
				<Col md={{ span: 6, offset: 3 }}>
					<Card className="mb-3">
						<Card.Body>
							<Card.Title className="mb-3">Sign up</Card.Title>

							{false && <Alert variant="danger">{false || "Unknown error"}</Alert>}

							<Form className="mb-3">
								<Form.Group controlId="email" className="mb-3">
									<Form.Label>Email</Form.Label>
									<Form.Control
										placeholder="snelhest2000@horsemail.com"
										type="email"
									/>
									{false && <p className="invalid">{"Invalid value"}</p>}
								</Form.Group>

								<Form.Group controlId="password" className="mb-3">
									<Form.Label>Password</Form.Label>
									<Form.Control
										type="password"
										autoComplete="new-password"
									/>
									{false && <p className="invalid">{"Invalid value"}</p>}
									<Form.Text>At least 6 characters</Form.Text>
								</Form.Group>

								<Form.Group controlId="confirmPassword" className="mb-3">
									<Form.Label>Confirm Password</Form.Label>
									<Form.Control
										type="password"
										autoComplete="off"
									/>
									{false && <p className="invalid">{"Invalid value"}</p>}
								</Form.Group>

								<Button
									disabled={false}
									type="submit"
									variant="primary"
								>
									{false
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
