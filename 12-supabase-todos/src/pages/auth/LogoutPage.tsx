import { useEffect } from "react";
import { useNavigate } from "react-router";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import useAuth from "../../hooks/useAuth";

const LogoutPage = () => {
	const { logout } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		const logoutUser = async () => {
			await logout();
			await new Promise(r => setTimeout(r, 1500));  // fake delay to show our nice message
			navigate("/");
		}
		logoutUser();
	}, []);

	return (
		<Container className="py-4 center-y">
			<Row>
				<Col md={{ span: 6, offset: 3 }}>
					<Card className="mb-3">
						<Card.Body>
							<Card.Title className="mb-3">Log out</Card.Title>

							<Card.Text>Please wait while you're being logged out...</Card.Text>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	)
}

export default LogoutPage;
