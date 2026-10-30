"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ClerkProvider signInUrl="/sign-in" signUpUrl="/sign-up">
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
                scriptProps={{ type: typeof window === "undefined" ? "text/javascript" : "application/json" }}
            >
                {children}
            </ThemeProvider>
        </ClerkProvider>
    );
}
