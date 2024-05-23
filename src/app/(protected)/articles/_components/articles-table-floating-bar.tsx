import * as React from "react";
import { type Table } from "@tanstack/react-table";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectTrigger } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Icons } from "@/components/icons";
// import { exportTableToCSV } from "@/lib/export"
import { Kbd } from "@/components/kbd";

import { deleteArticles, updateArticles } from "../_lib/actions";
import { ArticleProps } from "../_types/article-types";

interface ArticlesTableFloatingBarProps {
    table: Table<ArticleProps>;
}

export function ArticlesTableFloatingBar({
    table,
}: ArticlesTableFloatingBarProps) {
    const rows = table.getFilteredSelectedRowModel().rows;

    const [isPending, startTransition] = React.useTransition();
    const [method, setMethod] = React.useState<
        "delete" | "update-isProcessed" | "update-isPublished"
    >();

    // Clear selection on Escape key press
    React.useEffect(() => {
        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") {
                table.toggleAllRowsSelected(false);
            }
        }

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [table]);

    return (
        <div className="fixed inset-x-0 bottom-4 z-50 mx-auto w-fit px-4">
            <div className="w-full overflow-x-auto">
                <div className="mx-auto flex w-fit items-center gap-2 rounded-md border bg-card p-2 shadow-2xl">
                    <div className="flex h-7 items-center rounded-md border border-dashed pl-2.5 pr-1">
                        <span className="whitespace-nowrap text-xs">
                            {rows.length} selected
                        </span>
                        <Separator
                            orientation="vertical"
                            className="ml-2 mr-1"
                        />
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="size-5 hover:border"
                                    onClick={() =>
                                        table.toggleAllRowsSelected(false)
                                    }
                                >
                                    <Icons.close
                                        className="size-3.5 shrink-0"
                                        aria-hidden="true"
                                    />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent className="flex items-center border bg-accent px-2 py-1 font-semibold text-foreground dark:bg-zinc-900">
                                <p className="mr-2">Clear selection</p>
                                <Kbd abbrTitle="Escape" variant="outline">
                                    Esc
                                </Kbd>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                    <Separator
                        orientation="vertical"
                        className="hidden h-5 sm:block"
                    />
                    <div className="flex items-center gap-1.5">
                        <Select
                            onValueChange={(
                                value
                                // : ArticleProps["isProcessed"]
                            ) => {
                                setMethod("update-isProcessed");

                                startTransition(async () => {
                                    const { error } = await updateArticles({
                                        ids: rows.map((row) => row.original.id),
                                        isProcessed: JSON.parse(value),
                                    });

                                    if (error) {
                                        toast.error(error);
                                        return;
                                    }

                                    toast.success("Articles updated");
                                });
                            }}
                        >
                            <Tooltip delayDuration={250}>
                                <SelectTrigger asChild>
                                    <TooltipTrigger asChild>
                                        <Button
                                            variant="secondary"
                                            size="icon"
                                            className="size-7 border data-[state=open]:bg-accent data-[state=open]:text-accent-foreground"
                                            disabled={isPending}
                                        >
                                            {isPending &&
                                            method === "update-isProcessed" ? (
                                                <Icons.reload
                                                    className="size-3.5 animate-spin"
                                                    aria-hidden="true"
                                                />
                                            ) : (
                                                <Icons.checkCircle
                                                    className="size-3.5"
                                                    aria-hidden="true"
                                                />
                                            )}
                                        </Button>
                                    </TooltipTrigger>
                                </SelectTrigger>
                                <TooltipContent className=" border bg-accent font-semibold text-foreground dark:bg-zinc-900">
                                    <p>Update status</p>
                                </TooltipContent>
                            </Tooltip>
                            {/* <SelectContent align="center">
                                <SelectGroup>
                                    {articles.status.enumValues.map(
                                        (status) => (
                                            <SelectItem
                                                key={status}
                                                value={status}
                                                className="capitalize"
                                            >
                                                {status}
                                            </SelectItem>
                                        )
                                    )}
                                </SelectGroup>
                            </SelectContent> */}
                        </Select>
                        <Select
                            onValueChange={(value) => {
                                setMethod("update-isPublished");

                                startTransition(async () => {
                                    const { error } = await updateArticles({
                                        ids: rows.map((row) => row.original.id),
                                        isPublished: JSON.parse(value),
                                    });

                                    if (error) {
                                        toast.error(error);
                                        return;
                                    }

                                    toast.success("Articles updated");
                                });
                            }}
                        >
                            <Tooltip delayDuration={250}>
                                <SelectTrigger asChild>
                                    <TooltipTrigger asChild>
                                        <Button
                                            variant="secondary"
                                            size="icon"
                                            className="size-7 border data-[state=open]:bg-accent data-[state=open]:text-accent-foreground"
                                            disabled={isPending}
                                        >
                                            {isPending &&
                                            method === "update-isPublished" ? (
                                                <Icons.reload
                                                    className="size-3.5 animate-spin"
                                                    aria-hidden="true"
                                                />
                                            ) : (
                                                <Icons.arrowUp
                                                    className="size-3.5"
                                                    aria-hidden="true"
                                                />
                                            )}
                                        </Button>
                                    </TooltipTrigger>
                                </SelectTrigger>
                                <TooltipContent className=" border bg-accent font-semibold text-foreground dark:bg-zinc-900">
                                    <p>Update priority</p>
                                </TooltipContent>
                            </Tooltip>
                            <SelectContent align="center">
                                {/* <SelectGroup>
                                    {articles.priority.enumValues.map(
                                        (priority) => (
                                            <SelectItem
                                                key={priority}
                                                value={priority}
                                                className="capitalize"
                                            >
                                                {priority}
                                            </SelectItem>
                                        )
                                    )}
                                </SelectGroup> */}
                            </SelectContent>
                        </Select>
                        <Tooltip delayDuration={250}>
                            {/* <TooltipTrigger asChild>
                                <Button
                                    variant="secondary"
                                    size="icon"
                                    className="size-7 border"
                                    onClick={() => {
                                        setMethod("export");

                                        startTransition(() => {
                                            exportTableToCSV(table, {
                                                excludeColumns: [
                                                    "select",
                                                    "actions",
                                                ],
                                                onlySelected: true,
                                            });
                                        });
                                    }}
                                    disabled={isPending}
                                >
                                    {isPending && method === "export" ? (
                                        <ReloadIcon
                                            className="size-3.5 animate-spin"
                                            aria-hidden="true"
                                        />
                                    ) : (
                                        <DownloadIcon
                                            className="size-3.5"
                                            aria-hidden="true"
                                        />
                                    )}
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent className=" border bg-accent font-semibold text-foreground dark:bg-zinc-900">
                                <p>Export articles</p>
                            </TooltipContent> */}
                        </Tooltip>
                        <Tooltip delayDuration={250}>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="secondary"
                                    size="icon"
                                    className="size-7 border"
                                    onClick={() => {
                                        setMethod("delete");

                                        startTransition(async () => {
                                            const { error } =
                                                await deleteArticles({
                                                    ids: rows.map(
                                                        (row) => row.original.id
                                                    ),
                                                });

                                            if (error) {
                                                toast.error(error);
                                                return;
                                            }

                                            table.toggleAllRowsSelected(false);
                                        });
                                    }}
                                    disabled={isPending}
                                >
                                    {isPending && method === "delete" ? (
                                        <Icons.reload
                                            className="size-3.5 animate-spin"
                                            aria-hidden="true"
                                        />
                                    ) : (
                                        <Icons.trash
                                            className="size-3.5"
                                            aria-hidden="true"
                                        />
                                    )}
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent className=" border bg-accent font-semibold text-foreground dark:bg-zinc-900">
                                <p>Delete articles</p>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                </div>
            </div>
        </div>
    );
}
