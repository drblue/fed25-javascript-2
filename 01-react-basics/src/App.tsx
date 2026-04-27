import { useState } from "react";
import "./assets/scss/App.scss";

interface Post {
	id: number;
	title: string;
	likes: number;
}

function App() {
	const [counter, setCounter] = useState(0);
	const [msg, setMsg] = useState("Hi mom!");
	const [posts, setPosts] = useState<Post[]>([
		{ id: 1, title: "React Rocks 🎸", likes: 1337 },
		{ id: 2, title: "JSX Rocks Even Moar 🤘🏻", likes: 42 },
		{ id: 3, title: "Got State?", likes: 3 },
	]);

	const handleBtnClick = () => {
		console.log("Counter before update:", counter);
		setCounter(counter + 1);
		console.log("Counter after update:", counter);
	}

	console.log("App is being rendered, counter is:", counter);

	return (
		<div className="container">
			<h1>01-react-basics</h1>

			<p>{msg}</p>

			<button onClick={ () => setMsg("Hi dad!") } className="btn btn-warning">Hi dad?</button>

			<hr />

			<p>Counter: {counter}</p>

			<button onClick={handleBtnClick} className="btn btn-primary">Click me!</button>

			<hr />

			<h2>Posts</h2>

			<ul>
				{posts.map(post =>
					<li key={post.id}>
						{post.title} ({post.likes} likes)
					</li>
				)}
			</ul>
		</div>
	);
}

export default App;
