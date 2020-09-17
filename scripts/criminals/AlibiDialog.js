import {useCriminals} from './CriminalProvider.js'

const eventHub = document.querySelector(".container")


eventHub.addEventListener("associatesClicked", event => {
    //display all associates for criminals
    const targetCriminal = useCriminals().find(criminal => {
        return criminal.id === parseInt(event.detail.chosenCriminal)
    })
    const alibiTarget = document.querySelector(`.alibiDialog--${targetCriminal.id}`)
    const hTarget = alibiTarget.querySelector("hr")
    if (alibiTarget.contains(hTarget)) {
        alibiTarget.innerHTML = ""
    }else {
        alibiTarget.innerHTML = `${
            targetCriminal.known_associates.map(associate => {
                return `
                <hr>
                <div><strong>Alibi Associate:</strong><br> ${associate.name}</div>
                <div> <strong>Alibi:</strong><br> ${associate.alibi}</div>
                <p></p>
                `
            }).join("")
        }`
    }
})


export const AlibiDialog = (id) => {
    return `
        <span class="alibiDialog--${id}"></span>
    `
}