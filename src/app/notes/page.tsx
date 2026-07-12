"use client"
import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";

function Written() {
  const [notes, setNotes] = useState([])

  const fetchNotes = async () => {
    try {
      const res = await fetch('/api/v1/notes');
      const result = await res.json();
      
      // FIX: Ensure you match your API response layout. 
      // If your API returns { success: true, data: [...] }, use result.data
      if (result && result.data) {
        setNotes(result.data);
      } else if (result && result.notes) {
        setNotes(result.notes);
      }
    } catch (err) {
      console.error("Error fetching notes", err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []); // Explicitly empty constant array

  interface Note {
    _id: string;
    title: string;
    content: string;
  }
  return (
    <>
    <Navbar />
    <div className="p-6 ">
      <h2 className="text-xl mb-2">My Saved Notes</h2>
      
      {notes.length === 0 ? (
        <div className="text-gray-400 text-sm">No notes available.</div>
      ) : (
        <div className="space-y-3">
          {notes.map((note: Note) => (
            <div 
              key={note._id} 
              className="p-4 border"
            >
              <h3 className="font-bold">{note.title}</h3>
              <p className="text-sm">{note.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
    </>

  )
}

export default Written;