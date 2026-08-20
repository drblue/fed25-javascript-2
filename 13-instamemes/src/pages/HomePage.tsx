import Container from "react-bootstrap/Container";
import UploadMeme from "../components/UploadMeme";
import useAuth from "../hooks/useAuth";

const HomePage = () => {
	const { currentUser } = useAuth();

	return (
		<Container className="py-4">
			<title>😄 InstaMemes</title>
			<h1>Welcome to InstaMemes 😃!</h1>

			{currentUser && <UploadMeme />}

			<hr />

			<p>Here be memes...</p>
		</Container>
	)
}

export default HomePage;
