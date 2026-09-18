"use client";

import { useState, Fragment } from "react";
import { useChat } from "@ai-sdk/react";

import {
    PromptInput,
    PromptInputBody,
    type PromptInputMessage,
    PromptInputSubmit,
    PromptInputTextarea,
} from "@/components/ai-elements/prompt-input";
import { Message, MessageContent } from "@/components/ai-elements/message";
import { Conversation, ConversationContent, ConversationScrollButton } from "@/components/ai-elements/conversation";
import { Spinner } from "@/components/ui/spinner";
import Markdown from "react-markdown";

export default function RAGChatBot() {
    const [input, setInput] = useState("");
    const { messages, sendMessage, status } = useChat();

    const handleSubmit = (message: PromptInputMessage) => {
        sendMessage({ text: message.text });
        setInput("");
    };

    return (
        <div className="max-w-4xl mx-auto p-6 relative size-full h-[calc(100vh-4rem)]">
            <div className="flex flex-col h-full">
                <Conversation className="h-full">
                    <ConversationContent>
                        {messages.map((message) => (
                            <div key={message.id}>
                                {message.parts.map((part, i) => {
                                    switch (part.type) {
                                        case "text":
                                            return (
                                                <Fragment key={`${message.id}-${i}`}>
                                                    <Message from={message.role}>
                                                        <MessageContent>
                                                            <Markdown>{part.text}</Markdown>
                                                        </MessageContent>
                                                    </Message>
                                                </Fragment>
                                            );
                                        default:
                                            return null;
                                    }
                                })}
                            </div>
                        ))}

                        {(status === "submitted" || status === "streaming") && <Spinner />}
                    </ConversationContent>
                    <ConversationScrollButton />
                </Conversation>

                <PromptInput className="mt-4" onSubmit={handleSubmit}>
                    <PromptInputBody>
                        <PromptInputTextarea value={input} onChange={(e) => setInput(e.target.value)} />
                    </PromptInputBody>

                    <PromptInputSubmit />
                </PromptInput>
            </div>
        </div>
    );
}
