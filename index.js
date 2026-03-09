 const API_URL = "http://localhost:5050"
//const API_URL = "https://tonyway-backend.vercel.app"

const NotesApi = API_URL + "/notes"
const TodoApi = API_URL + "/todos"
const LoginApi = API_URL + "/login"

if (localStorage.getItem('authStatus') !== 'verified') {
    window.location.href = "/pages/login.html"; // Kick them back if not logged in
}


// Display Notes [Notes tab]
async function fetchAndDisplayNotes() {
    const notesGrid = document.getElementById('notes-grid');
    try {
        const response = await fetch(NotesApi);
        const notes = await response.json();
        notesGrid.innerHTML = '';
        notes.forEach(note => {
            const noteCard = document.createElement('div');
            noteCard.className = 'card';
            noteCard.dataset.id = `${note._id}`
            noteCard.innerHTML = `
            <div class="card-title">${note.title} </div>
            ${note.content}
            `;
            notesGrid.appendChild(noteCard);
        })
    } catch (error) {
        console.error("Error: ", error);
        notesGrid.innerHTML = `<p style="color: red;">Failed to load notes. Is the server running?</p>`
    }
}


const showNoteContainer = document.getElementById("input-container");
const titleInput = document.querySelector(".note-title");
const contentInput = document.querySelector(".input-text");

// We use a "Focus Out" event on the container
if (showNoteContainer != null) {
    showNoteContainer.addEventListener("focusout", (event) => {
        setTimeout(() => {
            if (!showNoteContainer.contains(document.activeElement)) {
                saveNote();
            }
        }, 10);
    });
}
// Your Backend Save Function
function saveNote() {
    const title = titleInput.value.trim();
    const content = contentInput.value.trim();

    // Only save if there is actually text to save then display it.
    if (title !== "" && content !== "") {
        fetch(NotesApi, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title: title,
                content: content,
                category: "Personal",
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                // Optional: Clear inputs after saving
                titleInput.value = "";
                contentInput.value = "";
            }).then(() => fetchAndDisplayNotes());
    }
}

// [ToDo page]
let selected = document.querySelector("#todo-list");
if (selected != null) {
    selected.addEventListener("click", function (e) {
        if (e.target.tagName === "LI") {
            e.target.classList.toggle("done");
        }
    });
    selected.addEventListener("dblclick", (e) => {
        if (e.target.tagName === "LI") {
            e.target.classList.toggle("highlight");
        }
    });
    console.log(selected);
}