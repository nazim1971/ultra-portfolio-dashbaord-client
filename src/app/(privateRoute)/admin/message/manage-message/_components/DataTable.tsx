/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ChevronDown,
  MoreHorizontal,
  Mail,
  Eye,
  EyeOff,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";
import {
  deleteMessage,
  editMessage,
  getSingleMessageDetails,
} from "../_actions";
import { Switch } from "@/components/ui/switch";
import { DeleteConfirmationModal } from "./DeleteModel";
import { MessageDetailsModal } from "./MessageDetailsModel";

interface DataTableProps {
  messages: {
    _id: string;
    name: string;
    email: string;
    subject: string;
    viewed: boolean;
    createdAt: string;
  }[];
}

export function DataTable({ messages }: DataTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(
    null
  );
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const router = useRouter();

  const [selectedMessage, setSelectedMessage] = useState<any>(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);

  const handleDeleteClick = (messageId: string) => {
    setSelectedMessageId(messageId);
    setOpenDeleteModal(true);
  };

  const handleToggleViewed = async (
    messageId: string,
    currentStatus: boolean
  ) => {
    try {
      await editMessage(messageId, { viewed: !currentStatus });
      toast.success("Message status updated");
      router.refresh();
    } catch (err: any) {
      toast.error(err.message || "Failed to update message");
    }
  };

  const handleConfirmDelete = async () => {
    if (!selectedMessageId) return;
    try {
      await deleteMessage(selectedMessageId);
      toast.success("Message deleted successfully");
      setOpenDeleteModal(false);
      router.refresh();
    } catch (err: any) {
      toast.error(err.message || "Failed to delete message");
      setOpenDeleteModal(false);
    }
  };
  // Add this function to fetch message details
  const handleViewDetails = async (messageId: string) => {
   
    try {
      const message = await getSingleMessageDetails(messageId);
      setSelectedMessage(message.data);
     
      setViewModalOpen(true);
    } catch (err: any) {
      toast.error(err.message || "Failed to fetch message details");
    }
  };

  const columns: ColumnDef<any>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "_id",
      header: "ID",
      cell: ({ row }) => {
        const id = row.getValue("_id") as string;
        return (
          <div className="font-mono text-xs max-w-[100px] truncate" title={id}>
            {id}
          </div>
        );
      },
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => {
        const name = row.getValue("name") as string;
        return (
          <div className="font-medium" title={name}>
            {name}
          </div>
        );
      },
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => {
        const email = row.getValue("email") as string;
        return (
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            <span className="truncate max-w-[180px]" title={email}>
              {email}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "subject",
      header: "Subject",
      cell: ({ row }) => {
        const subject = row.getValue("subject") as string;
        const shortSubject = subject.split(" ").slice(0, 2).join(" ");
        return (
          <div className="max-w-[200px] truncate" title={subject}>
            {shortSubject}
          </div>
        );
      },
    },
    {
      accessorKey: "viewed",
      header: "Status",
      cell: ({ row }) => {
        const isViewed = row.getValue("viewed") as boolean;
        return (
          <div className="flex items-center gap-2">
            <Switch
              checked={isViewed}
              onCheckedChange={() =>
                handleToggleViewed(row.original._id, isViewed)
              }
            />
            <span className="flex items-center">
              {isViewed ? (
                <Eye className="h-4 w-4 mr-1" />
              ) : (
                <EyeOff className="h-4 w-4 mr-1" />
              )}
              {isViewed ? "Viewed" : "New"}
            </span>
          </div>
        );
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const message = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => {
                  navigator.clipboard.writeText(message._id);
                  toast.success("Message ID copied to clipboard");
                }}
              >
                Copy ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleViewDetails(message._id)}>
                <span className="flex items-center">
                  <Eye className="mr-2 h-4 w-4" />
                  View Details
                </span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => handleDeleteClick(message._id)}
                className="text-red-600"
              >
                <span className="flex items-center">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data: messages,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-4">
        <Input
          placeholder="Filter by name..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No messages found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
      <DeleteConfirmationModal
        open={openDeleteModal}
        onCancel={() => setOpenDeleteModal(false)}
        onConfirm={handleConfirmDelete}
      />

      <MessageDetailsModal
  message={selectedMessage}
  open={viewModalOpen}
  onClose={() => setViewModalOpen(false)}
/>
    </div>
  );
}
