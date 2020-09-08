import {useCriminals} from './CriminalProvider.js'

const eventHub = document.querySelector(".container")

eventHub.addEventListener("associatesClicked", event => {
    //display all associates for criminals
    const targetCriminal = useCriminals().find(criminal => {
        return criminal.id === parseInt(event.detail.chosenCriminal)
    })
    const alibiTarget = document.querySelector(`.alibiDialog--${targetCriminal.id}`)
    alibiTarget.innerHTML = `${
        targetCriminal.known_associates.map(associate => {
            return `
            <h4>${associate.name}</h4>
            <div>${associate.alibi}</div>
            `
        }).join("")
    }`
})


export const AlibiDialog = (id) => {
    return `
        <span class="alibiDialog--${id}"></span>
    `
}