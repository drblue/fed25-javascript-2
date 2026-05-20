import { useEffect, useRef, useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import { useSearchParams } from "react-router";
import Pagination from "../components/Pagination";
import type { HN_SearchResponse } from "../services/HackerNewsAPI.types";
import { searchByDate } from "../services/HackerNewsAPI";

const SearchPage = () => {
	const [error, setError] = useState<string | false>(false);
	const [isLoading, setIsLoading] = useState(false);
	const [inputSearch, setInputSearch] = useState("");
	const [page, setPage] = useState(0);
	const [searchResult, setSearchResult] = useState<HN_SearchResponse | null>(null);
	const inputSearchRef = useRef<HTMLInputElement>(null);
	const [searchParams, setSearchParams] = useSearchParams();

	// get `query=` from URL
	const searchParamsQuery = searchParams.get("query");  // search?query=tesla
	console.log("searchParamsQuery:", searchParamsQuery);

	// 💇🏼‍♀️
	const trimmedInputSearch = inputSearch.trim();

	const searchHackerNews = async (searchQuery: string, searchPage: number) => {
		// reset state + set loading to true
		setError(false);
		setIsLoading(true);
		setSearchResult(null);

		try {
			console.log(`Searching for "${searchQuery}" and page ${searchPage}`);
			const data = await searchByDate(searchQuery, searchPage);
			setSearchResult(data);

		} catch (err: unknown) {
			console.error(`Error thrown when searching for "${searchQuery}":`, err);
			setError(err instanceof Error
				? err.message
				: "Aouch, stop throwing things that are not Errors at me"
			);

		} finally {
			setIsLoading(false);
		}
	}

	const handleSubmit = (e: React.SubmitEvent) => {
		e.preventDefault();

		// Prevent smol searches
		if (trimmedInputSearch.length < 2) {
			alert("Too short search query! Enter at least 3 characters to search for");
			return;
		}

		// Search Haxx0r News 🕵🏻‍♂️📰
		setSearchParams({ query: trimmedInputSearch });
		setPage(0);
	}

	// Trigger a new search when the searchParamsQuery or page-state changes
	useEffect(() => {
		if (!searchParamsQuery) {
			// eslint-disable-next-line react-hooks/set-state-in-effect
			setSearchResult(null);
			return;
		}

		setInputSearch(searchParamsQuery);
		searchHackerNews(searchParamsQuery, page);
	}, [searchParamsQuery, page]);

	useEffect(() => {
		if (!inputSearchRef.current) {
			return;
		}

		// 👀
		inputSearchRef.current.focus();
	}, []);

	return (
		<>
			<title>Search Hacker News</title>
			<h1>🔎🔦👀</h1>

			<Form className="mb-4" onSubmit={handleSubmit}>
				<Form.Group className="mb-3" controlId="searchQuery">
					<Form.Label>Search Query</Form.Label>
					<Form.Control
						onChange={(e) => setInputSearch(e.target.value)}
						placeholder="Enter your search query"
						ref={inputSearchRef}
						type="text"
						value={inputSearch}
						required
					/>
				</Form.Group>

				<div className="d-flex justify-content-end">
					<Button
						disabled={inputSearch.trim().length < 2}
						type="submit"
						variant="success"
					>
						Search
					</Button>
				</div>
			</Form>

			{error && <Alert variant="warning">{error}</Alert>}

			{isLoading && <p>🤔 Loading...</p>}

			{searchResult && (
				<div id="search-result">
					<p>Showing {searchResult.nbHits} search results for <em>"{searchParamsQuery}"</em>...</p>

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
	);
};

export default SearchPage;
