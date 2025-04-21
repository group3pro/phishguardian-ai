
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import { getAIResponse, ChatMessage } from "@/services/chatbotService";

export const SecurityChat = () => {
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    { role: "assistant", content: "Ask me anything about cybersecurity!" }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!chatMessage.trim()) {
      toast.error("Please enter a message to send");
      return;
    }

    const userMessage: ChatMessage = {
      role: "user",
      content: chatMessage
    };
    
    setChatHistory(prev => [...prev, userMessage]);
    setChatMessage("");
    setIsLoading(true);
    
    try {
      const response = await getAIResponse([...chatHistory, userMessage]);
      setChatHistory(prev => [...prev, { role: "assistant", content: response }]);
    } catch (error) {
      console.error("Error getting chatbot response:", error);
      toast.error("Failed to get a response");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setChatHistory([{ role: "assistant", content: "Ask me anything about cybersecurity!" }]);
    setChatMessage("");
  };

  return (
    <div className="space-y-4">
      <div className="border rounded-md p-3 h-[200px] overflow-y-auto mb-3">
        {chatHistory.map((message, index) => (
          <div 
            key={index}
            className={`flex mb-3 ${message.role === "assistant" ? "justify-start" : "justify-end"}`}
          >
            <div 
              className={`p-2 rounded-lg max-w-[80%] ${
                message.role === "assistant" 
                  ? "bg-secondary/60 text-foreground" 
                  : "bg-primary text-primary-foreground"
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <Input 
          placeholder="Ask a question about phishing or cybersecurity..." 
          value={chatMessage}
          onChange={(e) => setChatMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <Button 
          onClick={handleSendMessage}
          disabled={isLoading || !chatMessage.trim()}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <MessageSquare className="h-4 w-4" />
          )}
        </Button>
        <Button 
          variant="outline" 
          onClick={handleReset}
          disabled={chatHistory.length <= 1}
        >
          Reset
        </Button>
      </div>
    </div>
  );
};
