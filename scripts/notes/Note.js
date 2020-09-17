// Takes notes made and prepare to display on website
export const NoteHTMLConverter = (note) => {
    return `
        <section class="note">
            <div class="note--title">Criminal: ${ note.suspectObj.name }</div>
            <div class="note--timestamp">Timestamp: ${ new Date(note.date).toLocaleDateString('en-US')  }</div>
            <div class="note--content">Note: ${ note.noteText }</div>
        </section>
    `
}