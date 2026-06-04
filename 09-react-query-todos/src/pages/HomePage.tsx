import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { Link } from "react-router";
import { toast } from "react-toastify";

const HomePage = () => {
	return (
		<>
			<title>Better Todos</title>
			<h1>Welcome to Better Todos!</h1>

			<p>Because when your life is on fire 🔥, you need a <Link to="/todos">todo list</Link>.</p>

			<ButtonGroup>
				<Button variant="primary" onClick={() => toast("Wow 🤩! Such click 🐭, much toast 🍞, very celebrate 🥂!")}>Celebrate 🎉</Button>
			</ButtonGroup>
		</>
	)
}

export default HomePage;
