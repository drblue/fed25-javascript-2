import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, NavLink } from "react-router";
import useAuth from "../../hooks/useAuth";
import { getProfileMetadata } from "../../lib/profile";

const Navigation = () => {
	const { currentUser } = useAuth();
	const { display_name, photo_url } = getProfileMetadata(currentUser);

	return (
		<Navbar bg="dark" variant="dark" expand="sm">
			<Container>
				<Navbar.Brand as={Link} to="/">😄 InstaMemes</Navbar.Brand>

				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ms-auto align-items-center">
						{currentUser ? (
							<>
								<Nav.Link as={NavLink} to="/" end>Home</Nav.Link>

								<NavDropdown
									title={photo_url ? (
										<Image
											alt="Photo of user (probably)"
											className="object-fit-cover"
											height={32}
											src={photo_url}
											width={32}
											roundedCircle
										/>
									) : display_name || currentUser.email}
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
