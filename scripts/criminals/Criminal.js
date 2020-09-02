export const CriminalHTML = (criminalObj) => {
    return `
    <section id="criminals-${criminalObj.id}" class="card-criminal">
        <h3>Name: ${criminalObj.name}</h3>
        <div>Crime: ${criminalObj.conviction}</div>
        <div>Term Start: ${new Date(criminalObj.incarceration.start).toLocaleDateString('en-US')}</div>
        <div>Term End: ${new Date(criminalObj.incarceration.end).toLocaleDateString('en-US')}</div>
    </section>
    `
}