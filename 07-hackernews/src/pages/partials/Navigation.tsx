import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, NavLink } from "react-router";
import useTheme from "../../hooks/useTheme";

const Navigation = () => {
	const { isDarkMode, toggleTheme } = useTheme();

	return (
		<Navbar bg="dark" variant="dark" expand="sm">
			<Container>
				<Navbar.Brand as={Link} to="/">🕵🏻‍♂️ Hacker News</Navbar.Brand>

				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ms-auto">
						<Nav.Link as={NavLink} end to="/random-dog">🐶 Random doggo</Nav.Link>
						<Nav.Link as={NavLink} end to="/search">Search</Nav.Link>
					</Nav>

					<Button onClick={toggleTheme} variant="outline-secondary">
						{isDarkMode ? "☀️" : "🌙"}
					</Button>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}

export default Navigation;
