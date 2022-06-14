document.getElementById('form-task').addEventListener('submit', saveTask);

//Salvar nova tarefa 

function saveTask(e){

    
    let title = document.getElementById("title").value;
    let description = document.getElementById("description").value;  // valores dos inputs 

    let task = {
        title,
        description
    };

    if (localStorage.getItem('tasks') === null) {
        let tasks = [];
        localStorage.setItem('tasks', JSON.stringify(tasks));  
    } else {
        let tasks = JSON.parse(localStorage.getItem('tasks'));
        tasks.push(task); 
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    getTasks();

    // redefinir form-task
    document.getElementById('form-task').reset();
    e.preventDefault();

}

// Deletar tarefa 
function deleteTask(title) {  
   
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    for (let i = 0; i < tasks.length; i++) { // Lista todo o conteúdo do array e exclui somente o titulo que for igual ao recebido no parametro.
        if (tasks[i].title == title) {
            tasks.splice(i, 1);
        }
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));
    getTasks();

}

function getTasks() {

    let tasks = JSON.parse(localStorage.getItem('tasks'));
    let tasksView = document.getElementById('tasks');
    tasksView.innerHTML = '';

    for(let i = 0; i < tasks.length; i++) {
        
        let title = tasks[i].title;
        let description = tasks[i].description;

        tasksView.innerHTML += 
        `<div class="card-mb-3">
            <div class="card-body">
                <div class="row">
                    <div class="col-sm-3 text-left">
                        <p>${title}</p>
                    </div>
                    <div class="col-sm-7 text-left">
                        <p>${description}</p>
                    </div>
                    <div class="col-sm-2 text-right">
                        <a href="#" onclick="deleteTask('${title}')" class="btn btn-danger ml-5" >X</a>
                    </div>
                </div>
            </div>
        </div>
        `;
    }

} 

getTasks();
