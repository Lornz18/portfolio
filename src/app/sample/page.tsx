"use client";
import { MessageCircle } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import Chatbot from "../components/chatbot";

export default function SamplePage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // --- Start of Chatbot State and Handlers ---
    const [isChatOpen, setIsChatOpen] = useState(false); // State to control chat visibility
  
    const handleOpenChat = () => {
      setIsChatOpen(true);
    };
  
    const handleCloseChat = () => {
      setIsChatOpen(false);
      // You can add other logic here if needed, e.g., logging
      console.log("Chatbot closed by user.");
    };
    // --- End of Chatbot State and Handlers ---

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;

    if (selectedFile) {
      const maxSizeInBytes = 10 * 1024 * 1024; // 10MB

      if (selectedFile.size > maxSizeInBytes) {
        setMessage("File is too large. Max size is 10MB.");
        setFile(null);
        setPreview(null);
        return;
      }

      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setCaption("");
      setMessage("");
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("No file selected");
      return;
    }

    setLoading(true);
    setCaption("");
    setMessage("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (result.success) {
        setCaption(result.caption);
        setMessage("Upload and caption generation successful!");
      } else {
        setMessage(`Error: ${result.error}`);
      }
    } catch {
      setMessage("Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container p-4">
      <h1 className="text-2xl font-bold mb-4">AI Image Description</h1>
      <p className="mb-4">
        Upload an image to get a detailed description powered by Gemini AI.
        <br />
        <span className="text-sm text-gray-500">
          (I have used this feature on the bidsnbuys project.)
        </span>
      </p>

      <div className="rounded border border-gray-300 w-fit p-3 cursor-pointer">
        <input
          type="file"
          onChange={handleFileChange}
          accept="image/*"
          className="cursor-pointer"
        />
      </div>

      {preview && (
        <Image
          src={preview}
          alt="Preview"
          width={256}
          height={256}
          className="mt-4 rounded shadow border border-gray-300"
        />
      )}

      <button
        onClick={handleUpload}
        disabled={loading}
        className={`mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Analyzing image..." : "Upload & Analyze"}
      </button>

      {message && <p className="mt-4 text-green-600">{message}</p>}

      {caption && (
        <div className="mt-6 p-4 border rounded bg-gray-50">
          <h2 className="text-lg font-semibold mb-2">AI Description:</h2>
          <p className="text-gray-800 whitespace-pre-line">{caption}</p>
        </div>
      )}

      {/* Button to open the Chatbot */}
      {!isChatOpen && (
        <button
          onClick={handleOpenChat}
          className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-xl transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 z-50"
          aria-label="Open chat"
        >
          <MessageCircle size={24} />
        </button>
      )}

      {/* Conditionally render the Chatbot */}
      {isChatOpen && <Chatbot onClose={handleCloseChat} isclose={isChatOpen} />}
    </div>
  );
}
