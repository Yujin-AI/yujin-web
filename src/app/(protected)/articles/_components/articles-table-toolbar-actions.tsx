"use client";

import { type Table } from "@tanstack/react-table";

// import { CreateTaskDialog } from "./create-Articles-dialog"
import { ArticleProps } from "../_types/article-types";
import { DeleteArticlesDialog } from "./delete-articles-dialog";

interface ArticlesTableToolbarActionsProps {
    table: Table<ArticleProps>;
}

export function ArticlesTableToolbarActions({
    table,
}: ArticlesTableToolbarActionsProps) {
    return (
        <div className="flex items-center gap-2">
            {table.getFilteredSelectedRowModel().rows.length > 0 ? (
                <DeleteArticlesDialog
                    articles={table
                        .getFilteredSelectedRowModel()
                        .rows.map((row) => row.original)}
                    onSuccess={() => table.toggleAllRowsSelected(false)}
                />
            ) : null}
            {/* <CreateTaskDialog prevArticles={table.getFilteredRowModel().rows} /> */}
            {/* <Button
        variant="outline"
        size="sm"
        onClick={() =>
          exportTableToCSV(table, {
            filename: "Articles",
            excludeColumns: ["select", "actions"],
          })
        }
      >
        <DownloadIcon className="mr-2 size-4" aria-hidden="true" />
        Export
      </Button> */}
            {/**
             * Other actions can be added here.
             * For example, import, view, etc.
             */}
        </div>
    );
}
