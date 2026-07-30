"use client";
import { Navbar } from "@/components/Navbar";
import InputForm from "@/components/InputForm";
import { useRouter } from "next/navigation";



function Page() {
  const router = useRouter()

    async function fillJournal(data: { title: string; content: string; }){
      try {
        await fetch('/api/v1/journal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: data.title, content: data.content }),
      });
      router.push('/journal')
      } catch (error) {
      throw new Error("Function not implemented.");
      console.error(error)  
      }
    } 
    function handleRedirect() {
      router.push('/journal')
    }


  return (
    <>
      <Navbar type="write"><div><button onClick={handleRedirect}>Earlier</button> <button type='submit' form='note-form'>Submit</button></div></Navbar>
      <InputForm titlePlaceHolder="Title" contentPlaceHolder="How was the day today?" submit={fillJournal} />
    </>
  );
}

export default Page;
