import { flexRender, getCoreRowModel, useReactTable, type ColumnDef } from "@tanstack/react-table";
import Table from "react-bootstrap/Table";
import { Link } from "react-router";
import type { Book } from "../../services/BooksAPI.types";

interface TanStackBookTableProps {
	books: Book[];
}

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

const TanStackBookTable: React.FC<TanStackBookTableProps> = ({ books }) => {
	const table = useReactTable({
		columns,
		data: books,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<Table bordered responsive striped>
			<thead>
				{table.getHeaderGroups().map(headerGroup => (
					<tr key={headerGroup.id}>
						{headerGroup.headers.map(header => (
							<th key={header.id} colSpan={header.colSpan}>
								{header.isPlaceholder
									? null
									: flexRender(header.column.columnDef.header, header.getContext())
								}
							</th>
						))}
					</tr>
				))}
			</thead>

			<tbody>
				{table.getRowModel().rows.map(row => (
					<tr key={row.id}>
						{row.getVisibleCells().map(cell => (
							<td key={cell.id}>
								{flexRender(cell.column.columnDef.cell, cell.getContext())}
							</td>
						))}
					</tr>
				))}
			</tbody>
		</Table>
	)
}

export default TanStackBookTable;
