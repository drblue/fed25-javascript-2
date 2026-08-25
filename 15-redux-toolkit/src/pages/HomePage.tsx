import Container from "react-bootstrap/Container";

const HomePage = () => {
	return (
		<Container className="py-3">
			<title>Welcome to my toolkit</title>
			<h1>Welcome!</h1>
			<h2>To my humble abrode</h2>

			<p>Please sign the guestbook and leave a comment. We'd love to hear from you!</p>

			{/* Visitor Counter, retro geo-cities style */}
			<div className="text-center my-5">
				<p className="h3">Visitor Counter</p>
				<div className="visitor-counter">
					<code className="display-4">1</code>
					<code className="display-4">3</code>
					<code className="display-4">3</code>
					<code className="display-4">7</code>
				</div>
			</div>
		</Container>
	)
}

export default HomePage;
