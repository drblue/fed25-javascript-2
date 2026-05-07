import { Link } from "react-router";

const HomePage = () => {
	return (
		<>
			<title>Better Todos</title>
			<h1>Welcome to Better Todos!</h1>

			<p>Because when your life is on fire 🔥, you need a <Link to="/todos">todo list</Link>.</p>
		</>
	)
}

export default HomePage;
