import { flexRender, getCoreRowModel, useReactTable, type ColumnDef } from "@tanstack/react-table";
import Table from "react-bootstrap/Table";
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
			},
			{
				header: "Published",
				accessorKey: "published",
			},
		],
	},
	{
		header: "Author Info",
		columns: [
			{
				header: "Name",
				accessorKey: "author.name",
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
