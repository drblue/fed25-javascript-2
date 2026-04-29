import { useState } from "react";
import Counter from "./components/Counter";
import Salary from "./components/Salary";
import "./assets/scss/App.scss";

interface Post {
	id: number;
	title: string;
	likes: number;
}

function App() {
	const [msg, setMsg] = useState("Hi mom!");
	const [posts, setPosts] = useState<Post[]>([
		{ id: 1, title: "React Rocks 🎸", likes: 1337 },
		{ id: 2, title: "JSX Rocks Even Moar 🤘🏻", likes: 42 },
		{ id: 3, title: "Got State?", likes: 3 },
	]);
	const [showSalary, setShowSalary] = useState(false);
	const [inputPostTitle, setInputPostTitle] = useState("");

	const handleDeletePost = (postToDelete: Post) => {
		setPosts(posts.filter(post => post !== postToDelete));
	}

	const handleLikePost = (post: Post) => {
		// console.log("Post before adding like:", post);
		post.likes++;
		// console.log("Post after adding like:", post);
		setPosts([...posts]);  // create a new array and spread the contents of the old array in it
	}

	const handleFormSubmit = (e: React.SubmitEvent) => {
		// Stop form from being submitted
		e.preventDefault();

		// Create a new post
		const post: Post = {
			id: Math.max(0, ...posts.map(post => post.id)) + 1,
			title: inputPostTitle,
			likes: 0,
		}
		setPosts([...posts, post]);

		// Clear input field
		setInputPostTitle("");
	}

	console.log("App is rendering...");

	return (
		<div className="container py-3">
			<h1>01-react-basics</h1>

			<p>{msg}</p>

			<button onClick={ () => setMsg("Hi dad!") } className="btn btn-warning">Hi dad?</button>

			<hr />

			{/* Counter start */}
			<Counter />
			<Counter />
			{/* Counter end */}

			<hr />

			<button
				className={showSalary ? "btn btn-success mb-3" : "btn btn-danger mb-3"}
				onClick={() => setShowSalary(!showSalary)}
			>
				{showSalary ? "Hide salary" : "Show salary"}
			</button>

			{showSalary && <Salary />}

			<hr />

			<h2>Posts</h2>

			<form onSubmit={handleFormSubmit} className="mb-3">
				<div className="input-group">
					<input
						aria-label="Post title"
						className="form-control"
						onChange={(e) => setInputPostTitle(e.target.value)}
						placeholder="Fun with forms!"
						type="text"
						value={inputPostTitle}
						required
					/>

					<button
						className="btn btn-success"
						type="submit"
					>
						Create
					</button>
				</div>
			</form>

			{posts.length > 0 ? (
				<ul className="list-group">
					{posts.map(post =>
						<li key={post.id} className="list-group-item">
							{post.title} ({post.likes} likes)
							{" "}
							<button
								className="btn btn-success btn-sm"
								onClick={() => handleLikePost(post)}
							>❤️</button>
							<button
								className="btn btn-danger btn-sm ms-1"
								onClick={() => handleDeletePost(post)}
							>🗑️</button>
						</li>
					)}
				</ul>
			) : (
				<p>There are no posts.</p>
			)}
		</div>
	);
}

export default App;
