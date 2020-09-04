import { CriminalHTML } from './Criminal.js'
import { useCriminals, getCriminals } from './CriminalProvider.js'

const eventHub = document.querySelector(".container")

// Listen for the custom event you dispatched in ConvictionSelect
eventHub.addEventListener('crimeChosen', event => {
    const appStateCriminals = useCriminals()
    // You remembered to add the id of the crime to the event detail, right?
    if ("crimeThatWasChosen" in event.detail) {
        /* Filter the criminals application state down to the people that committed the crime */
        const matchingCriminals = appStateCriminals.filter(criminal => {
            const crime = criminal.conviction
            const crimeThatWasChosen = event.detail.crimeThatWasChosen
            if (crime === crimeThatWasChosen){
                return true
            }
        })
        /* Then invoke render() and pass the filtered collection as an argument */
        render(matchingCriminals)
    }
})


// Listen for the custom event you dispatched in officerSelect
eventHub.addEventListener("change", event => {
    if (event.target.id === "officerSelect"){
        // How can you access the officer name that was selected by the user?
        const officerName = event.target.value
        // How can you get the criminals that were arrested by that officer?
        const criminals = useCriminals()
        const matchingCriminals = criminals.filter(
            criminalObject => {
                if (criminalObject.arrestingOfficer === officerName) {
                    return true
                }
            })
        render(matchingCriminals)
    }
})


// Display selected crimin array to the dom
const render = (aCriminalArray) => {
    const domElement = document.querySelector(".criminalsContainer")
    let HTMLArray = aCriminalArray.map(singleCriminal => {
        return CriminalHTML(singleCriminal);
    })
    domElement.innerHTML = HTMLArray.join("")
}


// Render ALL criminals initally
export const CriminalList = () => {
    getCriminals()
        .then(() => {
            const appStateCriminals = useCriminals()
            render(appStateCriminals)
        })
}


