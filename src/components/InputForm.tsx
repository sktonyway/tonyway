"use client"
import React from 'react'

interface NoteEditorProps {
  titlePlaceHolder?: string;
  contentPlaceHolder?: string;
  submit: (data: { title: string; content: string }) => void | Promise<void>;
}
function Input({ titlePlaceHolder, contentPlaceHolder, submit }: NoteEditorProps) {

  const [data, setData] = React.useState({ title: "", content: "" });
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  // Maintains state
  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value, }));
  }

  // Maintains height of text-area
  React.useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [data.content]);

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    // validation then data is passed upward
    if (!data.title.trim() || !data.content.trim()) return;
    submit(data);
  }
  // component
  return (
    <form id="note-form" onSubmit={handleSubmit} action={""} className="flex-col w-full flex items-center p-2">
      <input
        name='title'
        value={data.title}
        onChange={handleChange}
        className=" block w-full text-4xl md:text-6xl outline-none mb-3"
        placeholder={titlePlaceHolder}
      />
      <textarea
        name='content'
        value={data.content}
        onChange={handleChange}
        maxLength={1500}
        ref={textareaRef}
        className="md:text-[24px] leading-[1.6] font-normal w-full outline-none resize-none overflow-hidden"
        placeholder={contentPlaceHolder}
      />
    </form>
  )
}

export default Input