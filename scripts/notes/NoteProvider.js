// Hold on to an array of notes
// useNotes - makes copy of array of notes and returns
// get all the notes from database
// add a note to the databate

export const saveNote = noteObj => {
    return fetch("http://localhost:8088/notes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(noteObj)
    })
    .then((result) => {
        console.log("CELEBRATE RIGHT NOW")
    })
}