"use client";
import { Navbar } from "@/components/Navbar";
import Form from "next/form";
import { useState, useRef, useEffect } from "react";
import Link from 'next/link'
import { useRouter } from "next/navigation";



function Page() {
  const router = useRouter()
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);


  async function handleSubmit(e?: React.FormEvent<HTMLFormElement>) {
    e?.preventDefault();
    if(title.trim() === "" || content.trim() === "") {
      alert("Title and content cannot be empty.");
      router.push('/notes');
      return;
    }
    try {
      const response = await fetch('/api/v1/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
      });
      router.push('/notes')

    } catch (error) {
      console.log(error);
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
      <Navbar type="write" buttons={[{label:"publish", onClick:handleSubmit}]}/>
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
      </Form>
    </>
  );
}

export default Page;
