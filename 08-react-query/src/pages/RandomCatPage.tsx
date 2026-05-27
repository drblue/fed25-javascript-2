import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Image from "react-bootstrap/Image";
import CatSpinner from "../components/spinners/CatSpinner";
import { CAT_BREEDS, getRandomCatImage } from "../services/TheCatAPI";

const RandomCatPage = () => {
	const [breed, setBreed] = useState("");  // ragd, sibe, beng, pers, norw, sphy
	const { data, error, isError, isFetching, isSuccess, refetch } = useQuery({
		queryKey: ["random-cat", { breed }],
		queryFn: () => getRandomCatImage(breed),
	});

	return (
		<>
			<h1>I ❤️ Random 🐈</h1>

			<p>A cat's behaviour is random, so here's a random cat for you! Such random, very catlike, much hairball.</p>

			{isError && <Alert variant="warning">{error.message}</Alert>}

			{isFetching && <CatSpinner />}

			<ButtonGroup className="d-flex justify-content-center mb-3">
				{CAT_BREEDS.map(cat_breed => (
					<Button
						key={cat_breed.id}
						onClick={() => setBreed(cat_breed.id)}
						variant={breed === cat_breed.id ? "success" : "secondary"}
					>{cat_breed.name}</Button>
				))}
			</ButtonGroup>

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
