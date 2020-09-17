import {NoteHTMLConverter} from './Note.js'
import {useNotes, getNotes} from './NoteProvider.js'
import {getCriminals, useCriminals} from '../criminals/CriminalProvider.js'

const eventHub = document.querySelector(".container")

// Look for a new note to be submitted
eventHub.addEventListener("noteStateChanged", () => {	
    const newNotes = useNotes()
    const suspects = useCriminals()
    render(newNotes, suspects)
})


// Look for button for specific notes to be selected
eventHub.addEventListener("click", event => {
    const isTargeted = event.target.classList.value
    if (isTargeted === "viewNoteButton") {
        const notes = useNotes()
        const selectedCriminalID = parseInt(event.target.id)
        const criminals = useCriminals()
        //Find the criminal who matches on ID
        const selectedCriminal = criminals.find(criminal => {
            return selectedCriminalID == criminal.id
        })
        //Filter notes to only show those created by the matching criminal ID
        const matchingNotes = notes.filter(note => {
            return selectedCriminal.id === note.suspectID
        })
        cardRender(matchingNotes, criminals)
    }
})


const cardRender = (notes, suspects) => {
    const contentTarget = document.querySelector(`#notesBox-${notes[0].suspectID}`)
    if (contentTarget.innerHTML !== "") {
        contentTarget.innerHTML = ""
    }else{
        contentTarget.innerHTML = notes.map((noteObject) => {
            noteObject.suspectObj = suspects.find(suspect => {
                return suspect.id === parseInt(noteObject.suspectID)
            })
                return NoteHTMLConverter(noteObject)
            }).join("");
    }
}


// Render any provided notes to the dom in the viewer aside
const render = (notes, suspects) => {
    const contentTarget = document.querySelector(".viewer")
    contentTarget.innerHTML = notes.map((noteObject) => {
        noteObject.suspectObj = suspects.find(suspect => {
            return suspect.id === parseInt(noteObject.suspectID)
        })
            return NoteHTMLConverter(noteObject)
        }).join("");
    contentTarget.innerHTML += `<h2>Notes:</h2>`
}


// Prepare ALL notes to be sent for rendering
export const NoteList = () => {
    getNotes()
    .then(getCriminals)
    .then(() => {
        const notes = useNotes()
        const suspects = useCriminals()
        render(notes, suspects)
    })
}
