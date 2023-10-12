$("#task-form").hide();

// pour enumerer les id des taches
var taskNum = 1;

// va contenir l'objet courant
var currentTask = {
    id: null,
    title: null,
    desc: null,
    date: null,
    priority: null,
    reset: () => {
        currentTask.id = null;
        currentTask.title = null;
        currentTask.desc = null;
        currentTask.date = null;
        currentTask.priority = null;
    }
}

// pour affiche la zone d'ajout de tache
$("#add-task-button").click(function (e) {
    $("#task-form").slideToggle();
});

// pour masquer la zone d'ajout de tache avec le button annuler
$("#btnCancelAddTask").click(function (e) {
    $("#task-form").slideToggle();
});

// pour ajouter une tache
$("form").on("submit" ,function (e) {
    // pour calculer la date restante
    let dueDate = new Date($("#task-due-date").val());
    let today = new Date();
    let timeDiff = dueDate.getTime() - today.getTime();
    let daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

    // on genere l'icone de priorite
    let priority = $("#task-priority").val();
    let priorityIcone = "red"
    let priorityColor = "rgba(255, 1, 1, 0.5)"
    if (priority == 2) {
        priorityIcone = "orange"
        priorityColor = "rgba(176, 179, 0, 0.5)"
    }
    else if (priority == 3) {
        priorityIcone = "green"
        priorityColor = "rgba(0, 179, 9, 0.5)"
    }

    // si la tache existe, on le modifie. sinon on ajoute une nouvelle
    if (currentTask.id == null) {
        // on genere la tasklist
        let component = `<div data-numTask="${taskNum}" class="taskLine d-flex justify-content-between align-items-center" style="margin-top:50px; padding: 10px; background: ${priorityColor}; border-radius: 15px;">
            <div style="width: 80%">
                <p>
                    <input data-numTask="${taskNum}" class="taskChecker" type="checkbox">
                    <b class="taskTitle">${$("#task-title").val()}</b>
                </p>
                <p class="taskDesc">${$("#task-description").val()}</p>
                <div class="d-flex justify-content-between" style="color: white;">
                    <span class="taskDate">${$("#task-due-date").val()}</span>
                    <span>Reste: <b class="taskTimeLefted">${daysDiff}</b> Jours</span>
                    <div class="taskPriority" data-priority="${priority}" style="background: ${priorityIcone}; border-radius: 50%; width: 20px; height: 20px;"></div>
                </div>
            </div>
            <div style="color: white; font-size: 25px; cursor: pointer;">
                <span style="padding: 10px;" class="taskDeleter" data-numTask="${taskNum}">
                    <ion-icon name="trash-outline"></ion-icon>
                </span>
                <span class="taskEditor" data-numTask="${taskNum}">
                    <ion-icon name="create"></ion-icon>
                </span>
            </div>
        </div>`;

        // on ajoute a liste
        $("#task-list").append(component);
    }
    else {
        $(`.taskLine[data-numtask=${currentTask.id}] .taskTitle`).text(
            $("#task-title").val()
        );

        $(`.taskLine[data-numtask=${currentTask.id}] .taskDesc`).text(
            $("#task-description").val()
        );

        $(`.taskLine[data-numtask=${currentTask.id}] .taskDate`).text(
            $("#task-due-date").val()
        );

        // pour calculer la date restante
        let dueDate = new Date($("#task-due-date").val());
        let today = new Date();
        let timeDiff = dueDate.getTime() - today.getTime();
        let daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
        $(`.taskLine[data-numtask=${currentTask.id}] .taskTimeLefted`).text(
            daysDiff
        );

        // on genere l'icone de priorite
        let priority = $("#task-priority").val();
        let priorityIcone = "red"
        let priorityColor = "rgba(255, 1, 1, 0.5)"
        if (priority == 2) {
            priorityIcone = "orange"
            priorityColor = "rgba(176, 179, 0, 0.5)"
        }
        else if (priority == 3) {
            priorityIcone = "green"
            priorityColor = "rgba(0, 179, 9, 0.5)"
        }

        $(`.taskLine[data-numtask=${currentTask.id}] .taskPriority`).css("background" , priorityIcone)
        $(`.taskLine[data-numtask=${currentTask.id}]`).css("background" , priorityColor)
    }


    // on masque la zone de saisie
    $("#btnCancelAddTask").trigger("click");

    currentTask.reset();

    // pour valider une tache
    $(".taskChecker").click(function (e) { 
        let id = $(this).attr("data-numtask");
        if($(this).is(':checked') ){
            $(`.taskLine[data-numtask=${id}] .taskTitle`).css("text-decoration", "line-through")
            $(`.taskLine[data-numtask=${id}]`).css("filter" , 'grayscale(100%)');
        }
        else{
            $(`.taskLine[data-numtask=${id}] .taskTitle`).css("text-decoration", "initial")
            $(`.taskLine[data-numtask=${id}]`).css("filter" , 'grayscale(0%)');
        }
    });

    // pour supprimer une tache. on recupere l'id et on le supprimme
    $(".taskDeleter").click(function (e) {
        let id = $(this).attr("data-numTask");
        $(`.taskLine[data-numtask=${id}]`).remove();
    });

    // pour modiifer une tache. on recupere les infos et on les charge dans le forme
    $(".taskEditor").click(function (e) {
        id = $(this).attr("data-numTask");
        currentTask.id = id;
        currentTask.title = $(`.taskLine[data-numtask=${id}] .taskTitle`).text();
        currentTask.desc = $(`.taskLine[data-numtask=${id}] .taskDesc`).text();
        currentTask.date = $(`.taskLine[data-numtask=${id}] .taskDate`).text();
        currentTask.priority = $(`.taskLine[data-numtask=${id}] .taskPriority`).attr("data-priority");
        console.log(currentTask);

        $("#task-title").val(currentTask.title);
        $("#task-description").text(currentTask.desc);
        $("#task-due-date").val(currentTask.date);
        $("#task-priority").val(currentTask.priority);

        $("#task-form").show();
    });

    taskNum++;

    e.preventDefault();

});


