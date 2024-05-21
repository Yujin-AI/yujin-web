"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
    createChatbotAction,
    CreateChatbotStates,
} from "@/actions/create-chatbot-action";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { createChatbotSchema } from "@/lib/validations/chatbot";

import { Icons } from "./icons";
import { Button, buttonVariants } from "./ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { toast } from "./ui/use-toast";

type CreateChatbotFormData = z.infer<typeof createChatbotSchema>;

export default function CreateChatbot() {
    const { register, formState, reset } = useForm<CreateChatbotFormData>({
        resolver: zodResolver(createChatbotSchema),
    });
    const [isLoading, startTransaction] = useTransition();

    const [state, formAction] = useFormState<CreateChatbotStates, FormData>(
        createChatbotAction,
        null
    );
    const { errors, isSubmitSuccessful } = formState;
    const [open, setOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (!state) return;
        if (state?.status === 201) {
            reset();
            toast({
                title: "Chatbot created",
                description: "Please wait a while we train the chatbot.",
            });
            setOpen(false);
            router.refresh();
        }
    }, [state, isSubmitSuccessful]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Create Chatbot</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] ">
                <DialogHeader>
                    <DialogTitle>New Chatbot</DialogTitle>
                    <DialogDescription>
                        Enter a name and URL for your new chatbot.
                    </DialogDescription>
                </DialogHeader>

                <form
                    action={(formData) =>
                        startTransaction(() => formAction(formData))
                    }
                >
                    <div className="grid gap-4 px-6 py-4 pt-0">
                        <div className="grid gap-1">
                            <Label>Chatbot Name</Label>

                            <Input
                                id="name"
                                className="!col-span-3 w-full"
                                placeholder="AdonisJS Chatbot"
                                disabled={isLoading}
                                {...register("name")}
                            />
                        </div>
                    </div>
                    <div className="grid gap-4 px-6 py-4 pt-0">
                        <div className="grid gap-1">
                            <Label>Website URL</Label>

                            <Input
                                id="url"
                                className="!col-span-3 w-full"
                                placeholder="https://docs.adonisjs.com"
                                type="url"
                                disabled={isLoading}
                                {...register("url")}
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <button
                            className={cn(buttonVariants())}
                            disabled={
                                isLoading ||
                                Object.keys(errors).length > 0 ||
                                !formState.isValid
                            }
                        >
                            {isLoading && (
                                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            <span>Create new Chatbot</span>
                        </button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
