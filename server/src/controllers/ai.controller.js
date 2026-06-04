import groq from "../services/groq.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";

export const generateAIExplanation = async (
  type,
  title,
  content,
  messages = [],
) => {
  let prompt = "";
  let maxTokens = 300;

  if (type === "news") {
    prompt = `
      Explain this space news for beginners.
        
      Title: ${title}
        
      Content:
      ${content}
        
      Rules:
      - No introductions or filler
      - Start directly
      - Short paragraphs
      - Use markdown bold for key terms
      - Explain why it matters
      - Concise and engaging
      `;
  }

  if (type === "apod") {
    prompt = `
      Explain this NASA astronomy topic simply.
        
      Title: ${title}
        
      Description:
      ${content}
        
      Rules:
      - Start directly
      - No filler text
      - Explain scientific concepts clearly
      - Use markdown bold for important terms
      - Short readable paragraphs
      `;
  }

  if (type === "isro") {
    prompt = `
      Explain this ISRO update simply.
        
      Title: ${title}
        
      Content:
      ${content}
        
      Rules:
      - Start directly
      - Explain importance for India's space program
      - Simple language
      - Use markdown bold for key terms
      - Concise response
      `;
  }

  if (type === "launch") {
    maxTokens = 800;

    prompt = `
      Explain this space launch for beginners.

      Mission: ${title}

      Details:
      ${content}

      Rules:
      - No introductions or filler
      - Use markdown headings
      - Use markdown bold for key points
      - Short readable paragraphs
      - Concise but informative

      Format:

      ## Mission Goal

      ## Rocket Used

      ## Why It Matters

      ## Interesting Fact
      `;
  }

  if (type === "component") {
    maxTokens = 800;
    prompt = `
      Explain this space technology component simply for beginners.

      Component: ${title}

      Information:
      ${content}

      Rules:
      - Start directly
      - No filler introductions
      - Explain purpose clearly
      - Explain how it works
      - Mention where it is used
      - Use markdown bold for important terms
      - Short readable paragraphs
      - Concise but educational

      Format:

      ## Purpose

      ## How It Works

      ## Where It Is Used

      ## Interesting Fact
`;
  }

  const cleanedContent = content?.replace(/\s+/g, " ")?.trim()?.slice(0, 3000);

  const groqMessages = [
    {
      role: "system",
      content: `
        You are Orbita AI, a futuristic educational space assistant.
            
        Rules:
        - Answer directly
        - No filler introductions
        - Beginner-friendly explanations
        - Use markdown formatting
        - Use short paragraphs
        - Keep responses concise but informative
        - During follow-up conversations, answer ONLY the user's latest question
        - Do NOT repeat the entire original explanation unless necessary
`,
    },
  ];

  if (messages.length === 0) {
    // First AI explanation
    groqMessages.push({
      role: "user",
      content: prompt,
    });
  } else {
    // Follow-up conversation
    groqMessages.push(
      {
        role: "user",
        content: `
Context:

Title: ${title}

Content:
${cleanedContent}
`,
      },

      ...messages,
    );
  }

  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",

    messages: groqMessages,

    temperature: 0.5,

    max_tokens: maxTokens,
  });

  return response.choices[0]?.message?.content;
};

const explainContent = asyncHandler(async (req, res) => {
  const { type, title, content, messages = [] } = req.body;

  const explanation = await generateAIExplanation(
    type,
    title,
    content,
    messages,
  );

  return res
    .status(200)
    .json(new ApiResponse(200, explanation, "AI explanation generated"));
});

const chatWithAI = asyncHandler(async (req, res) => {
  const { messages = [] } = req.body;

  if (!messages.length) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "Messages are required"));
  }

  const systemPrompt = `
    You are Orbita AI, a futuristic space intelligence assistant.
  
    Rules:
    - Focus on space, astronomy, rockets, science, and futuristic technologies
    - Answer conversationally
    - Use markdown formatting
    - Keep responses readable and engaging
    - No unnecessary introductions
    - Explain complex topics simply
    `;

  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",

    messages: [
      {
        role: "system",
        content: systemPrompt,
      },

      ...messages,
    ],

    temperature: 0.6,
    max_tokens: 700,
  });

  const text =
    response.choices[0]?.message?.content || "Unable to generate response.";

  return res
    .status(200)
    .json(new ApiResponse(200, { response: text }, "Chat response generated"));
});

export { explainContent, chatWithAI };
