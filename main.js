window.onload = function() {
    loadTasks();
};

function addTask() {
    const taskInput = document.getElementById("taskInput");
    if (taskInput.value === "") {
        alert("Adicione uma tarefa !");
        return;
    }

    const taskList = document.getElementById("taskList");
    const li = document.createElement("li");
    li.textContent = taskInput.value;
    li.onclick = function() {
        this.classList.toggle("completed");
        saveTasks();
    };
    li.ondblclick = function() {
        editTask(this);
    };
    
    taskList.appendChild(li);
    saveTasks();
    taskInput.value = "";
}

function editTask(li) {
    const newText = prompt("Digite o novo texto da tarefa:", li.textContent);
    if (newText !== null && newText.trim() !== "") {
        li.textContent = newText;
        saveTasks();
    }
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll("#taskList li").forEach(function(li) {
        tasks.push({ text: li.textContent, completed: li.classList.contains("completed") });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    if (tasks) {
        const taskList = document.getElementById("taskList");
        tasks.forEach(function(task) {
            const li = document.createElement("li");
            li.textContent = task.text;
            if (task.completed) {
                li.classList.add("completed");
            }
            li.onclick = function() {
                this.classList.toggle("completed");
                saveTasks();
            };
            li.ondblclick = function() {
                editTask(this);
            };
            taskList.appendChild(li);
        });
    }
}

function hideCompletedTasks() {
    document.querySelectorAll(".completed").forEach(function(task) {
        task.classList.toggle("hide");
    });
}
