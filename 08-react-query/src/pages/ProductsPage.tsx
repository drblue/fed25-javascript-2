import { useQuery } from "@tanstack/react-query";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { getProducts } from "../services/BortakvallAPI";

const ProductsPage = () => {
	const { data: products, error, isError, isLoading, isSuccess } = useQuery({
		queryKey: ["products"],
		queryFn: getProducts,
	});

	return (
		<>
			<title>Products</title>
			<h1>Products</h1>

			<p>Cotton candy wafer fruitcake bonbon bonbon. Lollipop cupcake cotton candy pastry sesame snaps. Fruitcake danish fruitcake topping gummies ice cream cheesecake cheesecake lemon drops.</p>

			{isError && <Alert variant="danger">{error.message}</Alert>}

			{isLoading && <p>Loading candy 🍬🍭🍫...</p>}

			{isSuccess && <Row xs={1} sm={2} md={3} lg={4} className="g-4">
				{products.map(product => (
					<Col key={product.id}>
						<Card>
							<Card.Img variant="top" src={"https://www.bortakvall.se" + product.images.thumbnail} />
							<Card.Body>
								<Card.Title>{product.name}</Card.Title>
								<Card.Text>
									{product.price} kr
								</Card.Text>
								<Button variant="primary">Go to product</Button>
							</Card.Body>
						</Card>
					</Col>
				))}
			</Row>}
		</>
	)
}

export default ProductsPage;
