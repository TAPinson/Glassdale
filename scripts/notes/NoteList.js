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
eventHub.addEventListener("click", () => {
    //console.log(event.target.classList.value)
    const isTargeted = event.target.classList.value
    //console.log(isTargeted)

    if (isTargeted === "viewNoteButton") {
        const notes = useNotes()
        const selectedCriminalID = event.target.id
        const criminals = useCriminals()
        const selectedCriminalMatch = criminals.filter(criminal => {
            return selectedCriminalID == criminal.id
        })
        const selectedCriminal = selectedCriminalMatch[0]
        const matchineNotes = notes.filter(note => {
            return selectedCriminal.name === note.suspect
        })
        render(matchineNotes)
    }
})




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

