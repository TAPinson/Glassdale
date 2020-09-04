import {NoteHTMLConverter} from './Note.js'
import {useNotes, getNotes} from './NoteProvider.js'
import {useCriminals} from '../criminals/CriminalProvider.js'

const eventHub = document.querySelector(".container")

// Look for a new note to be submitted
eventHub.addEventListener("noteStateChanged", () => {	
    const newNotes = useNotes()
    render(newNotes)
})

// Look for button for specific notes to be selected





// Render any provided notes to the dom
const render = (notes) => {
    const contentTarget = document.querySelector(".noteViewer")
    const criminals = useCriminals()
    contentTarget.innerHTML = notes.map((noteObject) => {
            return NoteHTMLConverter(noteObject)
        }).join("");
}

// Prepare ALL notes to be sent for rendering
export const NoteList = () => {
    getNotes()
        .then(useNotes)
        .then(render)
}

