import * as React from "react";
import { SearchParams } from "@/types";

import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { DateRangePicker } from "@/components/date-range-picker";
import { Shell } from "@/components/shell";

import { ArticlesTable } from "./_components/article-table";
import { ArticlesTableProvider } from "./_components/articles-table-provider";
import { getArticles } from "./_lib/queries";
import { searchParamsSchema } from "./_lib/validations";

export interface IndexPageProps {
    searchParams: SearchParams;
}

export default async function ArticlesPage({ searchParams }: IndexPageProps) {
    const search = searchParamsSchema.parse(searchParams);

    const articlesPromise = getArticles(search);

    return (
        <Shell className="gap-2">
            <ArticlesTableProvider>
                {/**
                 * The `DateRangePicker` component is used to render the date range picker UI.
                 * It is used to filter the tasks based on the selected date range it was created at.
                 * The business logic for filtering the tasks based on the selected date range is handled inside the component.
                 */}
                <DateRangePicker
                    triggerSize="sm"
                    triggerClassName="ml-auto w-56 sm:w-60"
                    align="end"
                    dateRange={
                        search.from && search.to
                            ? {
                                  from: new Date(search.from),
                                  to: new Date(search.to),
                              }
                            : undefined
                    }
                />
                <React.Suspense
                    fallback={
                        <DataTableSkeleton
                            columnCount={5}
                            searchableColumnCount={1}
                            filterableColumnCount={2}
                            cellWidths={[
                                "10rem",
                                "40rem",
                                "12rem",
                                "12rem",
                                "8rem",
                            ]}
                            shrinkZero
                        />
                    }
                >
                    {/**
                     * Passing promises and consuming them using React.use for triggering the suspense fallback.
                     * @see https://react.dev/reference/react/use
                     */}
                    <ArticlesTable articlesPromise={articlesPromise} />
                </React.Suspense>
            </ArticlesTableProvider>
        </Shell>
    );
}
