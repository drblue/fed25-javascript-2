import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import { useSearchParams } from "react-router";
import Pagination from "../components/Pagination";
import { searchByDate } from "../services/HackerNewsAPI";
import { numberFormat } from "../utils/numberFormatter";
import HN_SearchResultItem from "../components/HN_SearchResultItem";

const HackerNewsSearchPage = () => {
	const [inputSearch, setInputSearch] = useState("");
	const [page, setPage] = useState(0);
	const [searchParams, setSearchParams] = useSearchParams();

	// get `query` from search params
	const query = searchParams.get("query") ?? "";

	const { data: searchResult, error, isError, isFetching, isLoading, isPlaceholderData } = useQuery({
		queryKey: ["search-hn", { page, query }],
		queryFn: () => searchByDate(query, page),
		enabled: !!query,  // Boolean(query)  converts query (string) to a boolean value
		placeholderData: keepPreviousData,
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
		setSearchParams({ query: trimmedInputSearch });  // search-hn?query=tesla
	}

	const handleReset = () => {
		setPage(0);
		setInputSearch("");
		setSearchParams();  // remove all search-params from url
	}

	// update search field with current query from URLSearchParams
	useEffect(() => {
		(() => {
			setInputSearch(query);
		})();
	}, [query]);

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
					<p>Showing {numberFormat(searchResult.nbHits)} search results for <em>"{query}"</em>...</p>

					<ListGroup className="mb-3">
						{searchResult.hits.map((hit) => (
							<HN_SearchResultItem key={hit.objectID} item={hit} />
						))}
					</ListGroup>

					<Pagination
						hasNextPage={!isPlaceholderData && searchResult.page + 1 < searchResult.nbPages}
						hasPreviousPage={!isPlaceholderData && searchResult.page > 0}
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
