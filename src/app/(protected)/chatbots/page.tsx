import { api } from "@/lib/api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import CreateChatbot from "@/components/create-chatbot";

export default async function ChatbotsPage() {
    const chatbotsRes = await api("/chatbots", {});
    const chatbots = await chatbotsRes.json().then((data) => data.data);

    return (
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 md:p-6 relative">
            <div className="col-span-full p-4 md:p-6 bg-muted  rounded-md flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold mb-2">Chatbots</h2>
                    <p className="text-muted-foreground">
                        Manage and create chatbots for your customer service.
                    </p>
                </div>
                <CreateChatbot />
            </div>
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
                                    {chatbot.url}
                                </a>
                            </div>
                        </div>
                        <Button>Select as Default</Button>
                    </CardContent>
                </Card>
            ))}
        </section>
    );
}
