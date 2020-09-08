
import { getConvictions, useConvictions } from "./ConvictionProvider.js"

const eventHub = document.querySelector(".container")
const contentTarget = document.querySelector(".filters__crime")

// On the event hub, listen for a "change" event.
eventHub.addEventListener("change", event => {
    // This targets only the HTML element with the ID of "crimeSelect" and execute only when element changed
    if (event.target.id === "crimeSelect") {
        // Create custom event. Provide an appropriate name.
        const customEvent = new CustomEvent("crimeChosen", {
            detail: {
                crimeThatWasChosen: event.target.value
            }
        })
        // Dispatch to event hub
        eventHub.dispatchEvent(customEvent)
    }
})



const render = convictionsCollection => {
    contentTarget.innerHTML = `
        <select class="dropdown" id="crimeSelect">
            <option value="0">Please select a crime...</option>
            <option value="0">Please select a crime...</option>
            ${
                convictionsCollection.map(crime => {
                    return `<option value="${crime.name}">${crime.name}</option>`
                })
            }
        </select>
    `
}


export const ConvictionSelect = () => {
    getConvictions()
        .then(() => {
            const convictions = useConvictions()
            render(convictions)
        })
}