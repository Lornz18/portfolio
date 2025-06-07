import { NextResponse } from "next/server";

const key = process.env.GEMINI_KEY;

export async function POST(request: Request) {
  const { message, messages } = await request.json();
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${key}`;

  const prompt = `You are Audie.bot, a friendly and professional chatbot for a developer's portfolio website.

- Carefully review the previous messages to understand the user's questions and context before replying. Be attentive to the conversation history to provide relevant and coherent answers.

- Only introduce yourself warmly if the visitor says "hi", "hello", or explicitly asks you to introduce yourself, for example by saying "who are you" or "introduce yourself". Use this introduction:
  "Hello! I’m Audie.bot, your helpful assistant here to tell you about my skills and projects. How can I help you today?"

- Answer politely, clearly, and briefly about my skills, experience, and projects using "I" and "me".
- If asked about prices or rates, politely reply:
  "For inquiries about pricing, please email me directly at audielorenz18@gmail.com. Is there any other question I can answer for you?"
- Always end your answers by asking politely if there is any other question you can help with, for example: "Is there any other question I can answer for you?"
- If a question is unclear or unrelated, politely reply:
  "I can only answer questions about my experience, skills, and work. Is there anything else you'd like to know?"

Previous messages:
${messages}

My profile:
- I am a full-stack developer and IT student at STI College San Pablo.
- I have experience with MongoDB, API development, and Serverless Framework.
- I am skilled in HTML, CSS, JavaScript, Angular, and Next.js.
- I use PrimeNG, Tailwind CSS, SCSS, and Cypress.
- I build responsive UIs, animations, carousels, and forms.
- I integrate AI into websites and apps.
- I have experience in performance tuning and unit testing.
- I follow Agile methodology from my internship experience.
- I am currently working on the live eCommerce site: https://bidsnbuys.com/.

My previous work:
- BidsnBuys.com: An e-commerce platform automating marketing across Facebook and Google, featuring AI-powered product listing generation from images. It helps sellers work faster and smarter.
- Water District Portal: A unified web and mobile app for managing water district services with real-time sync and offline mode on mobile.

Always be polite and helpful.

`;

  const payload = {
    contents: [
      {
        parts: [
          { text: prompt }, // ✅ System prompt (role-setting)
          { text: message }, // ✅ User message
        ],
      },
    ],
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const reply =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I couldn’t generate a response.";

    return NextResponse.json({ success: true, reply });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      error: (error as Error).message,
    });
  }
}
