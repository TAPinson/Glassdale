// Takes notes made and prepare to display on website
export const NoteHTMLConverter = (noteObject) => {
    return `
        <section class="note">
            <div class="note--title">Criminal: ${ noteObject.suspect }</div>
            <div class="note--content">${ noteObject.noteText }</div>
            <div class="note--timestamp">Timestamp: ${ new Date(noteObject.date).toLocaleDateString('en-US')  }</div>
        </section>
    `
}