import { useMemo, useState } from "react";
import Table from "react-bootstrap/Table";
import type { Author } from "../../services/BooksAPI.types";

interface BSSortableAuthorTableProps {
	authors: Author[];
}

// type SortKeys = "title" | "pages" | "published";
type SortKeys = keyof Author;  // get a literal string union of all keys in Author type
type SortOrder = "asc" | "desc";

const BSSortableAuthorTable: React.FC<BSSortableAuthorTableProps> = ({ authors }) => {
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
			return authors;
		}

		return [...authors].sort((a, b) => {
			// Do the magic here 🪄🧙🏻
			const aValue = a[sortKey];
			const bValue = b[sortKey];

			// 4. Sort by sortKey
			// 5. Take into account the order (asc/desc)
			if (typeof aValue === "string" && typeof bValue === "string") {
				return sortOrder === "asc"
					? aValue.localeCompare(bValue)
					: bValue.localeCompare(aValue);
			}

			if (typeof aValue === "number" && typeof bValue === "number") {
				return sortOrder === "asc"
					? aValue - bValue
					: bValue - aValue;
			}

			// Keep the current order
			return 0;
		});
	}, [authors, sortKey, sortOrder]);

	const sortIcon = (key: SortKeys) => {
		if (sortKey !== key) {
			return null;
		}

		return sortOrder === "asc"
			? <span role="img" aria-label="Ascending">⬇️</span>
			: <span role="img" aria-label="Descending">⬆️</span>
	}

	if (!authors.length) {
		return <p>No authors for you!</p>
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
						<th onClick={() => orderBy("name")} className="sortable">Name {sortIcon("name")}</th>
						<th onClick={() => orderBy("date_of_birth")} className="sortable">Date of Birth {sortIcon("date_of_birth")}</th>
					</tr>
				</thead>

				<tbody>
					{sortedData.map(author => (
						<tr key={author.id}>
							<td>{author.name}</td>
							<td className="text-end">{author.date_of_birth}</td>
						</tr>
					))}
				</tbody>
			</Table>
		</>
	)
}

export default BSSortableAuthorTable;
