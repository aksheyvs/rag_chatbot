"use client";

import { useState } from "react";
import Link from "next/link";
import { FileText, Loader2, UploadCloud, XCircle } from "lucide-react";

import { AuthGuard } from "@/components/auth-guard";
import { PageContainer } from "@/components/page-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { processPdfFile } from "./actions";

export default function PDFUpload() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

    const uploadFile = async (file: File | null) => {
        if (!file) return;

        setIsLoading(true);
        setMessage(null);

        try {
            const formData = new FormData();
            formData.append("pdf", file);

            const result = await processPdfFile(formData);

            if (result.success) {
                setMessage({
                    type: "success",
                    text: result.message || "PDF processed successfully.",
                });
            } else {
                setMessage({
                    type: "error",
                    text: result.error || "Failed to process PDF.",
                });
            }
        } catch {
            setMessage({ type: "error", text: "An error occurred while processing the PDF." });
        } finally {
            setIsLoading(false);
        }
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        if (!file) return;

        setSelectedFile(file);
        await uploadFile(file);
        e.target.value = "";
    };

    const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);

        const file = e.dataTransfer.files?.[0] ?? null;
        if (!file) return;

        if (file.type !== "application/pdf") {
            setMessage({ type: "error", text: "Please upload a valid PDF file." });
            return;
        }

        setSelectedFile(file);
        await uploadFile(file);
    };

    return (
        <AuthGuard>
            <PageContainer className="py-8 sm:py-12">
                <div className="mx-auto max-w-3xl">
                    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <p className="text-sm font-medium uppercase tracking-[0.22em] text-muted-foreground">
                                Document Retrieval
                            </p>
                            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                                Upload a PDF
                            </h1>
                        </div>
                        <Button asChild variant="outline" className="w-fit">
                            <Link href="/chat">
                                <FileText className="size-4" />
                                Go to Chat
                            </Link>
                        </Button>
                    </div>

                    <Card className="overflow-hidden border border-border/80 bg-card shadow-[0_24px_80px_-55px_rgba(15,23,42,0.45)]">
                        <CardContent className="p-5 sm:p-8">
                            <div
                                onDragOver={(e) => {
                                    e.preventDefault();
                                    setIsDragging(true);
                                }}
                                onDragLeave={() => setIsDragging(false)}
                                onDrop={handleDrop}
                                className={`rounded-2xl border border-dashed p-6 text-center transition-all sm:p-8 ${
                                    isDragging
                                        ? "border-primary bg-primary/5 shadow-inner"
                                        : "border-border bg-muted/20 hover:border-primary/40 hover:bg-accent/40"
                                }`}
                            >
                                <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                                    <UploadCloud className="size-6" />
                                </div>
                                <h2 className="mt-4 text-xl font-semibold text-foreground">Upload a document</h2>
                                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                                    Upload a PDF and ask questions about its contents using AI-powered retrieval.
                                </p>

                                <input
                                    type="file"
                                    accept=".pdf,application/pdf"
                                    className="hidden"
                                    onChange={handleFileChange}
                                    disabled={isLoading}
                                />

                                <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                                    <Button
                                        type="button"
                                        onClick={() =>
                                            document.querySelector<HTMLInputElement>('input[type="file"]')?.click()
                                        }
                                        disabled={isLoading}
                                    >
                                        {isLoading ? "Processing..." : "Choose PDF"}
                                    </Button>
                                    {selectedFile ? (
                                        <Button type="button" variant="outline" onClick={() => setSelectedFile(null)}>
                                            Clear
                                        </Button>
                                    ) : null}
                                </div>
                            </div>

                            {selectedFile ? (
                                <div className="mt-6 rounded-2xl border border-border bg-muted/20 p-4">
                                    <div className="flex items-center justify-between gap-3">
                                        <div className="flex min-w-0 items-center gap-3">
                                            <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                                <FileText className="size-4" />
                                            </div>
                                            <div className="min-w-0">
                                                <div className="truncate text-sm font-medium text-foreground">
                                                    {selectedFile.name}
                                                </div>
                                                <div className="text-xs text-muted-foreground">
                                                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB · PDF
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : null}

                            {isLoading && (
                                <div className="mt-6 flex items-center gap-2 rounded-xl border border-border bg-muted/20 px-4 py-3 text-sm text-muted-foreground">
                                    <Loader2 className="size-4 animate-spin text-primary" />
                                    Processing PDF and indexing document content…
                                </div>
                            )}

                            {message && (
                                <div
                                    className={`mt-6 rounded-xl border px-4 py-3 text-sm ${
                                        message.type === "success"
                                            ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/60 dark:bg-emerald-950/30 dark:text-emerald-300"
                                            : "border-red-200 bg-red-50 text-red-700 dark:border-red-900/60 dark:bg-red-950/30 dark:text-red-300"
                                    }`}
                                >
                                    <div className="flex items-start gap-2">
                                        {message.type === "error" ? (
                                            <XCircle className="mt-0.5 size-4 shrink-0" />
                                        ) : (
                                            <FileText className="mt-0.5 size-4 shrink-0" />
                                        )}
                                        <span>{message.text}</span>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </PageContainer>
        </AuthGuard>
    );
}
