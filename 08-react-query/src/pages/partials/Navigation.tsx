import { useQuery } from "@tanstack/react-query";
import Badge from "react-bootstrap/Badge";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, NavLink } from "react-router";
import { getProducts } from "../../services/BortakvallAPI";

const Navigation = () => {
	const { data: products, isSuccess } = useQuery({
		queryKey: ["products"],
		queryFn: getProducts,
	});

	return (
		<Navbar bg="dark" variant="dark" expand="sm">
			<Container>
				<Navbar.Brand as={Link} to="/">🙋 React Query</Navbar.Brand>

				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ms-auto">
						<Nav.Link as={NavLink} end to="/products">
							🍬 Products
							{" "}
							<Badge bg="success" pill>
								{isSuccess ? products.length : "-"}
							</Badge>
						</Nav.Link>
						<Nav.Link as={NavLink} end to="/random-cat">🐱 Random Cat</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}

export default Navigation;
