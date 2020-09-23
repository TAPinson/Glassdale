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


export const Criminal = (criminalObject, facilities) => {
    return `
    <div id="criminals-${criminalObject.id}" class="card-criminal">
        <h4>${criminalObject.name}</h4>
        <div class="criminal__details">
            <p>Convicted for ${criminalObject.conviction}</p>
            <p>Arrested by ${criminalObject.arrestingOfficer}</p>
            <p>Incarcerated between:
                ${new Date(criminalObject.incarceration.start).toLocaleDateString()} and
                ${new Date(criminalObject.incarceration.end).toLocaleDateString()}
            </p>
            <p>Age: ${criminalObject.age}</p>
            <div>
                <h2>Facilities</h2>
                <ul>
                    ${facilities.map(f => `<li>${f.facilityName}</li>`).join("")}
                </ul>
            </div>
            <div>
                <button class= "viewNoteButton" id="${criminalObject.id}">Get Notes</button>
                <button class= "viewAlibiButton" id="associates--${criminalObject.id}">Get Alibis</button>
            </div>
            <div class="notesBox" id="notesBox-${criminalObject.id}"></div>
            ${AlibiDialog(criminalObject.id)}
        </div>
    </div>
    `
}