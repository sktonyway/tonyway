"use client";

import { Navbar } from "@/components/Navbar";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

function Page() {
  const router = useRouter();
  const [journal, setJournal] = useState([]);
  const fetchJournal = async () => {
    try {
      const res = await fetch('/api/v1/journal');
      const result = await res.json();
      // If your API returns { success: true, data: [...] }, use result.data
      if (result && result.journals) {
        setJournal(result.journals);
      }
    } catch (err) {
      console.error("Error fetching notes", err);
    }
  };

  useEffect(() => {
    fetchJournal();
  }, []); // Explicitly empty constant array
  
  const handleRedirect = () => {
    router.push('/journal/write');
  };

  interface Journal {
    _id: string;
    title: string;
    content: string;
    date: string;
  }

  return (
    <>
    <Navbar type="write"><button onClick={handleRedirect}>Write</button></Navbar>
    <div className="p-6 ">
      <h2 className="text-xl mb-2">My Written Journals</h2>
      
      {journal.length === 0 ? (
        <div className="text-gray-400 text-sm">No journal available.</div>
      ) : (
        <div className="space-y-3">
          {journal.map((note: Journal) => (
            <div 
              key={note._id} 
              className="p-4 border"
            >
              <h3 className="font-bold">{note.title}</h3>
              <p className="text-sm">{note.content}</p>
              <div className="flex justify-end">
              <p className="text-xs text-gray-500 ">{new Date(note.date).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </>
  )
}

export default Page