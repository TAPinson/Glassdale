export const Witness = (witness) => {
    return `
    <section id="witness-${witness.id}" class="card-witness">
        <h3>Name: ${witness.name}</h3>       
        <p>${witness.statements}</p>
    </section>
    `
}