import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const products = [{}, {}, {}, {}, {}, {}];

const ProductsPage = () => {
	return (
		<>
			<title>Products</title>
			<h1>Products</h1>

			<p>Cotton candy wafer fruitcake bonbon bonbon. Lollipop cupcake cotton candy pastry sesame snaps. Fruitcake danish fruitcake topping gummies ice cream cheesecake cheesecake lemon drops.</p>

			<Row>
				{products.map((_product, index) => (
					<Col sm={6} md={4} lg={3} key={index} className="mb-4">
						<Card>
							<Card.Img variant="top" src="https://placehold.co/300x300" />
							<Card.Body>
								<Card.Title>Card Title</Card.Title>
								<Card.Text>
									Some quick example text to build on the card title and make up the
									bulk of the card's content.
								</Card.Text>
								<Button variant="primary">Go somewhere</Button>
							</Card.Body>
						</Card>
					</Col>
				))}
			</Row>
		</>
	)
}

export default ProductsPage;
