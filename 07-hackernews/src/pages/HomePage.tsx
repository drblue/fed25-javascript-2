import { Link } from "react-router";

const HomePage = () => {
	return (
		<>
			<title>Welcome to Hacker News 🕵🏻‍♂️🤓👀!</title>
			<h1>Welcome to Hacker News 🕵🏻‍♂️🤓👀!</h1>

			<Link className="btn btn-primary" to="/search">
				Use the Search, you must!
			</Link>
		</>
	)
}

export default HomePage;
