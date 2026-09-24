/* ========================================
   TO-DO LIST APP
======================================== */


/* ========================================
   HTML ELEMENTS
======================================== */

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");

const taskList = document.getElementById("taskList");
const emptyMessage = document.getElementById("emptyMessage");

const taskCount = document.getElementById("taskCount");
const clearCompletedBtn =
    document.getElementById("clearCompletedBtn");

const filterButtons =
    document.querySelectorAll(".filter-btn");


/* ========================================
   TASK DATA
======================================== */

let tasks =
    JSON.parse(localStorage.getItem("tasks")) || [];

let currentFilter = "all";


/* ========================================
   SAVE TASKS
======================================== */

function saveTasks() {

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
}


/* ========================================
   DISPLAY TASKS
======================================== */

function displayTasks() {

    taskList.innerHTML = "";


    /* Filter tasks */

    let filteredTasks = tasks.filter(function(task) {

        if (currentFilter === "active") {

            return !task.completed;
        }

        if (currentFilter === "completed") {

            return task.completed;
        }

        return true;
    });


    /* Empty message */

    if (filteredTasks.length === 0) {

        emptyMessage.style.display = "block";

    } else {

        emptyMessage.style.display = "none";
    }


    /* Create task elements */

    filteredTasks.forEach(function(task) {

        const li =
            document.createElement("li");

        li.className = "task-item";


        if (task.completed) {

            li.classList.add("completed");
        }


        /* Checkbox */

        const checkbox =
            document.createElement("input");

        checkbox.type = "checkbox";

        checkbox.className =
            "task-checkbox";

        checkbox.checked =
            task.completed;


        checkbox.addEventListener(
            "change",
            function() {

                toggleTask(task.id);
            }
        );


        /* Task text */

        const taskText =
            document.createElement("span");

        taskText.className =
            "task-text";

        taskText.textContent =
            task.text;


        /* Action buttons */

        const actions =
            document.createElement("div");

        actions.className =
            "task-actions";


        /* Edit button */

        const editButton =
            document.createElement("button");

        editButton.className =
            "edit-btn";

        editButton.textContent =
            "Edit";


        editButton.addEventListener(
            "click",
            function() {

                editTask(task.id);
            }
        );


        /* Delete button */

        const deleteButton =
            document.createElement("button");

        deleteButton.className =
            "delete-btn";

        deleteButton.textContent =
            "Delete";


        deleteButton.addEventListener(
            "click",
            function() {

                deleteTask(task.id);
            }
        );


        /* Add buttons */

        actions.appendChild(editButton);

        actions.appendChild(deleteButton);


        /* Add elements */

        li.appendChild(checkbox);

        li.appendChild(taskText);

        li.appendChild(actions);


        taskList.appendChild(li);
    });


    updateTaskCount();
}


/* ========================================
   ADD TASK
======================================== */

function addTask() {

    const text =
        taskInput.value.trim();


    if (text === "") {

        alert("Please enter a task.");

        return;
    }


    const newTask = {

        id: Date.now(),

        text: text,

        completed: false
    };


    tasks.push(newTask);


    saveTasks();

    displayTasks();


    taskInput.value = "";

    taskInput.focus();
}


/* ========================================
   TOGGLE TASK
======================================== */

function toggleTask(id) {

    tasks = tasks.map(function(task) {

        if (task.id === id) {

            return {
                ...task,
                completed: !task.completed
            };
        }

        return task;
    });


    saveTasks();

    displayTasks();
}


/* ========================================
   EDIT TASK
======================================== */

function editTask(id) {

    const task =
        tasks.find(function(task) {

            return task.id === id;
        });


    if (!task) {
        return;
    }


    const newText =
        prompt(
            "Edit your task:",
            task.text
        );


    if (newText === null) {
        return;
    }


    const updatedText =
        newText.trim();


    if (updatedText === "") {

        alert("Task cannot be empty.");

        return;
    }


    task.text =
        updatedText;


    saveTasks();

    displayTasks();
}


/* ========================================
   DELETE TASK
======================================== */

function deleteTask(id) {

    const confirmed =
        confirm(
            "Are you sure you want to delete this task?"
        );


    if (!confirmed) {
        return;
    }


    tasks = tasks.filter(function(task) {

        return task.id !== id;
    });


    saveTasks();

    displayTasks();
}


/* ========================================
   UPDATE TASK COUNT
======================================== */

function updateTaskCount() {

    const remainingTasks =
        tasks.filter(function(task) {

            return !task.completed;
        }).length;


    if (remainingTasks === 1) {

        taskCount.textContent =
            "1 task remaining";

    } else {

        taskCount.textContent =
            `${remainingTasks} tasks remaining`;
    }
}


/* ========================================
   CLEAR COMPLETED
======================================== */

function clearCompleted() {

    tasks = tasks.filter(function(task) {

        return !task.completed;
    });


    saveTasks();

    displayTasks();
}


/* ========================================
   FILTER TASKS
======================================== */

filterButtons.forEach(function(button) {

    button.addEventListener(
        "click",
        function() {

            filterButtons.forEach(
                function(btn) {

                    btn.classList.remove(
                        "active"
                    );
                }
            );


            button.classList.add("active");


            currentFilter =
                button.dataset.filter;


            displayTasks();
        }
    );
});


/* ========================================
   ADD BUTTON
======================================== */

addTaskBtn.addEventListener(
    "click",
    addTask
);


/* ========================================
   ENTER KEY
======================================== */

taskInput.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {

            addTask();
        }
    }
);


/* ========================================
   CLEAR COMPLETED BUTTON
======================================== */

clearCompletedBtn.addEventListener(
    "click",
    clearCompleted
);


/* ========================================
   INITIAL DISPLAY
======================================== */

displayTasks();
