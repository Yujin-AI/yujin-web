"use client";

import { selectChatbotAction } from "@/actions/select-chatbot-action";

import { cn } from "@/lib/utils";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

export default function ChatbotCard(props: any) {
    const { chatbot, selectedChatbot } = props;

    const isSelected =
        chatbot.id === selectedChatbot || chatbot.slug === selectedChatbot;

    const handleSelectChatbot = async () => {
        await selectChatbotAction(chatbot.slug);
    };

    return (
        <Card className="border rounded-md hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex flex-col gap-2">
                <div className="flex items-center gap-3">
                    <Avatar>
                        <AvatarImage alt={chatbot.name} src={chatbot.avatar} />
                        <AvatarFallback>{chatbot.name}</AvatarFallback>
                    </Avatar>
                    <div>
                        <h3 className="text-lg font-semibold">
                            {chatbot.name}
                        </h3>
                        <a
                            target="_blank"
                            className="text-muted-foreground"
                            href={chatbot.url}
                        >
                            {`${chatbot.url.slice(0, 20)}...`}
                        </a>
                    </div>
                </div>
                <Button
                    onClick={() => handleSelectChatbot()}
                    disabled={isSelected}
                    className={cn(
                        isSelected ? "cursor-not-allowed" : "cursor-pointer"
                    )}
                >
                    {isSelected ? "Selected" : "Select as Default"}
                </Button>
            </CardContent>
        </Card>
    );
}
