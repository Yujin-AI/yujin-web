import * as z from "zod";

const password = z.string().superRefine((password, checkPassComplexity) => {
    const containsUppercase = (ch: string) => /[A-Z]/.test(ch);
    const containsLowercase = (ch: string) => /[a-z]/.test(ch);
    const containsSpecialChar = (ch: string) =>
        /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/.test(ch);
    let countOfUpperCase = 0,
        countOfLowerCase = 0,
        countOfNumbers = 0,
        countOfSpecialChar = 0;
    for (let i = 0; i < password.length; i++) {
        let ch = password.charAt(i);
        if (!isNaN(+ch)) countOfNumbers++;
        else if (containsUppercase(ch)) countOfUpperCase++;
        else if (containsLowercase(ch)) countOfLowerCase++;
        else if (containsSpecialChar(ch)) countOfSpecialChar++;
    }
    if (password.length < 8) {
        checkPassComplexity.addIssue({
            code: "custom",
            message: "password should be at least 8 characters long",
        });
    }
    if (countOfLowerCase < 1) {
        checkPassComplexity.addIssue({
            code: "custom",
            message: "password does not contain lowercase letter",
        });
    }
    if (countOfUpperCase < 1) {
        checkPassComplexity.addIssue({
            code: "custom",
            message: "password does not contain uppercase letter",
        });
    }
    if (countOfSpecialChar < 1) {
        checkPassComplexity.addIssue({
            code: "custom",
            message: "password does not contain special character",
        });
    }
    if (countOfNumbers < 1) {
        checkPassComplexity.addIssue({
            code: "custom",
            message: "password does not contain number",
        });
    }
});

export const userLoginSchema = z.object({
    email: z.string().email(),
    password,
});

export const userSignupSchema = z
    .object({
        firstName: z.string().min(3),
        lastName: z.string().min(3),
        email: z.string().email(),
        password,
        confirmPassword: password,
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "passwords do not match",
        path: ["confirmPassword"],
    });
