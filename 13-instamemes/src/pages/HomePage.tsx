import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import imgBarney from "../assets/images/barney-stinson.jpg";

const HomePage = () => {
	return (
		<Container className="py-4">
			<title>😄 InstaMemes</title>
			<h1>Welcome to InstaMemes 😃!</h1>

			<Image
				src={imgBarney}
				fluid
				alt="When I get sad I stop being sad and be awesome instead"
			/>
		</Container>
	)
}

export default HomePage;
