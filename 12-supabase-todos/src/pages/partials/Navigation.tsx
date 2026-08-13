import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, NavLink } from "react-router";
import useAuth from "../../hooks/useAuth";

const Navigation = () => {
	const { currentUser } = useAuth();

	return (
		<Navbar bg="dark" variant="dark" expand="sm">
			<Container>
				<Navbar.Brand as={Link} to="/">🛸 Supabase Todos</Navbar.Brand>

				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ms-auto">
						{currentUser ? (
							<>
								<Nav.Link as={NavLink} to="/todos" end>Todos</Nav.Link>

								<NavDropdown
									title={currentUser.email}
								>
									<NavDropdown.Item as={NavLink} to="/profile">Update profile</NavDropdown.Item>
									<NavDropdown.Divider />
									<NavDropdown.Item as={NavLink} end to="/logout">Logout</NavDropdown.Item>
								</NavDropdown>
							</>
						) : (
							<>
								<Nav.Link as={NavLink} to="/login">Log in</Nav.Link>
								<Nav.Link as={NavLink} to="/signup">Sign up</Nav.Link>
							</>
						)}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}

export default Navigation;
