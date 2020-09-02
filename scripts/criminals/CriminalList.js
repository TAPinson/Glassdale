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