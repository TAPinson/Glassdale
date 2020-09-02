import { OfficerHTML } from './Officer.js'
import { useOfficers, getOfficers } from './OfficerProvider.js'


export const  OfficerList= () => {
    getOfficers()
    .then(() => {
        const officerArray = useOfficers();
        render(officerArray)
    })
}


// const addOfficersToDOM = (anOfficerArray) => {
//     const domElement = document.querySelector(".officersContainer")

//     let HTMLArray = anOfficerArray.map(singleOfficer => {
//         return OfficerHTML(singleOfficer);
//     })
//     domElement.innerHTML = HTMLArray.join("")
// }


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