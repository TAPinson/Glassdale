import { OfficerHTML } from './Officer.js'
import { useOfficers, getOfficers } from './OfficerProvider.js'

const eventHub = document.querySelector(".container")


export const  OfficerList= () => {
    getOfficers()
    .then(() => {
        const officerArray = useOfficers();
        render(officerArray)
    })
}


const render = officerColection => {
    const contentTarget = document.querySelector(".filters__officer")
    contentTarget.innerHTML = `
        <select class="dropdown" id="officerSelect">
            <option value="0">Please select an officer...</option>
            <option value="0">Please select an officer...</option>
            ${
                officerColection.map(officer => {
                    return `<option value="${officer.name}">${officer.name}</option>`
                })
            }
        </select>
    `
}


// Listen for the custom event you dispatched in OfficerSelect
eventHub.addEventListener("change", changeEvent => {
 
    if (changeEvent.target.id === "officerSelect") {
        // Get the name of the selected officer
        const selectedOfficer = changeEvent.target.value


        // Define a custom event
        const customEvent = new CustomEvent("officerSelected", {
            detail: {
                officer: selectedOfficer
            }
        })

        // Dispatch event to event hub
        eventHub.dispatchEvent(customEvent)
    }
})