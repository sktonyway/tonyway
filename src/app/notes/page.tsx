"use client";
import { Navbar } from "@/components/Navbar";
import Form from "next/form";
import { useState, useRef, useEffect } from "react";
import Link from 'next/link'


function Page() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);


  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    try {
      const response = await fetch('/api/v1/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
      });

      setTitle('');
      setContent('');

    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  }

  useEffect(() => {
  if (textareaRef.current) {
    textareaRef.current.style.height = "600px";
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  }
}, [content]);

  return (
    <>
      <Navbar />
      <Form onSubmit={handleSubmit} action={""} className="flex-col w-full flex items-center">
        <div className="w-full md:w-[60%] p-2">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className=" block w-full text-4xl md:text-6xl outline-none mb-3"
            placeholder="Title..."
          />
          <textarea
            value={content}
            onChange={handleChange}
            required
            maxLength={500}
            ref={textareaRef}
            className="w-full text-xl md:text-3xl outline-none resize-none overflow-hidden"
            placeholder="Start notes here ..."
          />
        </div>
        <button type="submit" className="block">Submit</button>
        <Link href="/notes/written" className="text-[12px] text-blue-300 bg-blue-600">All notes</Link>
        <p className="text-red-500 text-[10px]">
          This notes thing is just for temporary showing all notes and will be scheduled later.
        </p>
      </Form>
    </>
  );
}

export default Page;
