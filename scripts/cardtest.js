const tasksList = [];

class taskCard {
    constructor(title, content) {
        this.title = title;
        this.content = content;
    }
}

var createButton = document.getElementById("create-btn");
var addForm = document.getElementById("add-form");

function resetForm(){
    addForm.reset();
}

createButton.addEventListener('click', () => {
    addCard()
})

function addTask(title, content) {
    let task = new taskCard(title, content);
    tasksList.push(task);
}

function removeTask(id){
    tasksList.splice(id, 1);
}

function addCard() {
    var inputTitle = document.querySelector("#inputTitle").value;
    var inputText = document.querySelector("#inputText").value;
    if (inputText != "" && inputTitle != "") {
        addTask(inputTitle, inputText);
        renderCards();
    }
}


function renderCards() {
    const listaCards = document.getElementById("cardList");
    const template = document.querySelector(".task-card-template");
    listaCards.innerHTML = "";
    if (tasksList.length > 0) {
        for (let taskIndex = 0; taskIndex < tasksList.length; taskIndex++) {
            const entry = template.cloneNode(true);
            const deleteTaskButton = entry.querySelector(".delete-task")
            entry.classList.remove("task-card-template")
            entry.querySelector(".card-header").innerText = tasksList[taskIndex].title;
            entry.querySelector(".card-text").innerText = tasksList[taskIndex].content;
            deleteTaskButton.addEventListener('click', () => {
                removeTask(taskIndex);
                renderCards()
            })

            listaCards.appendChild(entry);
        }
    }

}