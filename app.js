let personas = JSON.parse(localStorage.getItem("personas")) || [];
let tareas = JSON.parse(localStorage.getItem("tareas")) || [];

const listaPersonas = document.getElementById("listaPersonas");
const listaTareas = document.getElementById("listaTareas");


document.getElementById("nuevaPersona").onclick = function() {

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


document.getElementById("nuevaTarea").onclick = function(){

    if(personas.length === 0){
        alert("Primero agrega personas");
        return;
    }

    let nombre = prompt("Nombre de la tarea:");

    if(nombre){

        let opciones = personas
        .map((p,i)=> `${i+1}. ${p.nombre}`)
        .join("\n");


        let elegir = prompt(
            "Asignar a:\n\n" + opciones
        );


        let persona = personas[elegir-1];


        if(persona){

            tareas.push({
                id: Date.now(),
                nombre:nombre,
                persona:persona.nombre,
                color:persona.color,
                hecha:false
            });


            guardar();
            mostrarTareas();
        }
    }

};



function mostrarPersonas(){

    listaPersonas.innerHTML="";


    personas.forEach(p=>{

        listaPersonas.innerHTML += `

        <div class="item persona">

            <div class="color"
            style="background:${p.color}">
            </div>

            <b>${p.nombre}</b>

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


        listaTareas.innerHTML += `

        <div class="item"
        style="border-left:8px solid ${t.color}">

            <b>${t.nombre}</b><br>

            👤 ${t.persona}<br>

            ${t.hecha ? "✅ Hecha":"⏳ Pendiente"}

            <br><br>


            <button onclick="completar(${t.id})">
            Cambiar estado
            </button>


            <button onclick="eliminarTarea(${t.id})">
            🗑 Eliminar
            </button>


        </div>

        `;

    });

}



function completar(id){

    let tarea = tareas.find(t=>t.id===id);

    if(tarea){

        tarea.hecha = !tarea.hecha;

        guardar();
        mostrarTareas();

    }

}



function eliminarTarea(id){

    if(confirm("¿Eliminar esta tarea?")){

        tareas = tareas.filter(t=>t.id!==id);

        guardar();
        mostrarTareas();

    }

}



function eliminarPersona(id){

    if(confirm("¿Eliminar esta persona?")){

        personas = personas.filter(p=>p.id!==id);

        guardar();
        mostrarPersonas();

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
