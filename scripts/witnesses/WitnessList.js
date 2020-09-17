import { getWitnesses, useWitnesses } from './WitnessProvider.js'
import { Witness } from './Witness.js'

export const WitnessList = () => {
    getWitnesses()
    .then(() => {
        const witnessArray = useWitnesses()
        addWitnessToDom(witnessArray)
    })
}


const addWitnessToDom = (witnessCollection) => {
    //get a reference to where to put this stuff
    const domElement = document.querySelector(".viewer")
    // loop through witnessCollection and make some HTML stuff for each
    let HTMLArray = witnessCollection.map(singleWitness => {
        return Witness(singleWitness)
    }).join("")
    //add to innerHTML
    domElement.innerHTML += HTMLArray
    domElement.innerHTML += `<h2 class="witnessesTag">Witnesses</h2>`

}