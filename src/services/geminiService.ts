
import { toast } from "sonner";

// Gemini API configuration
const API_KEY = "AIzaSyBLU0nW5Fk5iIKkuEGozJrcGcUPJwrIIZI";
const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

export interface GeminiResponse {
  candidates?: {
    content: {
      parts: {
        text?: string;
      }[];
    };
    finishReason: string;
  }[];
  promptFeedback?: {
    blockReason?: string;
    safetyRatings?: {
      category: string;
      probability: string;
    }[];
  };
}

export const generateGeminiResponse = async (prompt: string): Promise<string> => {
  try {
    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Gemini API error:", errorData);
      throw new Error(errorData.error?.message || "Failed to get response from Gemini");
    }

    const data: GeminiResponse = await response.json();

    // Check if the response was blocked for safety reasons
    if (data.promptFeedback?.blockReason) {
      throw new Error(`Response blocked: ${data.promptFeedback.blockReason}`);
    }

    // Extract text from the response
    if (!data.candidates || data.candidates.length === 0 || !data.candidates[0].content.parts[0].text) {
      throw new Error("No valid response received from Gemini");
    }

    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error("Error generating Gemini response:", error);
    throw error;
  }
};

// Function to analyze email content for phishing
export const analyzeEmailWithGemini = async (emailContent: string): Promise<any> => {
  const prompt = `
You are a cybersecurity expert specializing in identifying phishing emails and malicious content.
Analyze this email content and determine if it's likely a phishing attempt.

Email content:
"""
${emailContent}
"""

Provide a detailed analysis in JSON format with the following structure:
{
  "score": 0.85, // A number between 0 and 1 representing the likelihood of being a phishing email (higher = more suspicious)
  "threatLevel": "dangerous", // One of: "safe", "suspicious", "dangerous"
  "indicators": ["Contains suspicious link", "Asks for personal information", "Creates false urgency"], // List of suspicious indicators found
  "details": {
    "senderAnalysis": "Analysis of the sender information",
    "contentAnalysis": "Analysis of the email content",
    "linkAnalysis": "Analysis of any links found",
    "urgencyLevel": "Assessment of urgency tactics used"
  }
}
`;

  try {
    const response = await generateGeminiResponse(prompt);
    
    // Parse the JSON response
    // Use a try-catch block in case the response isn't properly formatted JSON
    try {
      return JSON.parse(response);
    } catch (parseError) {
      console.error("Error parsing Gemini response as JSON:", parseError);
      toast.error("Error processing AI analysis");
      throw new Error("Failed to parse AI analysis");
    }
  } catch (error) {
    console.error("Error analyzing email with Gemini:", error);
    throw error;
  }
};

// Function for cybersecurity chatbot
export const getCybersecurityResponse = async (userMessage: string): Promise<string> => {
  const prompt = `
You are a cybersecurity assistant specializing in phishing, cyber threats, hacking, and online security.

User query: "${userMessage}"

Guidelines:
1. ONLY answer questions related to cybersecurity, phishing, hacking, or online security.
2. If the question is not related to cybersecurity, respond with: "I can only answer questions related to cybersecurity and online safety."
3. Provide factual, educational information about cybersecurity concepts.
4. If asked to assist with illegal activities, respond with: "I cannot provide information on how to perform illegal activities."
5. Be concise and focus on practical security advice and educational information.

Respond to the user's query according to these guidelines:
`;

  try {
    const response = await generateGeminiResponse(prompt);
    return response;
  } catch (error) {
    console.error("Error getting cybersecurity response from Gemini:", error);
    throw error;
  }
};
