import Link from "next/link";
import { ArrowRight, FileText, MessageSquareText, Search, Sparkles } from "lucide-react";

import { PageContainer } from "@/components/page-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
    {
        icon: MessageSquareText,
        title: "Resume Assistant",
        description: "Ask questions about my skills, projects, education and career background.",
    },
    {
        icon: FileText,
        title: "PDF Intelligence",
        description: "Upload a PDF and ask questions about its contents with AI-powered retrieval.",
    },
];

export default function Home() {
    return (
        <PageContainer className="py-10 sm:py-16">
            <section className="relative overflow-hidden rounded-[28px] border border-border bg-card px-5 py-8 shadow-[0_20px_80px_-50px_rgba(15,23,42,0.35)] sm:px-8 lg:px-12 lg:py-12">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
                <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
                    <div>
                        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-primary/80">
                            <Sparkles className="size-3.5" />
                            AI knowledge assistant
                        </div>
                        <h1 className="max-w-xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                            Chat with your knowledge.
                        </h1>
                        <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
                            Ask questions about my resume, skills and projects, or upload a PDF and explore its contents
                            with AI-powered document search.
                        </p>

                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            <Button asChild size="lg" className="shadow-sm">
                                <Link href="/chat">
                                    Chat with My Resume
                                    <ArrowRight className="size-4" />
                                </Link>
                            </Button>
                            <Button asChild variant="outline" size="lg">
                                <Link href="/upload">Upload a PDF</Link>
                            </Button>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="rounded-3xl border border-border bg-background p-5 shadow-lg shadow-primary/5">
                            <div className="rounded-2xl border border-border bg-muted/40 p-4">
                                <div className="mb-4 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                                            <Search className="size-4" />
                                        </div>
                                        <div>
                                            <div className="text-sm font-medium text-foreground">Knowledge Source</div>
                                            <div className="text-xs text-muted-foreground">My Resume</div>
                                        </div>
                                    </div>
                                    <div className="rounded-full border border-border bg-background px-2.5 py-1 text-xs font-medium text-muted-foreground">
                                        Live
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div className="rounded-2xl border border-border bg-card p-3 text-sm text-muted-foreground">
                                        <span className="font-medium text-foreground">Q:</span> What technologies have I
                                        worked with?
                                    </div>
                                    <div className="rounded-2xl bg-primary/8 p-3 text-sm text-foreground">
                                        <span className="font-medium">A:</span> Next.js, TypeScript, React, AI
                                        integrations, SQL, document search and retrieval workflows.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mt-14">
                <div className="mb-6 flex items-end justify-between gap-4">
                    <div>
                        <p className="text-sm font-medium uppercase tracking-[0.22em] text-muted-foreground">
                            Capabilities
                        </p>
                        <h2 className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
                            Built for your work and documents
                        </h2>
                    </div>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                    {features.map(({ icon: Icon, title, description }) => (
                        <Card key={title} className="h-full">
                            <CardHeader className="pb-3">
                                <div className="flex size-11 items-center justify-center rounded-2xl border border-primary/20 bg-primary/5 text-primary">
                                    <Icon className="size-5" />
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <CardTitle className="text-xl">{title}</CardTitle>
                                <CardDescription className="text-base leading-7">{description}</CardDescription>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>
        </PageContainer>
    );
}
