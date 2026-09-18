import Link from "next/link";

import { PageContainer } from "@/components/page-shell";
import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
    return (
        <PageContainer className="flex min-h-[60vh] items-center justify-center py-12">
            <div className="w-full max-w-xl rounded-[28px] border border-border bg-card px-6 py-10 text-center shadow-[0_24px_80px_-55px_rgba(15,23,42,0.45)] sm:px-10">
                <p className="text-sm font-medium uppercase tracking-[0.25em] text-muted-foreground">404</p>
                <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                    Page not found
                </h1>
                <p className="mt-4 text-base leading-7 text-muted-foreground">
                    The page you&apos;re looking for doesn&apos;t exist or may have been moved.
                </p>

                <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                    <Button asChild>
                        <Link href="/">Go Home</Link>
                    </Button>
                    <Button asChild variant="outline">
                        <Link href="/chat">Go to Chat</Link>
                    </Button>
                </div>
            </div>
        </PageContainer>
    );
}
