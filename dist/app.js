"use strict";
let tasks = [];
const newTaskInput = document.getElementById("new-task-input");
const addTaskButton = document.getElementById("add-task-button");
const taskList = document.getElementById("task-list");
// Takes a task description as input.
function addTask(description) {
    // Creates a new Task
    const newTask = {
        id: tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1, // adds +1 to the amount of tasks to give it an ID
        description,
        completed: false
    };
    tasks.push(newTask);
    console.log("Task added:", newTask);
    renderTaskList();
}
// Takes the task's id as input.
function removeTask(id) {
    // Filters the tasks array
    tasks = tasks.filter(task => task.id !== id);
    renderTaskList();
    console.log("Task removed with ID:", id);
}
// Takes the task's id and an updated Task object as input.
function updateTask(id, updatedTask) {
    // Finds the index of the task with the matching id
    const index = tasks.findIndex(task => task.id === id);
    // Replace the task at that index
    if (index !== -1) {
        tasks[index] = updatedTask;
        console.log("Task updated:", updatedTask);
    }
}
// Takes the task's id as input.
function toggleComplete(id) {
    // Finds the index of the task with the matching id
    const index = tasks.findIndex(task => task.id === id);
    if (index !== -1) {
        tasks[index].completed = !tasks[index].completed;
        renderTaskList();
        console.log("Task completion toggled for ID:", id);
    }
}
// For when add task is clicked
addTaskButton.addEventListener("click", () => {
    const newTaskDescription = newTaskInput.value.trim();
    if (newTaskDescription) {
        addTask(newTaskDescription);
        newTaskInput.value = ""; // Clear the input field
        console.log("Tasks:", tasks); // Log the updated tasks array
    }
});
function renderTask(task) {
    const li = document.createElement("li");
    li.classList.add("list-group-item");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => toggleComplete(task.id));
    const descriptionSpan = document.createElement("span");
    descriptionSpan.classList.add("mx-3");
    descriptionSpan.textContent = task.description;
    descriptionSpan.addEventListener("click", () => toggleComplete(task.id));
    if (task.completed) {
        descriptionSpan.classList.add("completed");
    }
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("btn", "btn-danger", "btn-sm", "float-end");
    deleteButton.addEventListener("click", () => removeTask(task.id));
    li.appendChild(checkbox);
    li.appendChild(descriptionSpan);
    li.appendChild(deleteButton);
    return li;
}
function renderTaskList() {
    taskList.innerHTML = ""; // Clear the current list
    for (const task of tasks) {
        const taskItem = renderTask(task);
        taskList.appendChild(taskItem);
    }
}
