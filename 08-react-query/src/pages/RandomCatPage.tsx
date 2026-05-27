import { useQuery } from "@tanstack/react-query";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import { getRandomCatImage } from "../services/TheCatAPI";

const RandomCatPage = () => {
	const { data, error, isError, isFetching, isSuccess, refetch } = useQuery({
		queryKey: ["random-cat"],
		queryFn: getRandomCatImage,
	});

	return (
		<>
			<h1>I ❤️ Random 🐈</h1>

			<p>A cat's behaviour is random, so here's a random cat for you! Such random, very catlike, much hairball.</p>

			{isError && <Alert variant="warning">{error.message}</Alert>}

			<div className="d-flex justify-content-center mb-3">
				<Button
					disabled={isFetching}
					onClick={() => refetch({ throwOnError: true })}
				>MJAU CATS!!</Button>
			</div>

			{isSuccess && (
				<div className="d-flex justify-content-center">
					<Image src={data.url} fluid />
				</div>
			)}
		</>
	)
}

export default RandomCatPage;
