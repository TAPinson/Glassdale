import {NoteHTMLConverter} from './Note.js'
import {useNotes, getNotes, deleteNote} from './NoteProvider.js'
import {getCriminals, useCriminals} from '../criminals/CriminalProvider.js'

const eventHub = document.querySelector(".container")

// Look for a new note to be submitted
eventHub.addEventListener("noteStateChanged", () => {
    getNotes()
    .then(() => {
        getCriminals()
    })
    .then(() => {
        const newNotes = useNotes()
        const suspects = useCriminals()
        renderAll(newNotes, suspects)
    })	
})


// Look for button for specific notes to be selected
eventHub.addEventListener("click", event => {
    const isTargeted = event.target.classList.value
    if (isTargeted === "viewNoteButton") {
        const notes = useNotes()
        const selectedCriminalID = parseInt(event.target.id)


        // const clearCheck = document.querySelector(`#notesBox-${selectedCriminalID}`)
        // clearCheck.innerHTML = ""

        const criminals = useCriminals()
        //Find the criminal who matches on ID
        const selectedCriminal = criminals.find(criminal => {
            return selectedCriminalID == criminal.id
        })
        //Filter notes to only show those created by the matching criminal ID
        const matchingNotes = notes.filter(note => {
            return selectedCriminal.id === note.suspectID
        })
        renderOne(matchingNotes, criminals)
    }
})


eventHub.addEventListener("click", event => {
    if (event.target.id.startsWith("deleteNote--")) {
        const [prefix, id] = event.target.id.split("--")
        deleteNote(id)
    }
})


const renderOne = (notes, suspects) => {
    const contentTarget = document.querySelector(`#notesBox-${notes[0].suspectID}`)
    const suspectName = suspects.find((suspect) => {
        return suspect.id === parseInt(notes[0].suspectID)
    })
    
    if (contentTarget.innerHTML === "") {
        notes.map((note) => {
            note.name = suspectName.name
            contentTarget.innerHTML += NoteHTMLConverter(note)
        })
    }else{
        contentTarget.innerHTML = ""
    }
}


export const renderNew = (note) => {
    getNotes()
    .then(() => {
        let notes = useNotes()
        notes = notes.filter((correctNotes) => {
            return correctNotes.suspectID === note.suspectID
        })
        const suspects = useCriminals()
        const suspect = suspects.find((suspect) => {
            return suspect.id === parseInt(note.suspectID)
        })
        note.name = suspect.name
        const contentTarget = document.querySelector(`#notesBox-${suspect.id}`)
        contentTarget.innerHTML = ""
        notes.map((newNote) => {
            contentTarget.innerHTML += NoteHTMLConverter(newNote)
        })
        contentTarget.innerHTML += NoteHTMLConverter(note)
    })
}


export const renderAll = (suspectID) => {
    const contentTarget = document.querySelector(`#notesBox-${suspectID}`)
    
    getNotes()
    .then(() => {
        const notes = useNotes()
        const suspects = useCriminals()

        const matchingNotes = notes.filter((note) => {
            return note.suspectID === suspectID
        })


        const matchingSuspect = suspects.find((suspect) => {
            return suspect.id === parseInt(suspectID)
        })
        
        contentTarget.innerHTML = ""

        matchingNotes.map((note) => {
            note.name = matchingSuspect.name
            contentTarget.innerHTML += NoteHTMLConverter(note)
        })
    })
}