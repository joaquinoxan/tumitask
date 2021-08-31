const tasksList = [];

class taskCard {
    constructor(title, content, category) {
        this.title = title;
        this.content = content;
        this.category = category;
        this.isCompleted = false;
        this.display = true;
    }
}
var dailyAddButton = document.getElementById("daily-add-btn");
var weeklyAddButton = document.getElementById("weekly-add-btn");
var monthlyAddButton = document.getElementById("monthly-add-btn");
var createButton = document.getElementById("create-btn");
var saveButton = document.getElementById("save-btn");
var hideCheckbox = document.getElementById("hide-checkbox");
var editId = 0;
var checkboxStatus = false;
var categoryType = "Daily";

function resetForm(){
    var addForm = document.getElementById("add-form");
    addForm.reset();
}

dailyAddButton.addEventListener('click', () => {
    categoryType = "Daily";
})

weeklyAddButton.addEventListener('click', () => {
    categoryType = "Weekly";
})

monthlyAddButton.addEventListener('click', () => {
    categoryType = "Monthly";
})

createButton.addEventListener('click', () => {
    addCard()
})

saveButton.addEventListener('click', () => {
    editCard(editId)
})

hideCheckbox.addEventListener('click', () => {
    checkboxStatus = !checkboxStatus;
})

function openEditModal(id) {
    var editModalElement = new bootstrap.Modal(document.getElementById("editModal"));
    document.querySelector("#inputEditTitle").value = tasksList[id].title;
    document.querySelector("#inputEditText").value = tasksList[id].content;
    editId = id;
    editModalElement.show();
}

function addTask(title, content, category) {
    let task = new taskCard(title, content, category);
    tasksList.push(task);
}

function removeTask(id){
    tasksList.splice(id, 1);
}

function editTask(id, title, content){
    tasksList[id].title = title;
    tasksList[id].content = content;
}

function changeStatusTask(id){
    tasksList[id].isCompleted = !tasksList[id].isCompleted;
}

function addCard() {
    var inputTitle = document.querySelector("#inputTitle").value;
    var inputText = document.querySelector("#inputText").value;
    if (inputText != "" && inputTitle != "") {
        addTask(inputTitle, inputText, categoryType);
        renderCards();
    }
}

function editCard(id) {
    var inputTitle = document.querySelector("#inputEditTitle").value;
    var inputText = document.querySelector("#inputEditText").value;
    if (inputText != "" && inputTitle != "") {
        editTask(id, inputTitle, inputText);
        renderCards();
    }
}

function filterCards() {
    const keywords = document.getElementById("search-fliter").value.trim().toLowerCase()
    if (keywords == ""){
        tasksList.forEach(taskCard => {
            taskCard.display = true
        })
    }
    else {
        tasksList.forEach(taskCard => {
            taskCard.display = false
        })

        tasksList.filter(taskCard => {
            const titleMatch = taskCard.title.toLowerCase().includes(keywords)
            const textMatch = taskCard.content.toLowerCase().includes(keywords)

            return titleMatch || textMatch

        }).forEach(taskCard => {
            taskCard.display = true
        })

    }
    hideCompletedCards(checkboxStatus);
    renderCards();
}

function hideCompletedCards(bool){
    if (bool){
        for (let taskIndex = 0; taskIndex < tasksList.length; taskIndex++){
            if (tasksList[taskIndex].isCompleted) {
                tasksList[taskIndex].display = false;
            }
        }
    }
    }


function renderCards() {
    const listaCardsDaily = document.getElementById("cardList-daily");
    const listaCardsWeekly = document.getElementById("cardList-weekly");
    const listaCardsMonthly = document.getElementById("cardList-monthly");
    const template = document.querySelector(".task-card-template");
 
    listaCardsDaily.innerHTML = "";
    listaCardsWeekly.innerHTML = "";
    listaCardsMonthly.innerHTML = "";

    if (tasksList.length > 0) {
        for (let taskIndex = 0; taskIndex < tasksList.length; taskIndex++) {
            if (tasksList[taskIndex].display) {
                const entry = template.cloneNode(true);
                const deleteTaskButton = entry.querySelector(".delete-task")
                const editTaskButton = entry.querySelector(".edit-task")
                const statusTaskButton = entry.querySelector(".is-completed-check")
                const cardElement = entry.querySelector(".card")
                const cardStatusIcon = entry.querySelector(".status-icon")
    
                entry.classList.remove("task-card-template")
                entry.querySelector(".card-header").innerText = tasksList[taskIndex].title;
                entry.querySelector(".card-text").innerText = tasksList[taskIndex].content;
    
                if (tasksList[taskIndex].isCompleted){
                    cardElement.classList.toggle("task-completed");
                    cardStatusIcon.classList.toggle("bi-check-circle")
                    cardStatusIcon.classList.toggle("bi-check-circle-fill")
                }
    
                deleteTaskButton.addEventListener('click', () => {
                    removeTask(taskIndex);
                    renderCards()
                })
                editTaskButton.addEventListener('click', () => {
                    openEditModal(taskIndex);
                })
                statusTaskButton.addEventListener('click', () => {
                    changeStatusTask(taskIndex);
                    renderCards();
                })
                switch (tasksList[taskIndex].category){
                    case "Daily":
                        listaCardsDaily.appendChild(entry);
                    break;
                    case "Weekly":
                        listaCardsWeekly.appendChild(entry);
                    break;
                    case "Monthly":
                        listaCardsMonthly.appendChild(entry);
                    break;
                }
                
            }

        }
    }

}