document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("nav a").forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
});

function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({
    behavior: "smooth",
  });
}

function addTask() {
  const taskInput = document.getElementById("new-task");
  const prioritySelect = document.getElementById("priority");
  const taskList = document.getElementById("task-list");

  if (taskInput.value.trim() !== "") {
    const newTask = document.createElement("li");
    newTask.textContent = taskInput.value;
    newTask.classList.add(prioritySelect.value + "-priority");

    const taskControls = document.createElement("div");

    const completeButton = document.createElement("button");
    completeButton.textContent = "Complete";
    completeButton.classList.add("complete");
    completeButton.onclick = function () {
      newTask.classList.toggle("completed");
      updateProgress();
    };

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.classList.add("edit");
    editButton.onclick = function () {
      const newValue = prompt(
        "Edit your task:",
        newTask.textContent.replace("CompleteEditRemove", "")
      );
      if (newValue !== null) {
        newTask.firstChild.textContent = newValue;
      }
    };

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.classList.add("remove");
    removeButton.onclick = function () {
      taskList.removeChild(newTask);
      updateProgress();
    };

    taskControls.appendChild(completeButton);
    taskControls.appendChild(editButton);
    taskControls.appendChild(removeButton);

    newTask.appendChild(taskControls);
    taskList.appendChild(newTask);
    taskInput.value = "";
    updateProgress();
  }
}

function filterTasks(filter) {
  const tasks = document.querySelectorAll("#task-list li");
  tasks.forEach((task) => {
    switch (filter) {
      case "all":
        task.style.display = "";
        break;
      case "completed":
        task.style.display = task.classList.contains("completed") ? "" : "none";
        break;
      case "pending":
        task.style.display = task.classList.contains("completed") ? "none" : "";
        break;
    }
  });
}

function sortTasks() {
  const taskList = document.getElementById("task-list");
  const tasks = Array.from(taskList.getElementsByTagName("li"));

  tasks.sort((a, b) => {
    const priorityOrder = {
      "high-priority": 1,
      "medium-priority": 2,
      "low-priority": 3,
    };

    const aPriority = Array.from(a.classList).find((c) =>
      c.endsWith("-priority")
    );
    const bPriority = Array.from(b.classList).find((c) =>
      c.endsWith("-priority")
    );

    return priorityOrder[aPriority] - priorityOrder[bPriority];
  });

  tasks.forEach((task) => taskList.appendChild(task));
}

function updateProgress() {
  const tasks = document.querySelectorAll("#task-list li");
  const completedTasks = document.querySelectorAll("#task-list li.completed");
  const progressBar = document.getElementById("progress-bar");

  const progress = (completedTasks.length / tasks.length) * 100;
  progressBar.value = progress;
}

document
  .getElementById("filter-all")
  .addEventListener("click", () => filterTasks("all"));
document
  .getElementById("filter-completed")
  .addEventListener("click", () => filterTasks("completed"));
document
  .getElementById("filter-pending")
  .addEventListener("click", () => filterTasks("pending"));
document.getElementById("sort-priority").addEventListener("click", sortTasks);
