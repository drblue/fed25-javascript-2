import type { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router";
import WarningAlert from "../components/alerts/WarningAlert";
import TanStackBasicTable from "../components/tables/TanStackBasicTable";
import useBooks from "../hooks/useBooks";
import type { Book } from "../services/BooksAPI.types";

const columns: ColumnDef<Book>[] = [
	{
		header: "Book Info",
		columns: [
			{
				header: "Title",
				accessorKey: "title",  // {book.title}
			},
			{
				header: "Pages",
				accessorKey: "pages",  // {book.pages}
				cell: ({ getValue }) => (
					<span className="d-block text-end">{getValue()}</span>
				),
			},
			{
				header: "Published",
				accessorKey: "published",
				cell: ({ getValue }) => (
					<span className="d-block text-end">{getValue()}</span>
				),
			},
		],
	},
	{
		header: "Author Info",
		columns: [
			{
				header: "Name",
				accessorKey: "author.name",
				cell: ({ getValue, row }) => (
					<Link to={"/authors/" + row.original.author.id}>
						{getValue()}
					</Link>
				),
			},
			{
				header: "Birthdate",
				accessorKey: "author.date_of_birth",
			},
		],
	},
];

const BooksPage = () => {
	const { data: books, isError, isLoading } = useBooks();

	return (
		<>
			<title>Books</title>
			<h1 className="mb-3">Books</h1>

			{isError && (
				<WarningAlert>
					An terrible, inexplicable error occurred while fetching books. It wasn't me!
				</WarningAlert>
			)}

			{isLoading && <p>Loading books...</p>}

			{books && <TanStackBasicTable columns={columns} data={books} />}
		</>
	);
};

export default BooksPage;
