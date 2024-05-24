"use client";

import * as React from "react";
import { type Row } from "@tanstack/react-table";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Icons } from "@/components/icons";

import { deleteArticles } from "../_lib/actions";
import { ArticleProps } from "../_types/article-types";

interface DeleteArticlesDialogProps
    extends React.ComponentPropsWithoutRef<typeof Dialog> {
    articles: Row<ArticleProps>["original"][];
    showTrigger?: boolean;
    onSuccess?: () => void;
}

export function DeleteArticlesDialog({
    articles,
    showTrigger = true,
    onSuccess,
    ...props
}: DeleteArticlesDialogProps) {
    const [isDeletePending, startDeleteTransition] = React.useTransition();

    return (
        <Dialog {...props}>
            {showTrigger ? (
                <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                        <Icons.trash
                            className="mr-2 size-4"
                            aria-hidden="true"
                        />
                        Delete ({articles.length})
                    </Button>
                </DialogTrigger>
            ) : null}
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently
                        delete your{" "}
                        <span className="font-medium">{articles.length}</span>
                        {articles.length === 1 ? " article" : " articles"} from
                        our servers.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="gap-2 sm:space-x-0">
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button
                        aria-label="Delete selected rows"
                        variant="destructive"
                        onClick={() => {
                            startDeleteTransition(async () => {
                                const { error } = await deleteArticles({
                                    ids: articles.map((article) => article.id),
                                });

                                if (error) {
                                    toast.error(error);
                                    return;
                                }

                                props.onOpenChange?.(false);
                                toast.success("Articles deleted");
                                onSuccess?.();
                            });
                        }}
                        disabled={isDeletePending}
                    >
                        {isDeletePending && (
                            <Icons.reload
                                className="mr-2 size-4 animate-spin"
                                aria-hidden="true"
                            />
                        )}
                        Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
