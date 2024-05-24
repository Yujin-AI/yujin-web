"use client";

import * as React from "react";
import Link from "next/link";
import { type ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Icons } from "@/components/icons";

import { ArticleProps } from "../_types/article-types";
import { DeleteArticlesDialog } from "./delete-articles-dialog";

export function getArticlesColumns(): ColumnDef<ArticleProps>[] {
    return [
        {
            id: "select",
            header: ({ table }) => (
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) =>
                        table.toggleAllPageRowsSelected(!!value)
                    }
                    aria-label="Select all"
                    className="translate-y-0.5"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                    className="translate-y-0.5"
                />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: "title",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Title" />
            ),
            cell: ({ row }) => {
                const label = row.original.sourceType;
                return (
                    <Link
                        className="flex space-x-2"
                        href={`/articles/${row.original.slug}`}
                    >
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <span className="max-w-[10.25rem] truncate font-medium">
                                    {row.getValue("title")}
                                </span>
                            </TooltipTrigger>
                            <TooltipContent className="flex items-center border px-2 py-2 font-semibold text-foreground">
                                {/* <Icons.link className="mr-2 size-4" /> */}
                                <span className="truncate">
                                    {row.getValue("title")}
                                </span>
                            </TooltipContent>
                        </Tooltip>
                        {label && <Badge variant="outline">{label}</Badge>}
                    </Link>
                );
            },
        },
        {
            accessorKey: "sourceUrl",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Source URL" />
            ),
            cell: ({ row }) => {
                return (
                    <div className="flex space-x-2">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <span className="max-w-[10.25rem] truncate font-medium">
                                    {row.getValue("sourceUrl")}
                                </span>
                            </TooltipTrigger>
                            <TooltipContent className="flex items-center border px-2 py-2 font-semibold text-foreground">
                                <Icons.link className="mr-2 size-4" />
                                <Link
                                    href={row.getValue("sourceUrl")}
                                    target="_blank"
                                    className="truncate"
                                >
                                    {row.getValue("sourceUrl")}
                                </Link>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                );
            },
        },
        {
            id: "isPublished",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Visibility" />
            ),
            cell: ({ row }) => {
                return (
                    <div className="flex space-x-1">
                        <span className="max-w-[10.25rem] truncate font-medium">
                            <Switch
                                checked={row.original.isPublished}
                                disabled
                            />
                        </span>
                    </div>
                );
            },
        },
        {
            id: "isProcessed",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Train" />
            ),
            cell: ({ row }) => {
                return (
                    <div className="flex space-x-2">
                        <span className="max-w-[31.25rem] truncate font-medium">
                            <Switch
                                checked={row.original.isProcessed}
                                disabled
                            />
                        </span>
                    </div>
                );
            },
        },
        {
            id: "actions",
            cell: function Cell({ row }) {
                const [isUpdatePending, startUpdateTransition] =
                    React.useTransition();
                const [showUpdateArticlesSheet, setShowUpdateArticlesSheet] =
                    React.useState(false);
                const [showDeleteArticlesDialog, setShowDeleteArticlesDialog] =
                    React.useState(false);

                return (
                    <>
                        {/* <UpdateArticlesSheet
                            open={showUpdateArticlesSheet}
                            onOpenChange={setShowUpdateArticlesSheet}
                            task={row.original}
                        /> */}
                        <DeleteArticlesDialog
                            open={showDeleteArticlesDialog}
                            onOpenChange={setShowDeleteArticlesDialog}
                            articles={[row.original]}
                            showTrigger={false}
                            onSuccess={() => row.toggleSelected(false)}
                        />
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    aria-label="Open menu"
                                    variant="ghost"
                                    className="flex size-8 p-0 data-[state=open]:bg-muted"
                                >
                                    <Icons.dotsH
                                        className="size-4"
                                        aria-hidden="true"
                                    />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-40">
                                <DropdownMenuItem
                                    onSelect={() =>
                                        setShowUpdateArticlesSheet(true)
                                    }
                                >
                                    Edit
                                </DropdownMenuItem>

                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    onSelect={() =>
                                        setShowDeleteArticlesDialog(true)
                                    }
                                >
                                    Delete
                                    <DropdownMenuShortcut>
                                        ⌘⌫
                                    </DropdownMenuShortcut>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </>
                );
            },
        },
    ];
}
