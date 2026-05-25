import { useQuery } from "@tanstack/react-query";
import Alert from "react-bootstrap/Alert";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Link } from "react-router";
import { getProducts } from "../services/BortakvallAPI";
import LoadingSpinner from "../components/spinners/LoadingSpinner";

const ProductsPage = () => {
	const {
		data: products,
		error,
		isError,
		isFetching,
		isLoading,
		isSuccess,
	} = useQuery({
		queryKey: ["products"],
		queryFn: getProducts,
	});

	return (
		<>
			<title>Products</title>
			<h1>Products</h1>

			{/*
			<pre className="bg-light py-2 px-3">
				isError: {String(isError)}<br />
				isFetching: {String(isFetching)}<br />
				isLoading: {String(isLoading)}<br />
				isPending: {String(isPending)}<br />
				isRefetching: {String(isRefetching)}<br />
				isStale: {String(isStale)}<br />
				isSuccess: {String(isSuccess)}<br />
				status: {String(status)}
			</pre>
			*/}

			<p>Cotton candy wafer fruitcake bonbon bonbon. Lollipop cupcake cotton candy pastry sesame snaps. Fruitcake danish fruitcake topping gummies ice cream cheesecake cheesecake lemon drops.</p>

			{isError && <Alert variant="danger">{error.message}</Alert>}

			{isFetching && <LoadingSpinner />}

			{isLoading && <p>Loading candy 🍬🍭🍫...</p>}

			{isSuccess && <Row xs={1} sm={2} md={3} lg={4} className="g-4">
				{products.map(product => (
					<Col key={product.id}>
						<Card>
							<Link to={"/products/" + product.id}>
								<Card.Img variant="top" src={"https://www.bortakvall.se" + product.images.thumbnail} />
							</Link>
							<Card.Body>
								<Card.Title>{product.name}</Card.Title>
								<Card.Text>
									{product.price} kr
								</Card.Text>
								<Link
									className="btn btn-primary"
									to={"/products/" + product.id}
								>Go to product</Link>
							</Card.Body>
						</Card>
					</Col>
				))}
			</Row>}
		</>
	)
}

export default ProductsPage;
