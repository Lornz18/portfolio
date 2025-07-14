import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { writeFile, unlink } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

const key = process.env.GEMINI_KEY;
const genAI = new GoogleGenerativeAI(key || "");

export const config = {
  api: {
    bodyParser: false, // required to handle formData
  },
};

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file uploaded" },
        { status: 400 }
      );
    }

    // Max 10MB file size
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, error: "File too large. Max 10MB allowed." },
        { status: 413 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = `${randomUUID()}-${file.name}`;
    const filePath = path.join(process.cwd(), "public/uploads", filename);

    // Save file locally
    await writeFile(filePath, buffer);

    // Generate content with Gemini
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            {
              inlineData: {
                data: buffer.toString("base64"),
                mimeType: file.type,
              },
            },
            {
              text: "Please describe the content of this image in detail, and provide a short caption.",
            },
          ],
        },
      ],
    });

    const caption = result.response.text();

    // Delete uploaded file after use
    await unlink(filePath);

    return NextResponse.json({
      success: true,
      caption,
    });
  } catch (error) {
    console.error("Gemini Error:", error);
    return NextResponse.json({
      success: false,
      error: (error as Error).message,
    });
  }
}
