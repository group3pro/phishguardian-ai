
import { toast } from "sonner";

// Using a free-tier AI API for the chatbot responses
const API_URL = "https://api.openai.com/v1/chat/completions";
// This is a demo key and should be replaced with a real one in production
const API_KEY = "sk-demo-1234567890"; 

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
  
  // For demo purposes, use predefined responses instead of actual API calls
  // This avoids API costs while demonstrating the UI functionality
  
  const cybersecurityResponses = [
    "Phishing emails often create a sense of urgency to trick you into acting quickly without thinking. Take your time to evaluate any message asking for immediate action.",
    "Always verify the sender's email address carefully. Phishers often use domains that look similar to legitimate ones, with slight spelling differences.",
    "Be cautious of unsolicited emails asking for personal information or login credentials. Legitimate organizations typically don't ask for sensitive information via email.",
    "Enable two-factor authentication wherever possible to add an extra layer of security, even if your password is compromised.",
    "Keep your software and operating systems updated to protect against known vulnerabilities that hackers might exploit.",
    "Use strong, unique passwords for each of your accounts. Consider using a password manager to help generate and store complex passwords.",
    "Hover over links before clicking to verify the actual URL destination. If it looks suspicious or doesn't match the supposed organization, don't click.",
    "Be wary of emails with poor grammar or spelling errors, as these are common in phishing attempts from non-native speakers.",
    "Never share sensitive information via email, even if the request seems legitimate. Contact the organization directly through official channels instead.",
    "If an offer seems too good to be true, it probably is. Be skeptical of unexpected winnings, inheritances, or rewards.",
    "Check for HTTPS in the URL and a lock icon in your browser when visiting websites, especially when entering personal information.",
    "Regularly monitor your accounts for suspicious activity and enable notifications for transactions when possible.",
    "Use a reputable antivirus and anti-malware solution, and keep it updated to protect against the latest threats.",
    "Be cautious about attachments, especially executable files (.exe, .bat) or Microsoft Office documents with macros.",
    "Consider using a dedicated email for important accounts (banking, investments) separate from the one you use for general purposes."
  ];
  
  // For demo purposes, return a random response
  const randomIndex = Math.floor(Math.random() * cybersecurityResponses.length);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return cybersecurityResponses[randomIndex];
};
