"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useAuth } from "@clerk/nextjs";

import { PageContainer } from "@/components/page-shell";

export function AuthGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const { isLoaded, isSignedIn } = useAuth();

    useEffect(() => {
        if (isLoaded && !isSignedIn) {
            router.replace("/login-required?redirect=/chat");
        }
    }, [isLoaded, isSignedIn, router]);

    if (!isLoaded) {
        return (
            <PageContainer className="flex min-h-[60vh] items-center justify-center py-12">
                <div className="flex items-center gap-3 rounded-full border border-border bg-card px-4 py-3 text-sm text-muted-foreground shadow-sm">
                    <Loader2 className="size-4 animate-spin text-primary" />
                    Checking your session…
                </div>
            </PageContainer>
        );
    }

    if (!isSignedIn) {
        return null;
    }

    return <>{children}</>;
}
