const btn = document.querySelector('.add')
const taskList = document.querySelector('.taskList')
const inp = document.getElementById('task')

let arr = []
let searchArray = []

if (localStorage.getItem('ToDoList') !== null) {
    let localStorageData = localStorage.getItem('ToDoList')
    arr = JSON.parse(localStorageData)
    searchArray = JSON.parse(localStorageData)
}

render(arr)

function createTodoItem() {
    if (inp.value.length > 0) {
        const random = (Math.random() * 10).toFixed(2)
        arr.push({name: inp.value, done: false, id: random})
        inp.value = ''
        localStorage.setItem('ToDoList', JSON.stringify(arr))
    }
}


function delFunc(id) {
    if (confirm('Точно доделал?')) {
        arr = arr.filter((item) => item.id !== id)
        localStorage.setItem('ToDoList', JSON.stringify(arr))
        render(arr)
    }
}


function complBtn(id) {
    arr = arr.map((item) => {
        if (item.id == id & item.done !== true) {
            item.done = true
            return item
        } else if (item.id !== id) {
            return item
        } else {
            item.done = false
            return item
        }
    } )
    localStorage.setItem('ToDoList', JSON.stringify(arr))
    render(arr)
}



function render(arr) {
    taskList.innerHTML = ''

    arr.forEach(element => {
        taskList.insertAdjacentHTML('afterbegin', `
            <li class="taskItem ${element.done}" id="${element.id}">
                <div class="wrapperCont">
                    <p class="content">${element.name}</p>
                </div>
                <div class="wrapper">
                    <button class="doneBtn">Готово</button>
                    <button class="delBtn">Удалить</button>
                </div>
            </li>
        `)

        const deleteBtn = document.querySelector('.delBtn')
        const completeBtn = document.querySelector('.doneBtn')

        deleteBtn.onclick = () => delFunc(element.id)

        completeBtn.onclick = () => complBtn(element.id)
    });
}



btn.addEventListener('click', e => {
    e.preventDefault()

    createTodoItem()

    render(arr)
})





