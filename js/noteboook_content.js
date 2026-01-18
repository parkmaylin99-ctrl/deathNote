const list = document.querySelector('#notebook-list')
 
const writeDown = async () => {
    try {
        const response = await fetch('../data/dn.json')
        const noteData = await response.json()
        const localData = JSON.parse(localStorage.getItem('deathNoteRecords')) || []
        const allRecs = [...noteData, ...localData]
        list.innerHTML = ''

        allRecs.forEach(rec => {
            const card = document.createElement('div')
            card.setAttribute('class', 'death-card')
            card.innerHTML = `
            <h3>${rec.name}</h3>
            <p><strong>Cause:</strong> ${rec.cause}</p>
            <span class='death-date'>Date: ${rec.date}</span>
            `
            list.append(card)
        })

    } catch (error) {
        console.error("Ошибка загрузки тетради:", error);
        notebookList.innerHTML = "<p>Failed to load the Death Note...</p>";
    }
}
writeDown();