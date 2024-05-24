"use client";

import { useState } from "react";
import Markdown from "react-markdown";
import rehypeExternalLinks from "rehype-external-links";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";

import { CodeBlock, Pre } from "../../_components/Code";
import { ArticleProps } from "../../_types/article-types";
import FloatingMDXBar from "./floating-mdx-bar";

export default function MDXEditor({ article }: { article: ArticleProps }) {
    const [source, setSource] = useState(article.content);

    const components = {
        code: CodeBlock,
        pre: Pre,
    };

    const feedSyntax = (syntax: string) => {
        return setSource(source + syntax);
    };

    return (
        <div className="top-28">
            <FloatingMDXBar
                feedSyntax={feedSyntax}
                data={{
                    lines: source.split(/\r\n|\r|\n/).length,
                    words: source.split(/\s+/).filter(Boolean).length,
                    characters: source.length,
                }}
            />
            <div className="flex justify-between mt-12">
                <section className="w-full pt-5">
                    <textarea
                        className="w-full bg-transparent h-full resize-none focus:outline-none placeholder:text-lg placeholder:text-white placeholder:tracking-wider placeholder:opacity-80"
                        placeholder="Feed me some Markdown 🍕"
                        value={source}
                        rows={15}
                        autoFocus
                        onChange={(e) => setSource(e.target.value)}
                    />
                </section>

                <article className="w-full pt-5 pl-6">
                    <Markdown
                        className="prose prose-invert min-w-full prose-p:text-xl"
                        components={components}
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[
                            rehypeSanitize,
                            [
                                rehypeExternalLinks,
                                { content: { type: "text", value: "" } },
                            ],
                        ]}
                    >
                        {source}
                    </Markdown>
                </article>
            </div>
        </div>
    );
}
