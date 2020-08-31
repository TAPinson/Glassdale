export const CriminalHTML = (criminalOjb) => {
    return `
    <section id="criminals-${criminalOjb.id}" class="card-criminal">
        <h3>Name: ${criminalOjb.name}</h3>
        <div>Crime: ${criminalOjb.conviction}</div>
        <div>Term Start: ${new Date(criminalOjb.incarceration.start).toLocaleDateString('en-US')}</div>
        <div>Term End: ${new Date(criminalOjb.incarceration.end).toLocaleDateString('en-US')}</div>
    </section>
    `
}