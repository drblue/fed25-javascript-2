import Container from "react-bootstrap/Container";
import MemeGrid from "../components/MemeGrid";
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

			<MemeGrid />
		</Container>
	)
}

export default HomePage;
