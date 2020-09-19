import {AlibiDialog} from './AlibiDialog.js'

const eventHub = document.querySelector(".container")

eventHub.addEventListener("click", event => {
    if (event.target.id.startsWith("associates--")) {
        const [prefix, criminalID] = event.target.id.split("--")
        const alibiEvent = new CustomEvent("associatesClicked", {
            detail: {
                chosenCriminal: criminalID
            }
        })
        eventHub.dispatchEvent(alibiEvent)
    }
})


export const CriminalHTML = (criminal) => {
    return `
    <section id="criminals-${criminal.id}" class="card-criminal">
        <h3>${criminal.name}</h3>
        <div>Crime: ${criminal.conviction}</div>
        <div>Term Start: ${new Date(criminal.incarceration.start).toLocaleDateString('en-US')}</div>
        <div>Term End: ${new Date(criminal.incarceration.end).toLocaleDateString('en-US')}</div>
        <div>
            <button class= "viewNoteButton" id="${criminal.id}">Get Notes</button>
            <button class= "viewAlibiButton" id="associates--${criminal.id}">Get Alibis</button>
        </div>
        <div class="notesBox" id="notesBox-${criminal.id}"></div>
        ${AlibiDialog(criminal.id)}
        <p></p>
    </section>
    `
}