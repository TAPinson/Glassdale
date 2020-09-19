// Hold on to an array of notes
// useNotes - makes copy of array of notes and returns
// get all the notes from database
// add a note to the databate
import {renderNew, renderAll} from './NoteList.js'

const eventHub = document.querySelector(".container")
let notes = []

const dispatchStateChangeEvent = () => {
    const noteStateChangedEvent = new CustomEvent("noteStateChanged")
    eventHub.dispatchEvent(noteStateChangedEvent)
}


export const useNotes = () => {
	return notes.slice();
}


export const getNotes = () => {
    return fetch('http://localhost:8088/notes')
        .then(response => response.json())
        .then(parsedNotes => {
            notes = parsedNotes
        })
}


export const saveNote = note => {
    return fetch("http://localhost:8088/notes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(note)
    })
    
    .then(renderNew(note))
}


export const deleteNote = noteId => {
    const newNotes = useNotes()
    
    const findNote = newNotes.find((note) => {
        return note.id === parseInt(noteId)

    })

    return fetch(`http://localhost:8088/notes/${noteId}`, {
        method: "DELETE"
    })
        .then(renderAll(findNote.suspectID))
}