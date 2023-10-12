var taskLength = 0;

// Cette fonction permet d'ajouter une tâche
document.addEventListener("DOMContentLoaded", function () {
  
  
  // On récupère les éléments du DOM
  let addTaskButton = document.getElementById("add-task-button");
  let noTasksSection = document.getElementById("no-tasks");
  let taskFormSection = document.getElementById("task-form");
  let taskListSection = document.getElementById("task-list");
  let AddTask = document.getElementById("tasks");
  let btnAddTask = document.getElementById("btnAddTask");
  let deleteIcon = document.querySelector("ion-icon[name='trash-outline']");
  
  // On ajoute des écouteurs d'événements pour les boutons
  addTaskButton.addEventListener("click", showTaskForm);
  btnAddTask.addEventListener("click", showTaskForm);

  // Cette fonction permet d'afficher le formulaire de tâche
  function showTaskForm() {
    noTasksSection.style.display = "none";
    taskFormSection.style.display = "block";
    taskListSection.style.display = "none";
    AddTask.style.display = "none";

    let footer = document.querySelector("footer");
  footer.style.display = "none";
  }

// Ajoutez un écouteur d'événements pour le clic
deleteIcon.addEventListener("click", function () {
  // Récupérez tous les éléments de tâche
  let tasks = document.querySelectorAll("#task-list tr");

  // Parcourez chaque tâche et supprimez-la
  tasks.forEach(function (task) {
    task.parentNode.removeChild(task);
  });

  // Cachez la section des tâches et affichez la section "no-tasks"
  document.getElementById("tasks").style.display = "none";
  document.getElementById("no-tasks").style.display = "block";
});
  
  // On récupère les éléments du formulaire de tâche
  let taskForm = document.querySelector("#task-form form");
  let taskList = document.getElementById("task-list");

  // On ajoute un écouteur d'événements pour la liste de tâches
  taskList.addEventListener("click", function (event) {
    let target = event.target;
    if (target.classList.contains("task-title")) {
      let menu = document.createElement("div");
      menu.classList.add("menu");
      menu.style.top = event.clientY + "px";
      menu.style.left = event.clientX + "px";
      let deleteOption = document.createElement("p");
      deleteOption.innerHTML = "Supprimer";
      deleteOption.addEventListener("click", function () {
        let taskItem = target.parentNode.parentNode;
        let taskCheckbox = taskItem.querySelector(".task-checkbox");
        taskItem.remove();
        taskCheckbox.remove();
        menu.style.display = "none";
        // On vérifie si la liste de tâches est vide après la suppression
        let remainingTasks = document.querySelectorAll("#task-list tr");
        if (remainingTasks.length === 0) {
          noTasksSection.style.display = "block";
          taskFormSection.style.display = "none";
          taskListSection.style.display = "none";
          AddTask.style.display = "none";
        }
      });

      let editOption = document.createElement("p");
      editOption.innerHTML = "<br>Modifier";
      editOption.addEventListener("click", function () {
        // Récupérer les valeurs de la tâche à modifier
        let taskItem = target.parentNode.parentNode;
        let taskTitle = taskItem.querySelector(".task-title");
        let taskDescription = taskItem.querySelector(".task-description");
        let taskDaysRemaining = taskItem.querySelector(".task-days-remaining");
        let taskPriority = taskItem.querySelector(".task-priority");

        // Remplir les champs du formulaire avec les valeurs de la tâche
        let titleInput = document.getElementById("task-title");
        let descriptionInput = document.getElementById("task-description");
        let priorityInput = document.getElementById("task-priority");

        titleInput.value = taskTitle.textContent;
        descriptionInput.value = taskDescription.textContent;
        priorityInput.value = taskPriority.getPriorityNum;

        let taskCheckbox = taskItem.querySelector(".task-checkbox");
        taskItem.remove();
        taskCheckbox.remove();
        menu.style.display = "none";

        // Afficher le formulaire de tâche
        noTasksSection.style.display = "none";
        taskFormSection.style.display = "block";
        taskListSection.style.display = "none";
        // Ajouter un écouteur d'événements pour l'option "Modifier"
        editOption.addEventListener("click", editTask);
      });
      menu.appendChild(deleteOption);
      menu.appendChild(editOption);
      taskList.appendChild(menu);
      target.addEventListener("click", function () {
        menu.remove();
      });
    }
  });

  // On ajoute un écouteur d'événements pour le formulaire de tâche
  taskForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // On récupère les valeurs du formulaire
    let titleInput = document.getElementById("task-title");
    let descriptionInput = document.getElementById("task-description");
    let dueDateInput = document.getElementById("task-due-date");
    let priorityInput = document.getElementById("task-priority");

    let title = titleInput.value;
    let description = descriptionInput.value;
    let dueDate = new Date(dueDateInput.value);
    let priority = priorityInput.value;

    let today = new Date();
    let timeDiff = dueDate.getTime() - today.getTime();
    let daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

    // On crée un élément de tâche
    let taskItem = document.createElement("tr");
    let taskCheckbox = document.createElement("td");
    let taskTitle = document.createElement("td");
    let taskDescription = document.createElement("td");
    let taskDaysRemaining = document.createElement("td");
    let taskPriority = document.createElement("td");

    // On ajoute les valeurs de la tâche à l'élément de tâche
    taskCheckbox.innerHTML = '<input type="checkbox" class="task-checkbox">';
    taskTitle.innerHTML = `<p class="task-title">${title}</p>`;
    taskDescription.innerHTML = `<p class="task-description">${description}</p>`;
    taskDaysRemaining.innerHTML = `<p class="task-days-remaining">${daysDiff} jours restants</p>`;
    taskPriority.innerHTML = `<p class="task-priority">Priorité: ${getPriorityLabel(
      priority
    )} </p>`;

    // On ajoute l'élément de tâche à la liste de tâches
    taskItem.appendChild(taskCheckbox);
    taskItem.appendChild(taskTitle);
    taskTitle.appendChild(taskDescription);
    taskDescription.appendChild(taskDaysRemaining);
    taskTitle.appendChild(taskPriority);

    taskList.appendChild(taskItem);

    // On ajoute un écouteur d'événements pour les cases à cocher
    let taskCheckboxes = document.querySelectorAll(
      '#task-list input[type="checkbox"]'
    );
    taskCheckboxes.forEach(function (checkbox) {
      checkbox.addEventListener("change", function () {
        let taskItem = this.parentNode.parentNode;
        let taskTitle = taskItem.querySelector(".task-title");
        let taskDescription = taskItem.querySelector(".task-description");
        let taskDaysRemaining = taskItem.querySelector(".task-days-remaining");

        if (this.checked) {
          taskTitle.classList.add("checked");
          taskDescription.style.display = "none";
          taskDaysRemaining.style.display = "none";
        } else {
          taskTitle.classList.remove("checked");
          taskDescription.style.display = "block";
          taskDaysRemaining.style.display = "block";
        }
      });
      // Ajoutez cette ligne après avoir créé une nouvelle tâche
localStorage.setItem('tasks', JSON.stringify(tasks));
    });

    // On vide les champs du formulaire
    titleInput.value = "";
    descriptionInput.value = "";
    dueDateInput.value = "";
    priorityInput.value = "";

    // On affiche les éléments nécessaires
    taskFormSection.style.display = "none";
    taskListSection.style.display = "block";
    noTasksSection.style.display = "none";
    AddTask.style.display = "block";
    taskItem.classList.add("animated-border");

     // Réafficher le footer
  let footer = document.querySelector("footer");
  footer.style.display = "block";
  });

  // Cette fonction permet de récupérer le label de priorité
  function getPriorityLabel(priority) {
    switch (priority) {
      case "1":
        return "Basse";
      case "2":
        return "Moyenne";
      case "3":
        return "Haute";
      default:
        return "";
    }
  }

  function getPriorityNum(label) {
    switch (label) {
      case "Basse":
        return "1";
      case "Moyenne":
        return "2";
      case "Haute":
        return "3";
      default:
        return "";
    }
  }
});
