import { streamText } from 'ai';

// Simulated AI response function
async function simulateAIResponse(message: string): Promise<string> {
  // Simple response logic based on user input
  const responses = [
    "That's an interesting point. Can you elaborate?",
    "I understand. Let me think about that for a moment.",
    "Thank you for sharing. Here's what I think about that...",
    "That's a complex topic. Let's break it down step by step.",
    "I see where you're coming from. Have you considered an alternative perspective?",
  ];
  
  // Simulate processing time
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
  
  return responses[Math.floor(Math.random() * responses.length)];
}

export async function POST(req: Request) {
  const { messages } = await req.json();
  const userMessage = messages[messages.length - 1].content;
  
  const aiResponse = await simulateAIResponse(userMessage);
  
  const result = streamText({
    model: {
      async invoke() {
        return { text: aiResponse };
      },
      // Add other required properties to satisfy the AIModel interface
      id: 'simulated-ai',
      provider: 'simulated',
    },
    messages,
  });

  return result.toDataStreamResponse();
}

