import { Criminal } from './Criminal.js'
import { useCriminals } from './CriminalProvider.js'
import { getFacilities, useFacilities } from '../facility/FacilityProvider.js'
import { getCriminalFacilities, useCriminalFacilities } from '../facility/CriminalFacilityProvider.js'

const eventHub = document.querySelector(".container")

// Listen for the custom event you dispatched in ConvictionSelect
eventHub.addEventListener('crimeChosen', event => {
    const criminals = useCriminals()
    if ("crimeThatWasChosen" in event.detail) {
        /* Filter the criminals application state down to the people that committed the crime */
        const matchingCriminals = criminals.filter(criminal => {
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


const render = (criminalsToRender, allFacilities, allRelationships) => {
    // Step 1 - Iterate all criminals
    const contentTarget = document.querySelector(".criminalsContainer")
    contentTarget.innerHTML = criminalsToRender.map(
        (criminalObject) => {
            // Step 2 - Filter all relationships to get only ones for this criminal
            const facilityRelationshipsForThisCriminal = allRelationships.filter(cf => cf.criminalId === criminalObject.id)
            // Step 3 - Convert the relationships to facilities with map()
            const facilities = facilityRelationshipsForThisCriminal.map(cf => {
                const matchingFacilityObject = allFacilities.find(facility => facility.id === cf.facilityId)
                return matchingFacilityObject
            })
            // Must pass the matching facilities to the Criminal component
            return Criminal(criminalObject, facilities)
        }
    ).join("")
}


export const CriminalList = () => {
    // Kick off the fetching of both collections of data
    getFacilities()
        .then(getCriminalFacilities)
        .then(
            () => {
                // Pull in the data now that it has been fetched
                const facilities = useFacilities()
                const crimFac = useCriminalFacilities()
                const criminals = useCriminals()

                // Pass all three collections of data to render()
                render(criminals, facilities, crimFac)
            }
        )
}