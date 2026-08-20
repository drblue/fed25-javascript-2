import Alert from "react-bootstrap/Alert";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import useMemes from "../hooks/useMemes";
import MemeCard from "./MemeCard";

const MemeGrid = () => {
	const { error, isLoading, memes } = useMemes();

	if (isLoading) {
		return <p>Loading memes...</p>
	}

	if (error) {
		return <Alert variant="danger">Could not fetch memes: {error.message}</Alert>
	}

	if (memes && memes.length === 0) {
		return <p>No memes have been uploaded 😢</p>
	}

	return memes && (
		<Row xs={1} sm={2} md={3} lg={4}>
			{memes.map(meme => (
				<Col className="d-flex mb-4" key={meme.id}>
					<MemeCard meme={meme} />
				</Col>
			))}
		</Row>
	)
}

export default MemeGrid;
