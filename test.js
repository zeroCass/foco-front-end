const a1 = [{id: 1, data: 'data-1'}, {id: 2, data: 'data-2'}, {id: 3, data:'data-3'}]
const a2 = [{id: 3, data: 'data-3'}, {id: 1, data: 'data-1'}]

a1.forEach(e => {
    let match = a2.find(elem => elem.id === e.id)
    if (match) {
        console.log(match)
    }
})