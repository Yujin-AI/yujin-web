"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "@/lib/utils";
import { userLoginSchema } from "@/lib/validations/auth";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Icons } from "@/components/icons";

interface UserLoginFormProps extends React.HTMLAttributes<HTMLDivElement> {}

type FormData = z.infer<typeof userLoginSchema>;

export function UserLoginForm({ className, ...props }: UserLoginFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(userLoginSchema),
    });
    const [isLoading, setIsLoading] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);

    const searchParams = useSearchParams();
    const router = useRouter();

    async function onSubmit(data: FormData) {
        setIsLoading(true);

        const signInResult = await signIn("credentials", {
            email: data.email.toLowerCase(),
            password: data.password,
            redirect: false,
            callbackUrl: searchParams?.get("from") || "/dashboard",
        });

        setIsLoading(false);
        if (signInResult?.status === 401) {
            return toast({
                title: "Invalid credentials",
                description:
                    "The email or password you entered is incorrect. Please try again.",
                variant: "destructive",
            });
        }

        if (!signInResult?.ok) {
            return toast({
                title: "Something went wrong.",
                description: "Your sign in request failed. Please try again.",
                variant: "destructive",
            });
        }

        router.refresh();
        return toast({
            title: "Login successful.",
            description: "Now enjoy your Yujin AI chatbot.",
        });
    }

    return (
        <div className={cn("grid gap-6", className)} {...props}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-2">
                    <div className="grid gap-1">
                        <Label className="sr-only" htmlFor="email">
                            Email
                        </Label>
                        <Input
                            id="email"
                            placeholder="name@example.com"
                            type="email"
                            autoCapitalize="none"
                            autoComplete="email"
                            autoCorrect="off"
                            disabled={isLoading}
                            {...register("email")}
                        />
                        {errors?.email && (
                            <p className="px-1 text-xs text-red-600">
                                {errors.email.message}
                            </p>
                        )}
                    </div>
                    <div className="relative">
                        <Label className="sr-only" htmlFor="password">
                            Password
                        </Label>
                        <Input
                            id="password"
                            placeholder="********"
                            type={showPassword ? "text" : "password"}
                            autoCapitalize="none"
                            disabled={isLoading}
                            {...register("password")}
                        />
                        <div
                            className="absolute top-0 bottom-0 right-0 flex items-center w-10 px-3 cursor-pointer text-muted-foreground"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <Icons.eyeOff /> : <Icons.eye />}
                        </div>
                        {errors?.password && (
                            <p className="px-1 text-xs text-red-600">
                                {errors.password.message}
                            </p>
                        )}
                    </div>
                    <button
                        className={cn(buttonVariants())}
                        disabled={isLoading}
                    >
                        {isLoading && (
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Login
                    </button>
                </div>
            </form>
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                        Or continue with
                    </span>
                </div>
            </div>
            <button
                type="button"
                className={cn(buttonVariants({ variant: "outline" }))}
                onClick={() => {
                    signIn("github");
                }}
                disabled={true}
            >
                {/* {isGitHubLoading ? ( */}
                {/* <Icons.spinner className="mr-2 h-4 w-4 animate-spin" /> */}
                {/* ) : ( */}
                {/* <Icons.gitHub className="mr-2 h-4 w-4" /> */}
                {/* )}{" "} */}
                Google
            </button>
        </div>
    );
}
