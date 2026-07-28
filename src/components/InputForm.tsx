"use client"
import Form from 'next/form'
import React from 'react'

function Input() {
  const [data, setData] = React.useState({ title: "", content: "" });
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value, }));
  }
  
  // Maintains height of text-area
  React.useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "600px";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [data.content]);

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault()

  }
  return (
    <div>
      <Form onSubmit={handleSubmit} action={""} className="flex-col w-full flex items-center">
        <div className="w-full md:w-[60%] p-2">
          <input
            name='title'
            value={data.title}
            onChange={handleChange}
            required
            className=" block w-full text-4xl md:text-6xl outline-none mb-3"
            placeholder="Title..."
          />
          <textarea
            name='content'
            value={data.content}
            onChange={handleChange}
            required
            maxLength={500}
            ref={textareaRef}
            className="w-full text-xl md:text-3xl outline-none resize-none overflow-hidden"
            placeholder="Start notes here ..."
          />
        </div>
      </Form>
    </div>
  )
}

export default Input