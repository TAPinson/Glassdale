import { CriminalHTML } from './Criminal.js'
import { useCriminals, getCriminals } from './CriminalProvider.js'

export const  CriminalList= () => {
    getCriminals()
    .then(() => {
        const criminalArray = useCriminals();
        //console.log("criminalArray", criminalArray)
        addCriminalsToDOM(criminalArray)
    })
}

const addCriminalsToDOM = (aCriminalArray) => {
    const domElement = document.querySelector(".criminalsContainer")

    let HTMLArray = aCriminalArray.map(singleCriminal => {
        return CriminalHTML(singleCriminal);
    })
    //console.log("HTMLArray", HTMLArray)

    domElement.innerHTML = HTMLArray.join("")
}


// Test Zone //