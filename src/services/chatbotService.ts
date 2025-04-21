
import { toast } from "sonner";
import { getCybersecurityResponse } from "./geminiService";

export interface ChatMessage {
  role: "assistant" | "user";
  content: string;
}

export const getAIResponse = async (messages: ChatMessage[]): Promise<string> => {
  const userInput = messages.find(msg => msg.role === "user")?.content;
  
  if (!userInput || !userInput.trim()) {
    toast.error("Please enter a message");
    throw new Error("Empty message");
  }
  
  try {
    // Get response from Gemini with cybersecurity focus
    const response = await getCybersecurityResponse(userInput);
    return response;
  } catch (error) {
    console.error("Error getting AI response:", error);
    toast.error("Failed to get a response. Please try again.");
    
    // Fallback response
    return "I'm sorry, I couldn't process your request at the moment. Please try again later.";
  }
};
