"use client";

import Link from "next/link";
import { SignInButton, SignOutButton, SignUpButton, useAuth } from "@clerk/nextjs";
import { FileText, House, MessageSquareText, Sparkles } from "lucide-react";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

const navItems = [
    { href: "/", label: "Home", icon: House },
    { href: "/chat", label: "Chat", icon: MessageSquareText },
    { href: "/upload", label: "Upload PDF", icon: FileText },
];

export function AppShell({ children }: { children: React.ReactNode }) {
    const { isLoaded, isSignedIn } = useAuth();

    return (
        <div className="min-h-screen bg-background text-foreground">
            <header className="sticky top-0 z-50 border-b border-border/80 bg-background/80 backdrop-blur-xl">
                <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
                    <Link href="/" className="flex items-center gap-3" aria-label="RAG Chatbot Home">
                        <div className="flex size-9 items-center justify-center rounded-xl border border-primary/15 bg-primary/5 text-primary shadow-sm">
                            <Sparkles className="size-4" />
                        </div>
                        <div className="flex flex-col leading-none">
                            <span className="text-sm font-semibold tracking-[0.18em] text-muted-foreground uppercase">
                                RAG
                            </span>
                            <span className="text-lg font-semibold text-foreground">Chatbot</span>
                        </div>
                    </Link>

                    <nav className="hidden items-center gap-1 rounded-full border border-border bg-card/70 p-1 shadow-sm md:flex">
                        {navItems.map(({ href, label, icon: Icon }) => (
                            <Link
                                key={href}
                                href={href}
                                className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                            >
                                <Icon className="size-4" />
                                {label}
                            </Link>
                        ))}
                    </nav>

                    <div className="flex items-center gap-2">
                        <div className="md:hidden">
                            <ThemeToggle />
                        </div>
                        {isLoaded && !isSignedIn ? (
                            <>
                                <SignInButton mode="modal">
                                    <Button variant="ghost" size="sm">
                                        Sign In
                                    </Button>
                                </SignInButton>
                                <SignUpButton mode="modal">
                                    <Button size="sm">Sign Up</Button>
                                </SignUpButton>
                            </>
                        ) : null}
                        {isLoaded && isSignedIn ? (
                            <SignOutButton>
                                <Button variant="outline" size="sm">
                                    Sign Out
                                </Button>
                            </SignOutButton>
                        ) : null}
                        <div className="hidden md:block">
                            <ThemeToggle />
                        </div>
                    </div>
                </div>

                <div className="border-t border-border/60 md:hidden">
                    <nav className="mx-auto flex max-w-6xl items-center gap-2 overflow-x-auto px-4 py-3 sm:px-6">
                        {navItems.map(({ href, label, icon: Icon }) => (
                            <Link
                                key={href}
                                href={href}
                                className="inline-flex shrink-0 items-center gap-2 rounded-full border border-border bg-card px-3 py-2 text-sm font-medium text-foreground"
                            >
                                <Icon className="size-4" />
                                {label}
                            </Link>
                        ))}
                    </nav>
                </div>
            </header>

            <main className="flex-1">{children}</main>

            <footer className="border-t border-border bg-muted/20">
                <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
                    <p>© 2026 RAG Chatbot</p>
                    <div className="flex items-center gap-4">
                        <Link href="/" className="transition-colors hover:text-foreground">
                            Home
                        </Link>
                        <Link href="/chat" className="transition-colors hover:text-foreground">
                            Chat
                        </Link>
                        <Link href="/upload" className="transition-colors hover:text-foreground">
                            Upload PDF
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
