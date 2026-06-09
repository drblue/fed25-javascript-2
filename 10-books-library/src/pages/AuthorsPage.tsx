import { createColumnHelper } from "@tanstack/react-table";
import WarningAlert from "../components/alerts/WarningAlert";
import TanStackSortableTable from "../components/tables/TanStackSortableTable";
import useAuthors from "../hooks/useAuthors";
import type { Author } from "../services/BooksAPI.types";
import { Link } from "react-router";

const columnHelper = createColumnHelper<Author>();

const columns = [
	columnHelper.group({
		id: "id-group",
		// header: "ID",
		columns: [
			columnHelper.accessor("id", {
				header: "ID",
			}),
		],
	}),

	columnHelper.group({
		header: "Author Details",
		columns: [
			columnHelper.accessor("name", {
				header: "Name",
				// cell: ({ getValue, row }) => (
				// 	<Link to={"/authors/" + row.original.id}>
				// 		{getValue()}
				// 	</Link>
				// ),
			}),
			columnHelper.accessor("date_of_birth", {
				header: "Birthdate",
			}),
		],
	}),

	columnHelper.group({
		id: "actions-group",
		columns: [
			columnHelper.display({
				header: "Actions",
				cell: ({ row }) => (
					<div className="d-flex gap-1">
						<Link
							className="btn btn-primary btn-sm"
							to={"/authors/" + row.original.id}
						>View</Link>
					</div>
				),
			}),
		],
	}),
];

const AuthorsPage = () => {
	const { data: authors, isError, isLoading } = useAuthors();

	return (
		<>
			<title>Authors</title>
			<h1 className="mb-3">Authors</h1>

			{isError && (
				<WarningAlert>
					An terrible, inexplicable error occurred while fetching authors. It wasn't me!
				</WarningAlert>
			)}

			{isLoading && <p>Loading authors...</p>}

			{authors && <TanStackSortableTable columns={columns} data={authors} />}
		</>
	);
};

export default AuthorsPage;
