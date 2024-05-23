import { cookies } from "next/headers";

import { api } from "@/lib/api";
import ChatbotCard from "@/components/chatbot-card";
import CreateChatbot from "@/components/create-chatbot";

export default async function ChatbotsPage() {
    const chatbotsRes = await api("/chatbots", {});
    const chatbots = await chatbotsRes.json().then((data) => data.data);
    const selectedChatbot = cookies().get("selectedChatbot")?.value;

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
                <ChatbotCard
                    id={chatbot.id}
                    chatbot={chatbot}
                    selectedChatbot={selectedChatbot}
                />
            ))}
        </section>
    );
}
