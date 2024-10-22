"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  SortingState,
  VisibilityState,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
} from "@tanstack/react-table"
import * as React from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { ChevronDown, ArrowUpDown } from "lucide-react"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  filter: string;
  sort: string;
}

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTranslations } from "next-intl"

export function DataTable<TData, TValue>({
  columns,
  data,
  filter,
  sort,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  })
console.log(filter);
const t = useTranslations("table")
console.log(sort);
  return (
      <><div className="flex items-center py-4">
       <Input
      placeholder={`Filter ${filter}s...`}
      value={(table.getColumn(filter)?.getFilterValue() as string) ?? ""}
      onChange={(event) => table.getColumn(filter)?.setFilterValue(event.target.value)}
      className="max-w-sm"
    />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
            {t("Columns")} <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter(
                (column) => column.getCanHide()
              )
              .map((column) => {
                const isHeaderFunction = typeof column.columnDef.header === 'function';
                const displayName = isHeaderFunction ? sort : (column.columnDef.header || sort);
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                     {t(displayName)}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
    </div><div className="rounded-md border">
        <Table>
          <TableHeader className="bg-gray-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                    const isHeaderFunction = typeof header.column.columnDef.header === 'function';
                    const displayName = isHeaderFunction ? sort : (header.column.columnDef.header || sort);
                  return (
                    <TableHead className={`px-6 py-3 ${header.column.id === "user_count" || header.column.id === "Action" || header.column.id === "progress" || header.column.id === "turnover_percentage" || header.column.id ==="Details"? "text-center" : "text-left"}`} key={header.id}>
          {header.isPlaceholder
            ? null
            : flexRender(
                // t(header.column.columnDef.header as string),
                [t(displayName)],
                header.getContext()
              )}
        </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                className="border-b hover:bg-gray-50"
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
          <TableCell
            className={`px-6 py-4 font-medium whitespace-nowrap ${cell.column.id === 'user_count'|| cell.column.id === "progress" || cell.column.id === "Action" || cell.column.id === "turnover_percentage" || cell.column.id === "Details" ? 'text-center' : 'text-left'}`}
            key={cell.id}
          >
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </TableCell>
        ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  {t("No results")}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div></>
  )
}