import { flexRender, getCoreRowModel, useReactTable, type ColumnDef } from "@tanstack/react-table";
import Table from "react-bootstrap/Table";

interface TanStackSortableTableProps<T> {
	columns: ColumnDef<T>[];
	data: T[];
}

const TanStackSortableTable = <T,>({ columns, data }: TanStackSortableTableProps<T>) => {
	const table = useReactTable({
		columns,
		data,
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

export default TanStackSortableTable;
