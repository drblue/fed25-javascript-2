import { useMemo, useState } from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router";
import type { Book } from "../../services/BooksAPI.types";
import { isNumber, isString } from "../../utils/typehelpers";

interface BSSortableBookTableProps {
	books: Book[];
}

type SortKeys = "title" | "pages" | "published";
// type SortKeys = keyof Book;  // get a literal string union of all keys in Book type
type SortOrder = "asc" | "desc";

const BSSortableBookTable: React.FC<BSSortableBookTableProps> = ({ books }) => {
	const [sortKey, setSortKey] = useState<SortKeys | null>(null);
	const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

	const orderBy = (key: SortKeys) => {
		// 1. If we don't already sort by this key, sort by this key and set order to ascending
		if (sortKey !== key) {
			setSortKey(key);
			setSortOrder("asc");
			return;
		}

		// 2. If we already sort by this key and order is ascending, set order to descending
		if (sortOrder === "asc") {
			setSortOrder("desc");
			return;
		}

		// 3. Otherwise remove all sorting and set order to ascending
		setSortKey(null);
		setSortOrder("asc");
	}

	const sortedData = useMemo(() => {
		if (!sortKey) {
			return books;
		}

		return [...books].sort((a, b) => {
			// Do the magic here 🪄🧙🏻
			const aValue = a[sortKey];
			const bValue = b[sortKey];

			// 4. Sort by sortKey
			// 5. Take into account the order (asc/desc)
			if (isString(aValue) && isString(bValue)) {
				return sortOrder === "asc"
					? aValue.localeCompare(bValue)
					: bValue.localeCompare(aValue);
			}

			if (isNumber(aValue) && isNumber(bValue)) {
				return sortOrder === "asc"
					? aValue - bValue
					: bValue - aValue;
			}

			// Keep the current order
			return 0;
		});
	}, [books, sortKey, sortOrder]);

	const sortIcon = (key: SortKeys) => {
		if (sortKey !== key) {
			return null;
		}

		return sortOrder === "asc"
			? <span role="img" aria-label="Ascending">⬇️</span>
			: <span role="img" aria-label="Descending">⬆️</span>
	}

	if (!books.length) {
		return <p>No books for you!</p>
	}

	return (
		<>
			<div className="mb-3">
				<code>
					sortKey: {sortKey ?? "null"}<br />
					sortOrder: {sortOrder}
				</code>
			</div>

			<Table bordered hover responsive striped>
				<thead>
					<tr>
						<th colSpan={3}>Book Info</th>
						<th colSpan={2}>Author Info</th>
					</tr>
					<tr>
						<th onClick={() => orderBy("title")} className="sortable">Title {sortIcon("title")}</th>
						<th onClick={() => orderBy("pages")} className="sortable">Pages {sortIcon("pages")}</th>
						<th onClick={() => orderBy("published")} className="sortable">Published {sortIcon("published")}</th>
						<th>Name</th>
						<th>Birthdate</th>
					</tr>
				</thead>

				<tbody>
					{sortedData.map(book => (
						<tr key={book.id}>
							<td>{book.title}</td>
							<td className="text-end">{book.pages}</td>
							<td className="text-end">{book.published}</td>
							<td>
								<Link to={"/authors/" + book.author.id}>{book.author.name}</Link>
							</td>
							<td>{book.author.date_of_birth}</td>
						</tr>
					))}
				</tbody>
			</Table>
		</>
	)
}

export default BSSortableBookTable;
