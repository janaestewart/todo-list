const dumpster = document.querySelectorAll('.del')
const check = document.querySelectorAll('.taskitem span')
const uncheck = document.querySelectorAll('.taskitem span.completed')

Array.from(dumpster).forEach((el)=>{
    el.addEventListener('click', deleteTodo) 
})

Array.from(check).forEach((el)=>{
    el.addEventListener('click', checkTodo)
})

Array.from(uncheck).forEach((el)=>{
    el.addEventListener('click', uncheckTodo)
})

async function deleteTodo(){
    const toDoName = this.parentNode.childNodes[1].innerText
    // const toDoDate = this.parentNode.childNodes[5].innerText
    try{
        const response = await fetch('deleteTodo', {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'toDoNameS': toDoName
                // 'toDoDateS': toDoDate
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function checkTodo(){
    const toDoName = this.parentNode.childNodes[1].innerText
    // const toDoDate = this.parentNode.childNodes[5].innerText
    try{
        const response = await fetch('checkTodo', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'toDoNameS': toDoName
                // 'toDoDateS': toDoDate
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function uncheckTodo(){
    const toDoName = this.parentNode.childNodes[1].innerText
    // const toDoDate = this.parentNode.childNodes[5].innerText
    try{
        const response = await fetch('uncheckTodo', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'toDoNameS': toDoName
                // 'toDoDateS': toDoDate
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

// async function reorder(){
//     const response = await fetch ('reorder')
//     for(let i=0; i < data.length; i++){
//         console.log(data[i].todo_tag)
//         let newElement = document.createElement("li")
//         if(data[i].todo_tag === 'weekly' && data[i].todo_tag !== 'event'){
//             newElement.setAttribute("class", "starButton fas fa-star");
//         }else if(data[i].todo_tag !== 'event'){
//             newElement.setAttribute("class", "starButton far fa-star");
//         }else{
//             newElement.setAttribute("class", "far fa-calendar");
//         }
// }

//figure out a way to place our tasks in their respectives areas. so weekly with weekly and so on.