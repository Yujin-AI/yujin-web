"use client";

import * as React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signupAction, SignupStates } from "@/actions/signup-action";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "@/lib/utils";
import { userSignupSchema } from "@/lib/validations/auth";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/icons";

import { toast } from "./ui/use-toast";

interface UserSignupFormProps extends React.HTMLAttributes<HTMLDivElement> {}

type FormDataProps = z.infer<typeof userSignupSchema>;

export function UserSignupForm({ className, ...props }: UserSignupFormProps) {
    const router = useRouter();
    const { register, formState, reset } = useForm<FormDataProps>({
        resolver: zodResolver(userSignupSchema),
    });
    const [state, formAction] = useFormState<SignupStates, FormData>(
        signupAction,
        null
    );
    const { errors } = formState;

    const [isLoading, startTransaction] = React.useTransition();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    React.useEffect(() => {
        if (!state) return;
        if (state?.status === 201) {
            reset();
            toast({
                title: "Signup successful",
                description:
                    "Please login to continue. Be sure to check your email for a verification link.",
            });
            router.push("/login");
        }
        if (state?.status === 409) {
            toast({
                title: "Account already exists",
                description: "Please login to continue.",
                variant: "destructive",
            });
            router.push("/login");
        }
    }, [state]);

    return (
        <div className={cn("grid gap-6", className)} {...props}>
            <form
                action={(formData) =>
                    startTransaction(() => formAction(formData))
                }
            >
                <div className="grid gap-2">
                    <div className="grid gap-1">
                        <Label className="sr-only" htmlFor="firstName">
                            Fist Name
                        </Label>
                        <Input
                            id="firstName"
                            placeholder="John"
                            type="text"
                            disabled={isLoading}
                            {...register("firstName")}
                        />
                        {errors?.firstName && (
                            <p className="px-1 text-xs text-red-600">
                                {errors.firstName.message}
                            </p>
                        )}
                    </div>
                    <div className="grid gap-1">
                        <Label className="sr-only" htmlFor="lastName">
                            Last Name
                        </Label>
                        <Input
                            id="lastName"
                            placeholder="Doe"
                            type="text"
                            disabled={isLoading}
                            {...register("lastName")}
                        />
                        {errors?.lastName && (
                            <p className="px-1 text-xs text-red-600">
                                {errors?.lastName.message}
                            </p>
                        )}
                    </div>
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
                    <div className="relative">
                        <Label className="sr-only" htmlFor="confirmPassword">
                            Confirm Password
                        </Label>
                        <Input
                            id="confirmPassword"
                            placeholder="********"
                            type={showConfirmPassword ? "text" : "password"}
                            autoCapitalize="none"
                            disabled={isLoading}
                            {...register("confirmPassword")}
                        />
                        <div
                            className="absolute top-0 bottom-0 right-0 flex items-center w-10 px-3 cursor-pointer text-muted-foreground"
                            onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                            }
                        >
                            {showConfirmPassword ? (
                                <Icons.eyeOff />
                            ) : (
                                <Icons.eye />
                            )}
                        </div>
                        {errors?.confirmPassword && (
                            <p className="px-1 text-xs text-red-600">
                                {errors.confirmPassword.message}
                            </p>
                        )}
                    </div>
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
                        Signup
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
