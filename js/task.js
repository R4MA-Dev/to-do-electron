const input = document.querySelector("input");
const addBtn = document.querySelector(".btn-add");
const ul = document.querySelector("ul");
const spanTaskCompleted = document.querySelector("#numero-completadas")
const empty = document.querySelector(".empty");
let items = [];
let tasksCompleted;

window.onload = (e)=>{
    let items_json = localStorage.getItem("Tarea");
    tasksCompleted = localStorage.getItem("tareas-completadas") === null ? 0 : parseInt(localStorage.getItem("tareas-completadas"))

    spanTaskCompleted.textContent = tasksCompleted

    if (items_json !== null) {
        items = JSON.parse(items_json);
        for(let item of items){
            crearItem(item.msg);
        }
    }
}

function crearItem(text){
    const li = document.createElement("li");

    const p = document.createElement("p");
    p.textContent = text;

    li.appendChild(p);
    li.appendChild(addCheckBtn());
    li.appendChild(addDeleteBtn());
    ul.appendChild(li);

    input.value = "";
    empty.style.display = "none";
}

addBtn.addEventListener("click", (e)=>{
    e.preventDefault(); // Para evitar que se recargue la pagina cada vez que envie la información
    const text = input.value;

    if(text !== ""){
        crearItem(text);
        
        items.push({ msg: text });

        localStorage.setItem("Tarea", JSON.stringify(items));
    }
});

function deleteButton(msg) {
    items = items.filter(item => item.msg !== msg);
    localStorage.setItem("Tarea", JSON.stringify(items));
}

function addDeleteBtn(){
    const deleteBtn = document.createElement("button");

    deleteBtn.textContent = "X";
    deleteBtn.className = "btn-delete";

    deleteBtn.onclick = (e)=>{
        deleteTask(e,"¡Tarea Cancelada!", "#ac1c3d", deleteBtn, 1, false)
    }

    return deleteBtn;
}



function addCheckBtn(){
    const checkBtn = document.createElement("button");

    checkBtn.textContent = "✓";
    checkBtn.className = "btn-check";

    checkBtn.onclick = (e)=>{
        deleteTask(e,"¡Tarea Completada!", "#308f1a", checkBtn, 2, true)
    }

    return checkBtn;
}

const deleteTask = (event, msg, color, btn, node, boolean)=>{
    const li = event.target.parentElement;
    li.style.backgroundColor = color
    li.style.animation = "opacidad 1.26s linear 0s"

    const p = event.target.parentElement.childNodes[0];
    let texto = p.textContent;
    deleteButton(texto);
    
    p.style.color = "white"
    p.textContent = msg

    btn.style.display = "none"

    const brotherBtn = event.target.parentElement.childNodes[node];
    brotherBtn.style.display = "none";

    if(boolean === true){
        tasksCompleted += 1
        localStorage.setItem("tareas-completadas", tasksCompleted)
        spanTaskCompleted.textContent = tasksCompleted
    }

    setTimeout(()=>{
        const item = event.target.parentElement;
        ul.removeChild(item);

        const items = document.querySelectorAll("li");
        if(items.length === 0){
            empty.style.display = "block";
        };
    }, 1250);
}