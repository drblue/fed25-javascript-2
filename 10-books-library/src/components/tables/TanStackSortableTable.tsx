import { flexRender, getCoreRowModel, getSortedRowModel, useReactTable, type ColumnDef, type SortDirection, type SortingState } from "@tanstack/react-table";
import { useState } from "react";
import Table from "react-bootstrap/Table";

interface TanStackSortableTableProps<T> {
	columns: ColumnDef<T>[];
	data: T[];
}

const sortingIndicators: Record<SortDirection, string> = {
	asc: "🙂",
	desc: "🙃",
}

const TanStackSortableTable = <T,>({ columns, data }: TanStackSortableTableProps<T>) => {
	const [sorting, setSorting] = useState<SortingState>([]);

	const table = useReactTable({
		columns,
		data,
		state: {
			sorting,
		},
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
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
									: <div
										className={header.column.getCanSort() ? "sortable": ""}
										onClick={header.column.getToggleSortingHandler()}
									>
										{flexRender(header.column.columnDef.header, header.getContext())}

										{/* Add sorting indicator */}
										{header.column.getIsSorted() && " " + sortingIndicators[header.column.getIsSorted() as SortDirection]}
									</div>
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

export default TanStackSortableTable;
