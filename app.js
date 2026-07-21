let personas = JSON.parse(localStorage.getItem("personas")) || [];
let tareas = JSON.parse(localStorage.getItem("tareas")) || [];
let mesActual = localStorage.getItem("mesActual") || obtenerMes();
let historial = JSON.parse(localStorage.getItem("historial")) || [];

const listaPersonas = document.getElementById("listaPersonas");
const listaTareas = document.getElementById("listaTareas");
const mostrarMes = document.getElementById("mesActual");
const mostrarHistorial = document.getElementById("historial");


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
// EDITAR PERSONA

function editarPersona(id){

    let persona = personas.find(p=>p.id===id);

    let nuevo = prompt(
        "Nuevo nombre:",
        persona.nombre
    );


    if(nuevo){

        let nombreAnterior = persona.nombre;

        persona.nombre = nuevo;


        tareas.forEach(t=>{

            if(t.persona === nombreAnterior){

                t.persona = nuevo;

            }

        });


        guardar();

        mostrarPersonas();

        mostrarTareas();

    }

}



// EDITAR TAREA

function editarTarea(id){

    let tarea = tareas.find(t=>t.id===id);


    let nuevo = prompt(
        "Nuevo nombre de tarea:",
        tarea.nombre
    );


    if(nuevo){

        tarea.nombre = nuevo;


        guardar();

        mostrarTareas();

    }

}



// CAMBIAR ESTADO

function completar(id){

    let tarea = tareas.find(t=>t.id===id);


    if(tarea){

        tarea.hecha = !tarea.hecha;


        guardar();

        mostrarTareas();

    }

}



// ELIMINAR PERSONA

function eliminarPersona(id){

    if(confirm("¿Eliminar persona?")){


        personas = personas.filter(
            p=>p.id!==id
        );


        guardar();

        mostrarPersonas();

    }

}



// ELIMINAR TAREA

function eliminarTarea(id){

    if(confirm("¿Eliminar tarea?")){


        tareas = tareas.filter(
            t=>t.id!==id
        );


        guardar();

        mostrarTareas();

    }

}



// GUARDAR DATOS

function guardar(){

    localStorage.setItem(
        "personas",
        JSON.stringify(personas)
    );


    localStorage.setItem(
        "tareas",
        JSON.stringify(tareas)
    );


    localStorage.setItem(
        "mesActual",
        mesActual
    );

}



// MES ACTUAL

function obtenerMes(){

    let fecha = new Date();


    return fecha.toLocaleDateString(
        "es-ES",
        {
            month:"long",
            year:"numeric"
        }
    );

}



function actualizarMes(){

    if(mostrarMes){

        mostrarMes.innerHTML =
        "📅 Mes actual: " + mesActual;

    }

}



function obtenerMesSiguiente(){

    let fecha = new Date();


    fecha.setMonth(
        fecha.getMonth()+1
    );


    return fecha.toLocaleDateString(
        "es-ES",
        {
            month:"long",
            year:"numeric"
        }
    );

}



// NUEVO MES

document.getElementById("nuevoMes").onclick = function(){


    if(tareas.length === 0){

        alert("No hay tareas para copiar");

        return;

    }



    let confirmar = confirm(
        "¿Crear nuevo mes?\n\nLas tareas pasarán nuevamente a pendientes."
    );



    if(confirmar){
        historial.push({

            mes: mesActual,

            tareas: tareas

        });


        mesActual = obtenerMesSiguiente();



        tareas = tareas.map(t=>{


            return {

                id: Date.now() + Math.random(),

                nombre:t.nombre,

                persona:t.persona,

                color:t.color,

                hecha:false

            };


        });



        guardar();


        actualizarMes();


        mostrarTareas();



        alert(
            "Nuevo mes creado correctamente"
        );


    }


};



// INICIO

actualizarMes();

mostrarPersonas();

mostrarTareas();



// INSTALAR COMO APP

if("serviceWorker" in navigator){

    window.addEventListener(
        "load",
        function(){

            navigator.serviceWorker
            .register("sw.js");

        }

    );

}
