"use client";
import { Navbar } from "@/components/Navbar";
import Form from "next/form";
import { useState } from "react";
import Link from 'next/link'


function Page() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    try {
      const response = await fetch('/api/v1/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
      });

      setTitle('')
      setContent('')

    }catch(error){
      console.log(error)
    }
  }

  return (
    <>
      <Navbar />
      <Form onSubmit={handleSubmit} action={""} className="flex-col w-full flex items-center">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="border block w-[80%]"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          maxLength={500}
          rows={4}
          className="w-[80%]"
        />
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
