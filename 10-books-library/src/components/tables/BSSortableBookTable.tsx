import Table from "react-bootstrap/Table";
import { Link } from "react-router";
import type { Book } from "../../services/BooksAPI.types";
import { useMemo, useState } from "react";

interface BSSortableBookTableProps {
	books: Book[];
}

// type SortKeys = "title" | "pages" | "published";
type SortKeys = keyof Book;  // get a literal string union of all keys in Book type
type SortOrder = "asc" | "desc";

const BSSortableBookTable: React.FC<BSSortableBookTableProps> = ({ books }) => {
	const [sortKey, setSortKey] = useState<SortKeys | null>(null);
	const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

	const orderBy = (key: SortKeys) => {
		// 1. If we don't already sort by this key, sort by this key and set order to ascending

		// 2. If we already sort by this key and order is ascending, set order to descending

		// 3. Else remove all sorting and set order to ascending
	}

	const sortedData = useMemo(() => {
		if (!sortKey) {
			return books;
		}

		return [...books].sort((a, b) => {
			// Do the magic here 🪄🧙🏻
			// 4. Sort by sortKey
			// 5. Take into account the order (asc/desc)

			// Keep the current order
			return 0;
		});
	}, [books, sortKey, sortOrder]);

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
						<th onClick={() => orderBy("title")} className="sortable">Title</th>
						<th>Author</th>
						<th onClick={() => orderBy("pages")} className="sortable">Pages</th>
						<th onClick={() => orderBy("published")} className="sortable">Published</th>
					</tr>
				</thead>

				<tbody>
					{sortedData.map(book => (
						<tr key={book.id}>
							<td>{book.title}</td>
							<td>
								<Link to={"/authors/" + book.author.id}>{book.author.name}</Link>
							</td>
							<td className="text-end">{book.pages}</td>
							<td className="text-end">{book.published}</td>
						</tr>
					))}
				</tbody>
			</Table>
		</>
	)
}

export default BSSortableBookTable;
