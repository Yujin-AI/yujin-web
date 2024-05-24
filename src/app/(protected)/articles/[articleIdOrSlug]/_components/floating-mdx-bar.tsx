import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Icons } from "@/components/icons";

type FloatingMDXBarProps = {
    feedSyntax: (syntax: string) => void;
    data: {
        lines: number;
        words: number;
        characters: number;
    };
};

export default function FloatingMDXBar({
    feedSyntax,
    data,
}: FloatingMDXBarProps) {
    const buttons = [
        {
            name: "B",
            icon: Icons.bold,
            syntax: "**bold**",
            description: "Add bold text",
        },
        {
            name: "I",
            icon: Icons.italic,
            syntax: "*italic*",
            description: "Add italic text",
        },
        {
            name: "U",
            icon: Icons.underline,
            syntax: "<u>underline</u>",
            description: "Add underline text",
        },
        {
            name: "S",
            icon: Icons.strikethrough,
            syntax: "~~strikethrough~~",
            description: "Add strikethrough text",
        },
        {
            name: "C",
            icon: Icons.code,
            syntax: "`code`",
            description: "Add inline code",
        },
        {
            name: "L",
            icon: Icons.link,
            syntax: "[link](https://example.com)",
            description: "Add a link",
        },
        {
            name: "Q",
            icon: Icons.quote,
            syntax: "> quote",
            description: "Add a quote",
        },
        {
            name: "UL",
            icon: Icons.unorderedList,
            syntax: "- list item",
            description: "Add an unordered list",
        },
        {
            name: "OL",
            icon: Icons.orderedList,
            syntax: "1. list item",
            description: "Add an ordered list",
        },
        {
            name: "T",
            icon: Icons.table,
            syntax: "| table |",
            description: "Add a table",
        },
        {
            name: "IMG",
            icon: Icons.media,
            syntax: "![alt text](https://example.com/image.jpg)",
            description: "Add an image",
        },
        {
            name: "CODE",
            icon: Icons.codeBlock,
            syntax: "```code```",
            description: "Add a code block",
        },
        {
            name: "HR",
            icon: Icons.minus,
            syntax: "---",
            description: "Add a horizontal rule",
        },
        {
            name: "MATH",
            icon: Icons.math,
            syntax: "$$math$$",
            description: "Add math",
        },
    ];
    const hButtons = [
        {
            name: "H1",
            icon: Icons.h1,
            syntax: "# Heading 1",
            description: "Add a level 1 heading",
        },
        {
            name: "H2",
            icon: Icons.h2,
            syntax: "## Heading 2",
            description: "Add a level 2 heading",
        },
        {
            name: "H3",
            icon: Icons.h3,
            syntax: "### Heading 3",
            description: "Add a level 3 heading",
        },
        {
            name: "H4",
            icon: Icons.h4,
            syntax: "#### Heading 4",
            description: "Add a level 4 heading",
        },
        {
            name: "H5",
            icon: Icons.h5,
            syntax: "##### Heading 5",
            description: "Add a level 5 heading",
        },
        {
            name: "H6",
            icon: Icons.h6,
            syntax: "###### Heading 6",
            description: "Add a level 6 heading",
        },
    ];
    return (
        <div className="fixed inset-x-0 top-[4.5rem] z-50 mx-auto w-fit px-4">
            <div className="w-full overflow-x-auto">
                <div className="mx-auto flex flex-col w-fit items-center gap-1 rounded-md border bg-card p-2 shadow-2xl">
                    <div className="flex h-7 items-center rounded-md p-2">
                        <DropdownMenu>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="size-10 px-4"
                                        >
                                            <Icons.heading className="size-5 shrink-0" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                </TooltipTrigger>
                                <TooltipContent className="flex items-center bg-accent px-2 py-1 font-semibold text-foreground ">
                                    <p className="mr-2">Add a heading</p>
                                </TooltipContent>
                            </Tooltip>
                            <DropdownMenuContent
                                align="end"
                                className="w-5 min-w-16"
                            >
                                {hButtons.map((btn) => (
                                    <DropdownMenuItem key={btn.name}>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="size-10"
                                                    onClick={() =>
                                                        feedSyntax(btn.syntax)
                                                    }
                                                >
                                                    <btn.icon className="size-5 shrink-0" />
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent className="flex items-center border bg-accent px-2 py-1 font-semibold text-foreground">
                                                <p className="mr-2">
                                                    {btn.description}
                                                </p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Separator
                            orientation="vertical"
                            className="ml-2 mr-1"
                        />
                        {buttons.map((btn) => (
                            <Tooltip key={btn.name}>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="size-10 hover:border"
                                        onClick={() => feedSyntax(btn.syntax)}
                                    >
                                        <btn.icon className="size-5 shrink-0" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent className="flex items-center border bg-accent px-2 py-1 font-semibold text-foreground">
                                    <p className="mr-2">{btn.description}</p>
                                </TooltipContent>
                            </Tooltip>
                        ))}
                    </div>
                    <div className="flex justify-center w-full">
                        <div className="flex space-x-2">
                            Lines: {data.lines} <Icons.minus></Icons.minus>{" "}
                            Words: {data.words} <Icons.minus></Icons.minus>{" "}
                            Characters: {data.characters}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
