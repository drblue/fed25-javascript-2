import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import useGetRandomDogImage from "../hooks/useGetRandomDogImage";

const RandomDogPage = () => {
	const { data, error, isError, isLoading, refetch, setUrl } = useGetRandomDogImage("https://dog.ceo/api/breeds/image/random");

	return (
		<>
			<h1>A random doggo 🐶</h1>

			<div className="buttons mb-3">
				<Button
					onClick={() => setUrl("https://dog.ceo/api/breeds/image/random")}
				>Random doggo</Button>

				<Button
					onClick={() => setUrl("https://dog.ceo/api/breed/shiba/images/random")}
				>Random Shiba fluffer</Button>

				<Button
					onClick={() => refetch()}
					variant="success"
				>MOAR doggos 🐶❤️!!</Button>

				<Button
					onClick={() => setUrl("https://dog.ceo/api/breed/lolcat/images/random")}
					variant="danger"
				>Make things go 💣</Button>

				<Button
					onClick={() => setUrl("https://oidmr8pvyiodrtmviutmc.com")}
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
