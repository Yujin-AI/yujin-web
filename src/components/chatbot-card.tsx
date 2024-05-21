"use client";

import { selectChatbotAction } from "@/actions/select-chatbot-action";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { toast } from "./ui/use-toast";

export default function ChatbotCard(props: any) {
    const { chatbots } = props;

    const handleSelectChatbot = async (id: string) => {
        const res = await selectChatbotAction(id);
        if (res?.success && res?.status === 200) {
            toast({
                title: "Chatbot Selected",
                description: res.message,
            });
        }
    };

    return (
        <>
            {chatbots.map((chatbot: any) => (
                <Card
                    className="border rounded-md hover:shadow-md transition-shadow"
                    key={chatbot.id}
                >
                    <CardContent className="p-4 flex flex-col gap-2">
                        <div className="flex items-center gap-3">
                            <Avatar>
                                <AvatarImage
                                    alt={chatbot.name}
                                    src={chatbot.avatar}
                                />
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
                        <Button onClick={() => handleSelectChatbot(chatbot.id)}>
                            Select as Default
                        </Button>
                    </CardContent>
                </Card>
            ))}
        </>
    );
}
