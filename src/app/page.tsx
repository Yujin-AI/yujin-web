import Image from "next/image";
import Link from "next/link";

import { BackgroundBeams } from "@/components/ui/background-beams";
import { Boxes } from "@/components/ui/background-boxes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Component() {
    return (
        <>
            <Image
                className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
                src="/logo.svg"
                alt="Yujin Logo"
                width={100}
                height={30}
                priority
            />{" "}
            <h3 className="ml-4 font-bold text-2xl ">YUjin</h3>
            <header className="flex items-center h-16 px-4 border-b shrink-0 md:px-6">
                <Link
                    className="flex items-center gap-2 text-lg font-semibold sm:text-base mr-4"
                    href="#"
                >
                    {/* <FrameIcon className="w-6 h-6" /> */}

                    <span className="sr-only">Acme Inc</span>
                </Link>

                <nav className="hidden font-medium  sm:flex flex-row mx-uitems-center gap-5 text-xl lg:gap-6">
                    <Link
                        className="text-gray-500 hover:bg-gray-50 dark:text-gray-400 text-xl; "
                        href="#"
                    >
                        Features
                    </Link>
                    <Link
                        className="text-gray-500 hover:bg-gray-50 dark:text-gray-400 text-xl;"
                        href="#"
                    >
                        Pricing
                    </Link>
                    <Link
                        className="text-gray-500 hover:bg-gray-50 dark:text-gray-400 text-xl;"
                        href="#"
                    >
                        About
                    </Link>
                    <Link
                        className="text-gray-500 hover:bg-gray-50 dark:text-gray-400 text-2xl;"
                        href="#"
                    >
                        Contact
                    </Link>
                </nav>
                <div className="flex items-center w-full gap-4 md:ml-auto md:gap-2 lg:gap-4">
                    <Button
                        className="rounded-full ml-auto"
                        size="icon"
                        variant="ghost"
                    >
                        <span className="sr-only">Toggle user menu</span>
                    </Button>
                </div>
            </header>
            <main className="flex-1">
                <section className="w-full pt-12 md:pt-24 lg:pt-32 border-y">
                    <div className="px-4 md:px-6 space-y-10 xl:space-y-16">
                        <div className="grid max-w-[1300px] mx-auto gap-4 px-4 sm:px-6 md:px-10 md:grid-cols-2 md:gap-16">
                            <div>
                                <h1 className=" font-bold text-6xl mb-4 -mt-8 pb-4 tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                                    Revolutionize Your Customer Support with Our
                                    Chatbot Solutions
                                </h1>
                            </div>
                            <div className="flex flex-col items-start space-y-4">
                                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                                    At our chatbot company, we're dedicated to
                                    transforming the way businesses interact
                                    with their customers. Our advanced chatbot
                                    technology streamlines customer support,
                                    providing instant answers and personalized
                                    assistance 24/7. Say goodbye to long wait
                                    times and frustrating customer experiences.
                                </p>
                                <div className="space-x-4">
                                    <Link
                                        className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                                        href="#"
                                    >
                                        Get Started
                                    </Link>
                                    <Link
                                        className="inline-flex h-9 items-center justify-center rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                                        href="#"
                                    >
                                        Button
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <BackgroundBeams />
                <section className="w-full py-12 md:py-24 lg:py-32">
                    <div className="container space-y-12 px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                                    New Features
                                </div>
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                                    YUjin-your online Genie
                                </h2>
                                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                                    Revolutionize Your Customer Support with Our
                                    Chatbot Solutions
                                </p>
                            </div>
                        </div>
                        <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
                            <div className="grid gap-1">
                                <h3 className="text-lg font-bold">
                                    Automated Responses
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Our chatbot provides instant answers to
                                    common questions, freeing up your support
                                    team to focus on more complex issues.
                                </p>
                            </div>
                            <div className="grid gap-1">
                                <h3 className="text-lg font-bold">
                                    Detailed Analytics
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Track user interactions, identify pain
                                    points, and optimize your chatbot's
                                    performance with our comprehensive
                                    analytics.
                                </p>
                            </div>
                            <div className="grid gap-1">
                                <h3 className="text-lg font-bold">
                                    Personalized Assistance
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Our chatbot adapts to each user's needs,
                                    providing personalized support and
                                    recommendations to enhance customer
                                    satisfaction.
                                </p>
                            </div>
                            <div className="grid gap-1">
                                <h3 className="text-lg font-bold">
                                    Seamless Integrations
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Easily integrate our chatbot with your
                                    existing systems and workflows, providing a
                                    seamless customer experience.
                                </p>
                            </div>
                            <div className="grid gap-1">
                                <h3 className="text-lg font-bold">
                                    Multilingual Support
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Our chatbot can communicate in multiple
                                    languages, ensuring a seamless experience
                                    for customers around the world.
                                </p>
                            </div>
                            <div className="grid gap-1">
                                <h3 className="text-lg font-bold">
                                    Scalable Solutions
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Our chatbot platform is designed to scale
                                    with your business, handling increasing
                                    customer inquiries without compromising
                                    performance.
                                </p>
                            </div>
                        </div>
                        <div className="flex justify-center flex-col sm:flex-row items-start gap-4">
                            <Link
                                className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                                href="#"
                            >
                                Contact Sales
                            </Link>
                            <Link
                                className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                                href="#"
                            >
                                Tour the Platform
                            </Link>
                        </div>
                    </div>
                </section>
                <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
                    <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
                        <div className="space-y-3">
                            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                                Experience the workflow the best chatbot teams
                                love.
                            </h2>
                            <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                                Let your team focus on shipping products instead
                                of managing customer's limitless mambo jambo.
                            </p>
                        </div>
                        <div className="mx-auto w-full max-w-sm space-y-2">
                            <form className="flex space-x-2">
                                <Input
                                    className="max-w-lg flex-1"
                                    placeholder="Enter your email"
                                    type="email"
                                />
                                <Button type="submit">Sign Up</Button>
                            </form>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                Sign up to get notified when we launch.
                                <Link
                                    className="underline underline-offset-2"
                                    href="#"
                                >
                                    Terms & Conditions
                                </Link>
                            </p>
                        </div>
                    </div>
                </section>
                <section className="w-full py-12 md:py-24 lg:py-32">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                                    New Features
                                </div>
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                                    Faster Solutions. More innovations.
                                </h2>
                                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                                    The platform for rapid progress. Let your
                                    team focus on shipping features instead of
                                    managing products instead of managing
                                    customer's limitless mambo jambo.
                                </p>
                            </div>
                        </div>
                        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
                            <img
                                alt="Image"
                                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                                height="310"
                                src="/placeholder.svg"
                                width="550"
                            />
                            <div className="flex flex-col justify-center space-y-4">
                                <ul className="grid gap-6">
                                    <li>
                                        <div className="grid gap-1">
                                            <h3 className="text-xl font-bold">
                                                Collaboration
                                            </h3>
                                            <p className="text-gray-500 dark:text-gray-400">
                                                Make collaboration seamless with
                                                built-in chatbot tools.
                                            </p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="grid gap-1">
                                            <h3 className="text-xl font-bold">
                                                Automation
                                            </h3>
                                            <p className="text-gray-500 dark:text-gray-400">
                                                Automate your workflow with
                                                continuous chatbot support.
                                            </p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="grid gap-1">
                                            <h3 className="text-xl font-bold">
                                                Scale
                                            </h3>
                                            <p className="text-gray-500 dark:text-gray-400">
                                                Our chatbot platform is designed
                                                to scale with your business,
                                                handling increasing customer
                                                inquiries without compromising
                                                performance.
                                            </p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
                {/* <Boxes /> */}
                <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
                    <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
                        <div className="space-y-2">
                            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                                Experience the workflow the best chatbot teams
                                love.
                            </h2>
                            <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                                Let your team focus on shipping products instead
                                of managing customer's limitless mambo jambo.
                            </p>
                        </div>
                        <div className="flex space-x-4 lg:justify-end">
                            <Link
                                className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                                href="#"
                            >
                                Contact Sales
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
