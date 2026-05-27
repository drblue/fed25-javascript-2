import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import Pagination from "../components/Pagination";
import { searchByDate } from "../services/HackerNewsAPI";

const HackerNewsSearchPage = () => {
	const [inputSearch, setInputSearch] = useState("");
	const [page, setPage] = useState(0);
	const [query, setQuery] = useState<string>("");

	const { data: searchResult, error, isError, isFetching, isLoading } = useQuery({
		queryKey: ["search-hn", { page, query }],
		queryFn: () => searchByDate(query, page),
		enabled: !!query,  // Boolean(query)  converts query (string) to a boolean value
	});

	// 💇🏼‍♀️
	const trimmedInputSearch = inputSearch.trim();

	const handleSubmit = (e: React.SubmitEvent) => {
		e.preventDefault();

		// Prevent smol searches
		if (trimmedInputSearch.length < 3) {
			alert("Too short search query! Enter at least 3 characters to search for");
			return;
		}

		// Search Haxx0r News 🕵🏻‍♂️📰
		setPage(0);
		setQuery(inputSearch);
	}

	const handleReset = () => {
		setPage(0);
		setInputSearch("");
		setQuery("");
	}

	return (
		<>
			<title>Search Hacker News</title>
			<h1>🔎🔦👀</h1>

			<Form
				className="mb-4"
				onReset={handleReset}
				onSubmit={handleSubmit}
			>
				<Form.Group className="mb-3" controlId="searchQuery">
					<Form.Label>Search Query</Form.Label>
					<Form.Control
						onChange={(e) => setInputSearch(e.target.value)}
						placeholder="Enter your search query"
						type="text"
						value={inputSearch}
						autoFocus
						required
					/>
				</Form.Group>

				<div className="d-flex justify-content-end">
					<Button
						type="reset"
						variant="warning"
					>
						Clear
					</Button>
					<Button
						disabled={trimmedInputSearch.length < 2 || isFetching}
						type="submit"
						variant="success"
					>
						Search
					</Button>
				</div>
			</Form>

			{isError && <Alert variant="warning">{error.message}</Alert>}

			{isLoading && <p>🤔 Fetching stories...</p>}

			{searchResult && (
				<div id="search-result">
					<p>Showing {searchResult.nbHits} search results for <em>"{query}"</em>...</p>

					<ListGroup className="mb-3">
						{searchResult.hits.map((hit) => (
							<ListGroup.Item action href={hit.url} key={hit.objectID}>
								<h2 className="h3">{hit.title}</h2>
								<p className="text-muted small mb-0">{hit.points} points by {hit.author} at {hit.created_at}</p>
							</ListGroup.Item>
						))}
					</ListGroup>

					<Pagination
						hasNextPage={searchResult.page + 1 < searchResult.nbPages}
						hasPreviousPage={searchResult.page > 0}
						onNextPage={() => setPage(prevValue => prevValue + 1)}
						onPreviousPage={() => setPage(prevValue => prevValue - 1)}
						page={searchResult.page + 1}
						totalPages={searchResult.nbPages}
					/>
				</div>
			)}
		</>
	)
}

export default HackerNewsSearchPage;
