import { useEffect, useState } from "react";
import { getResource } from "./services/JSONPlaceholderAPI";
import type { Resource } from "./types/Resource";
import "./assets/scss/App.scss";
import ResourceList from "./components/ResourceList";

function App() {
	const [resource, setResource] = useState("");
	const [data, setData] = useState<Resource[] | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | false>(false);

	useEffect(() => {
		console.log("Side-effect triggered due to resource changing value to:", resource);

		const fetchData = async () => {
			// Bail if resource is empty
			if (!resource) {
				return;
			}

			// reset state
			setData(null);
			setError(false);
			setIsLoading(true);

			try {
				// make the actual request
				const body = await getResource(resource);

				setData(body);
			} catch (err) {
				setError(err instanceof Error ? err.message : "This should really never ever happen...")
			} finally {
				setIsLoading(false);
			}
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

			<ResourceList
				data={data}
				error={error}
				isLoading={isLoading}
				resource={resource}
			/>
		</div>
	);
}

export default App;
