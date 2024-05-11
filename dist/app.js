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
    renderTaskList(); // Re-render after adding task
}
// Takes the task's id as input.
function removeTask(id) {
    // Filters the tasks array
    tasks = tasks.filter(task => task.id !== id);
    renderTaskList(); // Re-render after removing task
    console.log("Task removed with ID:", id);
}
// Takes the task's id and an updated Task object as input.
function updateTask(id, updatedTask) {
    // Finds the index of the task with the matching id
    const index = tasks.findIndex(task => task.id === id);
    // Replace the task at that index
    if (index !== -1) {
        tasks[index] = updatedTask;
        renderTaskList(); // Re-render after updating task
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
    // Wrap elements in a div
    const taskContent = document.createElement("div");
    taskContent.classList.add("d-flex", "align-items-center");
    // Render Checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => toggleComplete(task.id)); // add action on trigger
    // Render Description with Edit
    const descriptionInput = document.createElement("input");
    descriptionInput.type = "text";
    descriptionInput.classList.add("form-control", "form-control-sm");
    descriptionInput.value = task.description;
    descriptionInput.addEventListener("blur", () => {
        const newDescription = descriptionInput.value.trim();
        if (newDescription && newDescription !== task.description) {
            updateTask(task.id, Object.assign(Object.assign({}, task), { description: newDescription }));
        }
    });
    // Render Delete Button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("btn", "btn-danger", "btn-sm", "float-end");
    deleteButton.addEventListener("click", () => removeTask(task.id)); // add action on trigger
    // Append all elemtns to task wrapper
    taskContent.appendChild(checkbox);
    taskContent.appendChild(descriptionInput);
    taskContent.appendChild(deleteButton);
    li.appendChild(taskContent);
    return li;
}
// Clear and render task list
function renderTaskList() {
    taskList.innerHTML = ""; // Clear the current list
    for (const task of tasks) {
        const taskItem = renderTask(task);
        taskList.appendChild(taskItem);
    }
}
