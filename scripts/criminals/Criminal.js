export const CriminalHTML = (criminal) => {
    return `
    <section id="criminals-${criminal.id}" class="card-criminal">
        <h3>Name: ${criminal.name}</h3>
        <div>Crime: ${criminal.conviction}</div>
        <div>Term Start: ${new Date(criminal.incarceration.start).toLocaleDateString('en-US')}</div>
        <div>Term End: ${new Date(criminal.incarceration.end).toLocaleDateString('en-US')}</div>
        <button id="${criminal.id}">Get Notes</button>
        <p></p>
    </section>
    `
}