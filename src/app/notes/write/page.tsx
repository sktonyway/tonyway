"use client";
import { Navbar } from "@/components/Navbar";
import InputForm from "@/components/InputForm";
import { useRouter } from "next/navigation";



function Page() {
  const router = useRouter()

  async function submitNote(note: { title: string, content: string }) {
    try {
      await fetch('/api/v1/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: note.title, content: note.content }),
      });
      router.push('/notes')
      
    } catch (error) {
      console.log(error);
    }
  }
  function handleRedirect() {
    router.push('/notes')
  }

  return (
    <>
      <Navbar type="write"><div><button onClick={handleRedirect}>All</button> <button type='submit' form='note-form'>Submit</button></div></Navbar>
      <InputForm titlePlaceHolder="Title" contentPlaceHolder="Start writing Here..." submit={submitNote} />
    </>
  );
}

export default Page;
