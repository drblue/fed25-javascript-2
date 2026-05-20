import { useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import useGetRandomDogImage from "../hooks/useGetRandomDogImage";

const RandomDogPage = () => {
	const [breed, setBreed] = useState<string | null>(null);
	const { data, error, isError, isLoading, refetch } = useGetRandomDogImage(breed);

	return (
		<>
			<h1>A random doggo 🐶</h1>

			<div className="buttons mb-3">
				<Button
					onClick={() => setBreed("random")}
				>Random doggo</Button>

				<Button
					onClick={() => setBreed("boxer")}
				>Random Boxer fluffer</Button>

				<Button
					onClick={() => setBreed("shiba")}
				>Random Shiba fluffer</Button>

				<Button
					onClick={() => refetch()}
					variant="success"
				>MOAR doggos 🐶❤️!!</Button>

				<Button
					onClick={() => setBreed("lolcat")}
					variant="danger"
				>Make things go 💣</Button>

				<Button
					onClick={() => setBreed("https://oidmr8pvyiodrtmviutmc.com")}
					variant="danger"
				>Break more stuff 🧨</Button>
			</div>

			{isError && <Alert variant="warning">{error!.message}</Alert>}

			{isLoading && <p>Fetching doggo 🐶...</p>}

			{data && data.status === "success" && (
				<div>
					<Image src={data.message} alt="A random doggo" fluid />
				</div>
			)}
		</>
	)
}

export default RandomDogPage;
