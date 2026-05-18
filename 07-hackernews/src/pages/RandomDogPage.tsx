import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";
import useGetRandomDogImage from "../hooks/useGetRandomDogImage";

const RandomDogPage = () => {
	const { data, error, isLoading } = useGetRandomDogImage();

	return (
		<>
			<h1>A random doggo 🐶</h1>

			{error && <Alert variant="warning">{error}</Alert>}

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
