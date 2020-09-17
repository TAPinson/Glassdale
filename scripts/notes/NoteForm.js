import { getCriminals, useCriminals } from '../criminals/CriminalProvider.js'
import {saveNote} from './NoteProvider.js'
 
// A bunch of input boxes relates to the note information

const eventHub = document.querySelector(".container")
const contentTarget = document.querySelector(".noteFormContainer")


eventHub.addEventListener("click", clickEvent => {
    if(clickEvent.target.id === "saveNote"){
        const noteContent = document.querySelector("#noteForm--text")
        const noteCriminal = document.querySelector("#noteForm--criminal")
        if(noteCriminal.value !== "0"){
            const newNote = {
                noteText: noteContent.value,
                suspectID: parseInt(noteCriminal.value),
                date: Date.now()
            }
            saveNote(newNote);
        }else {
            window.alert("Choose a Suspect")
        }
    }
})


const render = (criminalArray) => {
    contentTarget.innerHTML = `
        <h3>New Note Details</h3>
        <textarea id="noteForm--text" placeholder="Put a note here"></textarea>
        <select class="noteForm--dropdown" id="noteForm--criminal">
            <option value="0">Please select a criminal...</option>
            ${
                criminalArray.map(criminalObject => {
                    return `<option value="${criminalObject.id}">${criminalObject.name}</option>` 
                }).join("")
            }
        </select>
        <button id="saveNote">Save Note</button>
        `
}


export const NoteForm = () => {
    getCriminals()
    .then(() => {
        render(useCriminals());
    })
  
}