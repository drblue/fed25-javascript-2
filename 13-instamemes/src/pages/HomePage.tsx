import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import MemeCard from "../components/MemeCard";
import UploadMeme from "../components/UploadMeme";
import useAuth from "../hooks/useAuth";
import useMemes from "../hooks/useMemes";

const HomePage = () => {
	const { currentUser } = useAuth();
	const { error, getMemes, isLoading, memes } = useMemes();

	const handleOnUploadSuccess = async () => {
		console.log("Child says great success on upload of lol!");

		// Refetch dem memes
		await getMemes();
	}

	return (
		<Container className="py-4">
			<title>😄 InstaMemes</title>
			<h1>Welcome to InstaMemes 😃!</h1>

			{currentUser && <UploadMeme onUploadSuccess={handleOnUploadSuccess} />}

			<hr />

			<div className="d-flex justify-content-end mb-3">
				<Button onClick={getMemes} size="sm">Refresh</Button>
			</div>

			{isLoading && <p>Loading memes...</p>}
			{error && <Alert variant="danger">Could not fetch memes: {error.message}</Alert>}

			{!isLoading && !error && memes && memes.length === 0 && <p>No memes have been uploaded 😢</p>}

			{memes && (
				<Row xs={1} sm={2} md={3} lg={4}>
					{memes.map(meme => (
						<Col className="d-flex mb-4" key={meme.id}>
							<MemeCard meme={meme} />
						</Col>
					))}
				</Row>
			)}
		</Container>
	)
}

export default HomePage;
