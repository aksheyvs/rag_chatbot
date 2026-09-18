"use client";

import { useState, Fragment } from "react";
import Link from "next/link";
import { useChat } from "@ai-sdk/react";
import { ArrowUpRight, Bot, FileText, Loader2, Sparkles } from "lucide-react";
import Markdown from "react-markdown";

import {
    PromptInput,
    PromptInputBody,
    type PromptInputMessage,
    PromptInputSubmit,
    PromptInputTextarea,
} from "@/components/ai-elements/prompt-input";
import { Message, MessageContent } from "@/components/ai-elements/message";
import { Conversation, ConversationContent, ConversationScrollButton } from "@/components/ai-elements/conversation";
import { AuthGuard } from "@/components/auth-guard";
import { PageContainer } from "@/components/page-shell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const sampleQuestions = [
    "What are your technical skills?",
    "Tell me about your projects.",
    "What technologies do you use?",
    "Tell me about your education.",
];

export default function RAGChatBot() {
    const [input, setInput] = useState("");
    const { messages, sendMessage, status } = useChat();

    const handleSubmit = (message: PromptInputMessage) => {
        const text = message.text.trim();
        if (!text) return;

        sendMessage({ text });
        setInput("");
    };

    const handleSuggestionClick = (text: string) => {
        setInput(text);
        sendMessage({ text });
    };

    const isLoading = status === "submitted" || status === "streaming";

    return (
        <AuthGuard>
            <PageContainer className="py-8 sm:py-12">
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm font-medium uppercase tracking-[0.22em] text-muted-foreground">
                            Resume Assistant
                        </p>
                        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                            Ask questions about my background
                        </h1>
                    </div>
                    <Button asChild variant="outline" className="w-fit">
                        <Link href="/upload">
                            <FileText className="size-4" />
                            Upload a PDF
                        </Link>
                    </Button>
                </div>

                <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">Knowledge Source</span>
                    <span className="rounded-full border border-primary/20 bg-primary/5 px-2.5 py-1 text-xs font-medium text-primary">
                        My Resume
                    </span>
                </div>

                <Card className="overflow-hidden border border-border/80 bg-card shadow-[0_24px_80px_-55px_rgba(15,23,42,0.45)]">
                    <div className="border-b border-border/80 bg-muted/25 px-4 py-3 sm:px-6">
                        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                            <Sparkles className="size-4 text-primary" />
                            Ask questions about my skills, projects, education and professional background.
                        </div>
                    </div>

                    <div className="p-3 sm:p-4">
                        <div className="h-[58vh] min-h-[420px] rounded-2xl border border-border/80 bg-background/70">
                            <Conversation className="h-full">
                                <ConversationContent>
                                    {messages.length === 0 && !isLoading ? (
                                        <div className="flex h-full flex-col items-center justify-center p-6 text-center">
                                            <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                                                <Sparkles className="size-5" />
                                            </div>
                                            <h2 className="mt-4 text-lg font-semibold text-foreground">
                                                Ask me about my resume
                                            </h2>
                                            <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                                                Explore my experience, technical strengths, projects, and education with
                                                a quick question.
                                            </p>
                                            <div className="mt-5 flex flex-wrap justify-center gap-2">
                                                {sampleQuestions.map((question) => (
                                                    <button
                                                        key={question}
                                                        type="button"
                                                        onClick={() => handleSuggestionClick(question)}
                                                        className="rounded-full border border-border bg-muted/40 px-3 py-1.5 text-sm text-foreground transition-colors hover:border-primary/30 hover:bg-primary/5"
                                                    >
                                                        {question}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    ) : null}

                                    {messages.map((message) => (
                                        <div key={message.id} className="mb-4 px-2 sm:px-3">
                                            {message.parts.map((part, i) => {
                                                switch (part.type) {
                                                    case "text":
                                                        return (
                                                            <Fragment key={`${message.id}-${i}`}>
                                                                {message.role === "assistant" ? (
                                                                    <div className="flex items-start gap-3">
                                                                        <div className="mt-1 flex size-8 shrink-0 items-center justify-center rounded-full border border-primary/15 bg-primary/8 text-primary">
                                                                            <Bot className="size-4" />
                                                                        </div>
                                                                        <div className="max-w-[82%] rounded-2xl rounded-tl-md border border-border bg-muted/50 px-4 py-3 text-sm leading-7 text-foreground shadow-sm">
                                                                            <div className="prose prose-sm max-w-none [&_p]:my-1.5 [&_ul]:my-2 [&_ol]:my-2 [&_li]:my-1 [&_code]:rounded [&_code]:bg-foreground/5 [&_code]:px-1.5 [&_code]:py-0.5 [&_pre]:overflow-x-auto [&_pre]:rounded-xl [&_pre]:bg-foreground/5 [&_pre]:p-3">
                                                                                <Markdown>{part.text}</Markdown>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                ) : (
                                                                    <div className="flex justify-end">
                                                                        <div className="max-w-[78%] rounded-2xl rounded-br-md border border-primary/15 bg-primary/10 px-4 py-3 text-sm leading-7 text-foreground shadow-sm">
                                                                            <div className="prose prose-sm max-w-none [&_p]:my-1.5 [&_ul]:my-2 [&_ol]:my-2 [&_li]:my-1">
                                                                                <Markdown>{part.text}</Markdown>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </Fragment>
                                                        );
                                                    default:
                                                        return null;
                                                }
                                            })}
                                        </div>
                                    ))}

                                    {isLoading && (
                                        <div className="flex items-center gap-2 px-4 py-3 text-sm text-muted-foreground">
                                            <Loader2 className="size-4 animate-spin text-primary" />
                                            Searching the knowledge base…
                                        </div>
                                    )}
                                </ConversationContent>
                                <ConversationScrollButton />
                            </Conversation>
                        </div>

                        <div className="mt-4 rounded-2xl border border-border bg-muted/20 p-3">
                            <PromptInput className="border-0 bg-transparent p-0" onSubmit={handleSubmit}>
                                <PromptInputBody>
                                    <PromptInputTextarea
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        placeholder="Ask about my resume, skills, and projects..."
                                        className="min-h-[52px] border-0 bg-transparent text-base shadow-none focus-visible:ring-0"
                                    />
                                </PromptInputBody>

                                <div className="mt-3 flex items-center justify-between gap-3">
                                    <div className="text-xs text-muted-foreground">
                                        <span className="inline-flex items-center gap-1">
                                            <ArrowUpRight className="size-3" />
                                            AI-powered retrieval
                                        </span>
                                    </div>
                                    <PromptInputSubmit className="h-10 rounded-xl" disabled={isLoading} />
                                </div>
                            </PromptInput>
                        </div>
                    </div>
                </Card>
            </PageContainer>
        </AuthGuard>
    );
}
