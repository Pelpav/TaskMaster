$("#task-form").on("submit", (e)=>{
 e.preventDefault();
 $("#task-list").append(`
  <li>
   <h3>${$("#task-title").val()}</h3>
   <p>${$("#task-description").val()}</p>
  </li>
 `);
 $(this).reset();
});