"use client";

import { Suspense } from "react";
import Link from "next/link";
import { ArrowLeft, LockKeyhole } from "lucide-react";
import { useSearchParams } from "next/navigation";

import { PageContainer } from "@/components/page-shell";
import { Button } from "@/components/ui/button";

function LoginRequiredContent() {
    const searchParams = useSearchParams();
    const redirect = searchParams.get("redirect") || "/";
    const signInUrl = redirect === "/" ? "/sign-in" : `/sign-in?redirect_url=${encodeURIComponent(redirect)}`;
    const signUpUrl = redirect === "/" ? "/sign-up" : `/sign-up?redirect_url=${encodeURIComponent(redirect)}`;

    return (
        <PageContainer className="flex min-h-[60vh] items-center justify-center py-12">
            <div className="w-full max-w-lg rounded-[28px] border border-border bg-card px-6 py-10 text-center shadow-[0_24px_80px_-55px_rgba(15,23,42,0.45)] sm:px-10">
                <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <LockKeyhole className="size-7" />
                </div>

                <h1 className="mt-6 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                    Login Required
                </h1>

                <p className="mt-4 text-base leading-7 text-muted-foreground">
                    You need to sign in or create an account to use the Chat and PDF Upload features.
                </p>

                <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                    <Button asChild>
                        <Link href={signInUrl}>Sign In</Link>
                    </Button>
                    <Button asChild variant="outline">
                        <Link href={signUpUrl}>Sign Up</Link>
                    </Button>
                </div>

                <div className="mt-6">
                    <Button asChild variant="ghost">
                        <Link href="/" className="inline-flex items-center gap-2">
                            <ArrowLeft className="size-4" />
                            Go Home
                        </Link>
                    </Button>
                </div>
            </div>
        </PageContainer>
    );
}

export default function LoginRequiredPage() {
    return (
        <Suspense
            fallback={
                <PageContainer className="flex min-h-[60vh] items-center justify-center py-12">
                    <div className="w-full max-w-lg rounded-[28px] border border-border bg-card px-6 py-10 text-center shadow-[0_24px_80px_-55px_rgba(15,23,42,0.45)] sm:px-10">
                        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <LockKeyhole className="size-7" />
                        </div>
                        <h1 className="mt-6 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                            Login Required
                        </h1>
                        <p className="mt-4 text-base leading-7 text-muted-foreground">
                            You need to sign in or create an account to use the Chat and PDF Upload features.
                        </p>
                    </div>
                </PageContainer>
            }
        >
            <LoginRequiredContent />
        </Suspense>
    );
}
