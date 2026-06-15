import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { toast } from "react-toastify";

const HomePage = () => {
	return (
		<>
			<title>Welcome to Firebase Todos!</title>
			<h1>🚒 Welcome to Firebase Todos 🧯</h1>

			<div className="py-5">
				<picture className="d-flex justify-content-center mb-3">
					<source srcSet="https://fonts.gstatic.com/s/e/notoemoji/latest/1f525/512.webp" type="image/webp" />
					<img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f525/512.gif" alt="🔥" width="320" height="320" />
				</picture>

				{/* <p>Because when your life is on fire 🔥, you need a todo list.</p> */}
				<blockquote className="display-6 text-center">
					<p>Because when your life is on fire 🔥, you need a todo list.</p>
					<footer className="small text-muted text-end">
						{" "}
						— Lieutenant Les McBurney, Founder of Firebase Todos
					</footer>
				</blockquote>
			</div>

			<ButtonGroup>
				<Button variant="primary" onClick={() => toast("Wow 🤩! Such click 🐭, much toast 🍞, very celebrate 🥂!")}>Celebrate 🎉</Button>

				<Button variant="success" onClick={() => toast.success("Wow, such success, very influencer, much money! 💰", { icon: () => "🚀" })}>Click me 🤑</Button>

				<Button variant="warning" onClick={() => toast.warn("Wow, such WARNING, very ALERT!")}>Call da police 👮🏻</Button>

				<Button variant="danger" onClick={() => toast.error("Wow, such ERROR, very DANGEROUS!")}>Blow shit up 💣</Button>

				<Button variant="info" onClick={() => toast.info("LIKE && SUBSCRIBE")}>Fire that ship 🔥</Button>
			</ButtonGroup>
		</>
	)
}

export default HomePage;
