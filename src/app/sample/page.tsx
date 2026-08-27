"use client";
import {
  UploadCloud,
  ImageIcon,
  Sparkles,
  ScanSearch,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import Reveal from "../components/reveal";

export default function SamplePage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  const processFile = (selectedFile: File | null) => {
    if (!selectedFile) return;

    const maxSizeInBytes = 5 * 1024 * 1024; // 5MB

    if (selectedFile.size > maxSizeInBytes) {
      setMessage("❌ File is too large. Max size is 10MB.");
      setFile(null);
      setPreview(null);
      setCaption("");
      return;
    }

    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
    setCaption("");
    setMessage("");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    processFile(e.target.files?.[0] || null);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const dropped = e.dataTransfer.files?.[0] || null;
    if (dropped && dropped.type.startsWith("image/")) {
      processFile(dropped);
    } else if (dropped) {
      setMessage("❌ Please drop an image file.");
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("No file selected");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setMessage("File too large. Max 10MB allowed.");
      return;
    }

    setLoading(true);
    setCaption("");
    setMessage("Uploading and generating caption...");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (res.ok && result.success) {
        setCaption(result.caption);
        setMessage("✅ Upload and caption generation successful!");
      } else {
        setMessage(`❌ Error: ${result.error || "Unknown error occurred"}`);
      }
    } catch (err) {
      console.error("Upload error:", err);
      setMessage("❌ Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-grid" />
      <div className="absolute top-[-8rem] right-[-8rem] w-[28rem] h-[28rem] bg-blue-600/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-8rem] left-[-8rem] w-[28rem] h-[28rem] bg-sky-500/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="container relative pt-32 pb-24">
        {/* Page header */}
        <Reveal className="text-center flex flex-col items-center gap-4 mb-12">
          <span className="section-badge">AI Lab</span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            AI Image <span className="text-gradient">Description</span>
          </h1>
          <p className="text-secondary max-w-xl">
            Upload an image and get a detailed description powered by Gemini
            AI.
            <br />
            <span className="text-sm text-secondary/70">
              (This feature is used in production on the BidsnBuys project.)
            </span>
          </p>
        </Reveal>

        <div className="max-w-2xl mx-auto space-y-6">
          {/* Upload dropzone */}
          <Reveal delay={100}>
            <label
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              className={`glass glass-hover rounded-3xl p-10 flex flex-col items-center justify-center gap-4 text-center cursor-pointer transition-all duration-300 ${
                isDragging
                  ? "border-sky-400/60 bg-sky-400/5 shadow-[0_0_40px_-8px_rgba(34,211,238,0.4)]"
                  : ""
              }`}
            >
              <input
                type="file"
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-500/20 to-blue-500/20 border border-white/10 flex items-center justify-center">
                <UploadCloud size={28} className="text-sky-300" />
              </div>
              <div>
                <p className="font-semibold text-light">
                  {file ? file.name : "Click to upload or drag & drop"}
                </p>
                <p className="text-secondary text-sm mt-1">
                  PNG, JPG or WEBP · Max 5MB
                </p>
              </div>
            </label>
          </Reveal>

          {/* Preview */}
          {preview && (
            <div className="glass rounded-3xl p-4">
              <div className="flex items-center gap-2 text-secondary text-sm mb-3 px-1">
                <ImageIcon size={16} className="text-blue-300" />
                Preview
              </div>
              <div className="relative rounded-2xl overflow-hidden border border-white/10">
                <Image
                  src={preview}
                  alt="Preview"
                  width={800}
                  height={600}
                  className="w-full max-h-[24rem] object-contain bg-black/30"
                />
              </div>
            </div>
          )}

          {/* Analyze button */}
          <button
            onClick={handleUpload}
            disabled={loading || !file}
            className="btn-gradient w-full disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? (
              <>
                <ScanSearch size={18} className="animate-pulse" />
                Analyzing image...
              </>
            ) : (
              <>
                <Sparkles size={18} />
                Upload & Analyze
              </>
            )}
          </button>

          {/* Status message */}
          {message && (
            <p
              className={`text-center text-sm font-medium ${
                message.startsWith("❌")
                  ? "text-red-400"
                  : message.startsWith("✅")
                  ? "text-sky-400"
                  : "text-secondary animate-pulse"
              }`}
            >
              {message}
            </p>
          )}

          {/* AI result */}
          {caption && (
            <div className="relative p-[1px] rounded-3xl bg-gradient-to-br from-sky-400/40 via-blue-500/30 to-transparent">
              <div className="bg-[#0a0a0d] rounded-[calc(1.5rem-1px)] p-7 md:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-400 to-blue-500 flex items-center justify-center">
                    <Sparkles size={18} className="text-white" />
                  </div>
                  <h2 className="text-lg font-bold">AI Description</h2>
                </div>
                <p className="text-secondary text-sm md:text-[15px] leading-relaxed whitespace-pre-line">
                  {caption}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
