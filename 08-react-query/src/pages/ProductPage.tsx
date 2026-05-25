import { useQuery } from "@tanstack/react-query";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";
import { useParams } from "react-router";
import { getProduct } from "../services/BortakvallAPI";

const ProductPage = () => {
	const { id } = useParams();
	const productId = Number(id);
	const { data: product, error, isError, isLoading, isSuccess } = useQuery({
		queryKey: ["product", { id: productId }],
		queryFn: () => getProduct(productId),
	});

	if (isError) {
		return <Alert variant="danger">{error.message}</Alert>
	}

	if (isLoading) {
		return <p>Loading candy 🍬🍭🍫...</p>
	}

	return isSuccess && (
		<>
			<title>{product.name}</title>
			<h1 title={"#" + product.id}>{product.name}</h1>

			<Image src={"https://www.bortakvall.se" + product.images.large} className="w-50" fluid />

			<p>{product.description}</p>
			<p><strong>Pris:</strong> {product.price} kr</p>
		</>
	)
}

export default ProductPage;
