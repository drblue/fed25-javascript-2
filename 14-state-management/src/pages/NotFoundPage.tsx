import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import imgSadKitten from "../assets/images/sad-kitten.gif";

const NotFoundPage = () => {
	return (
		<Container className="py-4">
			<h1>Sorry, that page could not be found 😔</h1>

			<Image src={imgSadKitten} alt="Sad kitten" fluid />
		</Container>
	)
}

export default NotFoundPage;
