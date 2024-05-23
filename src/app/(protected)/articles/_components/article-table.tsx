"use client";

import * as React from "react";
// import { articles, type Task } from "@/db/schema";
import type { DataTableFilterField } from "@/types";

import { useDataTable } from "@/hooks/use-data-table";
import { DataTableAdvancedToolbar } from "@/components/data-table/advanced/data-table-advanced-toolbar";
import { DataTable } from "@/components/data-table/data-table";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";

import type { getArticles } from "../_lib/queries";
import { ArticleProps } from "../_types/article-types";
import { getArticlesColumns } from "./article-table-columns";
import { ArticlesTableFloatingBar } from "./articles-table-floating-bar";
import { useArticlesTable } from "./articles-table-provider";
import { ArticlesTableToolbarActions } from "./articles-table-toolbar-actions";

interface ArticlesTableProps {
    articlesPromise: ReturnType<typeof getArticles>;
}

export function ArticlesTable({ articlesPromise }: ArticlesTableProps) {
    // Feature flags for showcasing some additional features. Feel free to remove them.
    const { featureFlags } = useArticlesTable();

    const { data, pageCount } = React.use(articlesPromise);

    // Memoize the columns so they don't re-render on every render
    const columns = React.useMemo(() => getArticlesColumns(), []);

    /**
     * This component can render either a faceted filter or a search filter based on the `options` prop.
     *
     * @prop options - An array of objects, each representing a filter option. If provided, a faceted filter is rendered. If not, a search filter is rendered.
     *
     * Each `option` object has the following properties:
     * @prop {string} label - The label for the filter option.
     * @prop {string} value - The value for the filter option.
     * @prop {React.ReactNode} [icon] - An optional icon to display next to the label.
     * @prop {boolean} [withCount] - An optional boolean to display the count of the filter option.
     */
    const filterFields: DataTableFilterField<ArticleProps>[] = [
        {
            label: "Title",
            value: "title",
            placeholder: "Filter titles...",
        },
        {
            label: "Processed",
            value: "isProcessed",
            options: [
                { label: "Yes", value: "true" },
                { label: "No", value: "false" },
            ],
        },
        {
            label: "Published",
            value: "isPublished",
            options: [
                { label: "Yes", value: "true" },
                { label: "No", value: "false" },
            ],
        },
    ];

    const { table } = useDataTable({
        data,
        columns,
        pageCount,
        // optional props
        filterFields,
        enableAdvancedFilter: featureFlags.includes("advancedFilter"),
        defaultPerPage: 10,
        defaultSort: "createdAt.desc",
    });

    return (
        <DataTable
            table={table}
            floatingBar={
                featureFlags.includes("floatingBar") ? (
                    <ArticlesTableFloatingBar table={table} />
                ) : null
            }
        >
            {featureFlags.includes("advancedFilter") ? (
                <DataTableAdvancedToolbar
                    table={table}
                    filterFields={filterFields}
                >
                    <ArticlesTableToolbarActions table={table} />
                </DataTableAdvancedToolbar>
            ) : (
                <DataTableToolbar table={table} filterFields={filterFields}>
                    <ArticlesTableToolbarActions table={table} />
                </DataTableToolbar>
            )}
        </DataTable>
    );
}
