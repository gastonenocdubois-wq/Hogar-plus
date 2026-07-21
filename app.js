let personas = JSON.parse(localStorage.getItem("personas")) || [];
let tareas = JSON.parse(localStorage.getItem("tareas")) || [];

const listaPersonas = document.getElementById("listaPersonas");
const listaTareas = document.getElementById("listaTareas");


document.getElementById("nuevaPersona").onclick = function(){

    let nombre = prompt("Nombre de la persona:");

    if(nombre){

        let colores=[
            "#e74c3c",
            "#3498db",
            "#2ecc71",
            "#9b59b6",
            "#f39c12"
        ];

        personas.push({
            id:Date.now(),
            nombre:nombre,
            color:colores[personas.length % colores.length]
        });

        guardar();
        mostrarPersonas();
    }
};



document.getElementById("nuevaTarea").onclick=function(){

    if(personas.length===0){
        alert("Primero agrega personas");
        return;
    }


    let nombre=prompt("Nombre de la tarea:");

    let lista=personas
    .map((p,i)=>`${i+1}. ${p.nombre}`)
    .join("\n");


    let elegido=prompt("Asignar a:\n\n"+lista);


    let persona=personas[elegido-1];


    if(nombre && persona){

        tareas.push({

            id:Date.now(),
            nombre:nombre,
            persona:persona.nombre,
            color:persona.color,
            hecha:false

        });


        guardar();
        mostrarTareas();

    }

};



function mostrarPersonas(){

    listaPersonas.innerHTML="";


    personas.forEach(p=>{

        listaPersonas.innerHTML+=`

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



function mostrarTareas(){

    listaTareas.innerHTML="";


    tareas.forEach(t=>{

        listaTareas.innerHTML+=`

        <div class="item"
        style="border-left:8px solid ${t.color}">

        <b>${t.nombre}</b><br>

        👤 ${t.persona}<br>

        ${t.hecha ? "✅ Hecha":"⏳ Pendiente"}

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



function editarPersona(id){

    let persona=personas.find(p=>p.id===id);

    let nuevo=prompt(
        "Nuevo nombre:",
        persona.nombre
    );


    if(nuevo){

        persona.nombre=nuevo;


        tareas.forEach(t=>{

            if(t.persona===persona.nombre){
                t.persona=nuevo;
            }

        });


        guardar();
        mostrarPersonas();
        mostrarTareas();

    }

}



function editarTarea(id){

    let tarea=tareas.find(t=>t.id===id);


    let nuevo=prompt(
        "Nuevo nombre de tarea:",
        tarea.nombre
    );


    if(nuevo){

        tarea.nombre=nuevo;

        guardar();
        mostrarTareas();

    }

}



function completar(id){

    let tarea=tareas.find(t=>t.id===id);

    tarea.hecha=!tarea.hecha;

    guardar();
    mostrarTareas();

}



function eliminarPersona(id){

    if(confirm("¿Eliminar persona?")){

        personas=personas.filter(p=>p.id!==id);

        guardar();
        mostrarPersonas();

    }

}



function eliminarTarea(id){

    if(confirm("¿Eliminar tarea?")){

        tareas=tareas.filter(t=>t.id!==id);

        guardar();
        mostrarTareas();

    }

}



function guardar(){

localStorage.setItem(
"personas",
JSON.stringify(personas)
);


localStorage.setItem(
"tareas",
JSON.stringify(tareas)
);

}



mostrarPersonas();
mostrarTareas();
document.getElementById("nuevoMes").onclick = function(){

    if(tareas.length === 0){
        alert("No hay tareas para copiar");
        return;
    }


    let confirmar = confirm(
        "¿Crear nuevo mes?\n\nLas tareas actuales se copiarán como pendientes."
    );


    if(confirmar){

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
        mostrarTareas();


        alert("Nuevo mes creado correctamente");

    }

};
