let personas = JSON.parse(localStorage.getItem("personas")) || [];
let tareas = JSON.parse(localStorage.getItem("tareas")) || [];
let mesActual = localStorage.getItem("mesActual") || obtenerMes();

const listaPersonas = document.getElementById("listaPersonas");
const listaTareas = document.getElementById("listaTareas");
const mostrarMes = document.getElementById("mesActual");


// CREAR PERSONA

document.getElementById("nuevaPersona").onclick = function(){

    let nombre = prompt("Nombre de la persona:");

    if(nombre){

        let colores = [
            "#e74c3c",
            "#3498db",
            "#2ecc71",
            "#9b59b6",
            "#f39c12"
        ];

        personas.push({
            id: Date.now(),
            nombre: nombre,
            color: colores[personas.length % colores.length]
        });

        guardar();
        mostrarPersonas();
    }

};



// CREAR TAREA

document.getElementById("nuevaTarea").onclick = function(){

    if(personas.length === 0){

        alert("Primero agrega personas");
        return;

    }


    let nombre = prompt("Nombre de la tarea:");

    let lista = personas
    .map((p,i)=>`${i+1}. ${p.nombre}`)
    .join("\n");


    let elegido = prompt(
        "Asignar a:\n\n" + lista
    );


    let persona = personas[elegido-1];


    if(nombre && persona){

        tareas.push({

            id: Date.now(),

            nombre: nombre,

            persona: persona.nombre,

            color: persona.color,

            hecha:false

        });


        guardar();

        mostrarTareas();

    }

};



// MOSTRAR PERSONAS

function mostrarPersonas(){

    listaPersonas.innerHTML = "";


    personas.forEach(p=>{

        listaPersonas.innerHTML += `

        <div class="item persona">

            <div class="color"
            style="background:${p.color}">
            </div>


            <b>${p.nombre}</b>


            <button onclick="editarPersona(${p.id})">
            ✏️
            </button>


            <button onclick="eliminarPersona(${p.id})">
            🗑
            </button>


        </div>

        `;

    });

}



// MOSTRAR TAREAS

function mostrarTareas(){

    listaTareas.innerHTML = "";


    tareas.forEach(t=>{

        listaTareas.innerHTML += `

        <div class="item"
        style="border-left:8px solid ${t.color}">


        <b>${t.nombre}</b><br>


        👤 ${t.persona}<br>


        ${t.hecha ? "✅ Hecha" : "⏳ Pendiente"}


        <br><br>


        <button onclick="editarTarea(${t.id})">
        ✏️ Editar
        </button>


        <button onclick="completar(${t.id})">
        Cambiar estado
        </button>


        <button onclick="eliminarTarea(${t.id})">
        🗑
        </button>


        </div>

        `;

    });

}
