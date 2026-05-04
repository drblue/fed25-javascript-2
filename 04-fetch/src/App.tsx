import { useEffect, useState } from "react";
import type { Resource } from "./types/Resource";
import "./assets/scss/App.scss";

function App() {
	const [resource, setResource] = useState("");
	const [data, setData] = useState<Resource[] | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		console.log("Side-effect triggered due to resource changing value to:", resource);

		// Bail if resource is empty
		if (!resource) {
			return;
		}

		const fetchData = async () => {
			// reset state
			setData(null);
			setIsLoading(true);

			console.log(`Fetching ${resource}...`);
			const res = await fetch("https://jsonplaceholder.typicode.com/" + resource);
			const body = await res.json();
			await new Promise(r => setTimeout(r, 2500));

			setData(body);
			setIsLoading(false);
		}
		fetchData();
	}, [resource]);

	console.log("App is rendering... Resource is:", resource);

	return (
		<div className="container py-2">
			<h1>Fetch</h1>

			<div className="buttons">
				<button onClick={() => setResource("albums")} className="btn btn-primary">Albums</button>
				<button onClick={() => setResource("photos")} className="btn btn-success">Photos</button>
				<button onClick={() => setResource("posts")} className="btn btn-warning">Posts</button>
				<button onClick={() => setResource("todos")} className="btn btn-danger">Todos</button>
				<button onClick={() => setResource("memes")} className="btn btn-info">Memes</button>
			</div>

			<hr />

			{isLoading && <p>Loading...</p>}

			{data && (
				<>
					<h2>{resource}</h2>
					<p>There are {data.length} {resource}.</p>

					<ol>
						{data.map(item => (
							<li key={item.id}>{item.title}</li>
						))}
					</ol>
				</>
			)}
		</div>
	);
}

export default App;
