import { OfficerHTML } from './Officer.js'
import { useOfficers, getOfficers } from './OfficerProvider.js'


export const  OfficerList= () => {
    getOfficers()
    .then(() => {
        const officerArray = useOfficers();
        //console.log("officerArray", officerArray)
        addOfficersToDOM(officerArray)
    })
}


const addOfficersToDOM = (anOfficerArray) => {
    const domElement = document.querySelector(".officersContainer")

    let HTMLArray = anOfficerArray.map(singleOfficer => {
        return OfficerHTML(singleOfficer);
    })
    //console.log("HTMLArray", HTMLArray)

    domElement.innerHTML = HTMLArray.join("")
}