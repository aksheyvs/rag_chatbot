"use client";

import { SignInButton, SignOutButton, SignUpButton, useAuth } from "@clerk/nextjs";
import { Button } from "./ui/button";

export const NAvigation = () => {
    const { isLoaded, isSignedIn } = useAuth();

    return (
        <nav className="border-b border-(--foreground)/10">
            <div className="flex container h-16 items-center justify-between px-4 mx-auto">
                <div className="text-xl font-semibold">RAG Chatbot</div>

                <div className="flex gap-2">
                    {isLoaded && !isSignedIn ? (
                        <>
                            <SignInButton mode="modal">
                                <Button variant="ghost">Sign In</Button>
                            </SignInButton>
                            <SignUpButton mode="modal">
                                <Button>Sign Up</Button>
                            </SignUpButton>
                        </>
                    ) : null}

                    {isLoaded && isSignedIn ? (
                        <SignOutButton>
                            <Button variant="outline">Sign Out</Button>
                        </SignOutButton>
                    ) : null}
                </div>
            </div>
        </nav>
    );
};
