//TODO Documentar el proyecto
//BUG Limpiar registro de Alumno y Selector de Cursos al Añadir Nuevo
/**
 * Inicializacion de
 * Variables Globales
 */
const endpoint = "http://192.168.0.33:8080/com.apprest.ipartek.ejercicios/api/";
const alumnosApi = endpoint + "personas/";
const cursosApi = endpoint + "cursos/";

const eList = document.getElementById('alist');
const acList = document.getElementById('aclist');

let alumnos = [];
let cursos = [];

let alumnoSeleccionado = {
  id: 0,
  nombre: "sin nombre",
  avatar: "img/avatar1.png",
  sexo: "h",
  cursos: []
};

/**
 * Main
 * Inicializa init cuando todo se ha cargado
 */
window.addEventListener("load", init());

function init() {
  console.debug("Documennt loaded...");
  //Listeners del formulario
  listener();
  // Galeria de avatares
  initGallery();
  // Ajax Request con Promesas para los recibir los Alumnos y listarlos
  getAlumno("GET", alumnosApi, undefined);
}

/*
 * Inicializamos los listener de index.html
 */
function listener() {
  let selectorSexo = document.getElementById("selectorSexo");
  let selectorNombre = document.getElementById("selectorNombre");

  selectorSexo.addEventListener("change", filtrar);
  selectorNombre.addEventListener("keyup", filtrar);
}
function filtrar() {
  let selectorSexo = document.getElementById("selectorSexo");
  let inputNombre = document.getElementById("selectorNombre");
  const sexo = selectorSexo.value;
  const nombre = inputNombre.value.trim().toLowerCase();

  console.trace(`filtro sexo=${sexo} nombre=${nombre}`);
  console.debug("alumnos %o", alumnos);

  //creamos una copia para no modificar el original
  let alumnosFiltrados = alumnos.map(el => el);

  //filtrar por sexo, si es 't' todos no hace falta filtrar
  if (sexo == "h" || sexo == "m") {
    alumnosFiltrados = alumnosFiltrados.filter(el => el.sexo == sexo);
    console.debug("filtrado por sexo %o", alumnosFiltrados);
  }

  //filtrar por nombre buscado
  if (nombre != " ") {
    alumnosFiltrados = alumnosFiltrados.filter(el =>
      el.nombre.toLowerCase().includes(nombre)
    );
    console.debug("filtrado por nombre %o", alumnosFiltrados);
  }
  listarAlumnos(alumnosFiltrados);
}

function listarAlumnos(alumnos) {
    eList.innerHTML = ''; // vaciar html 
    alumnos.forEach(
      alumno =>
        (eList.innerHTML += `
        <div class="col-lg-4 col-sm-6 mb-5 px-5">
         <div class="row d-flex align-items-center">
          <div class="col-5 avatar w-100 white d-flex justify-content-center align-items-center">
           <img src="${alumno.avatar}"
        class="img-fluid rounded-circle z-depth-1" />
          </div>
         <div class="col-7">
           <h5 class="font-weight-bold pt-2">${alumno.nombre}</h5>
        
            <h6 class="font-weight-light py-0">
            ${
              alumno.sexo == "h"
                ? '<i class="fas fa-mars"></i><span> Hombre </span>'
                : '<i class="fas fa-venus"></i><span> Mujer </span>'
            } 
            </h6>

            <a class= "pr-2 pl-0"><i onclick= "eliminar(${
              alumno.id
            })" class= "fas fa-ban"></i></a>

            <a onclick="editar(${
              alumno.id
            })" class="pr-2 pl-0" data-toggle="modal" data-target="#formularioAlumno"><i class="fas fa-edit"> </i></a>

            <a onclick="verCursos(${
              alumno.id
            })" class="pr-2 pl-0" data-toggle="modal" data-target="#formularioCurso"><i class="fas fa-cart-plus"> </i></a>

            </div>
          </div>
        </div>
        `)
  );
} //listarAlumnos()

function editar(indice) {
  cursosTab = document.getElementById("hide-if-new");
  //Ocultamos la pestaña de los cursos

  /**
   * Si se ha seleccionado un alumno lo mostramos
   * Si no es que se ha pulsado el boton de Añadir Nuevo
   */
  if (indice >= 0) {
    // Pedimos los datos del alumno seleccionado
    alumnoSeleccionado = alumnos.find(alumno => alumno.id === indice);
    // Listamos los cursos del alumno
    listarCursos(alumnoSeleccionado);

  }

  console.debug("click editar alumno %o", alumnoSeleccionado);

  //rellernar formulario
  //document.getElementById("indice").value = indice;
  document.getElementById("inputId").value = alumnoSeleccionado.id;
  document.getElementById("inputNombre").value = alumnoSeleccionado.nombre;
  document.getElementById("inputAvatar").value = alumnoSeleccionado.avatar;

  //Genero del alumno
  let genero = alumnoSeleccionado.sexo;
  let checkHombre = document.getElementById("checkHombre");
  let checkMujer = document.getElementById("checkMujer");

  if (genero == "h") {
    checkHombre.checked = "checked";
    checkMujer.checked = "";
  } else {
    checkHombre.checked = "";
    checkMujer.checked = "checked";
  }
  //seleccionar Avatar
  const avatares = document.querySelectorAll("#avatarGallery img");
  avatares.forEach(el => {
    el.classList.remove("border-primary");
    if (alumnoSeleccionado.avatar == el.dataset.path) {
      el.classList.add("border-primary");
    }
  });
  

}

function guardar() {
  //TODO Añadir Avatar
  console.trace("click guardar");
  let id = document.getElementById("inputId").value;
  let nombre = document.getElementById("inputNombre").value;
  let avatar = document.getElementById("inputAvatar").value;

  let genero = document.getElementById("checkHombre").checked ? "h" : "m";

  let alumno = {
    id: id,
    nombre: nombre,
    avatar: avatar,
    sexo: genero
  };
  console.debug("persona a guardar %o", alumno);

  if (id == 0) {
    getAlumno("POST", alumnosApi, alumno);
  } else {
    // Editar registro
    const url = alumnosApi + alumno.id;
    getAlumno("PUT", url, alumno);
  }
}

function eliminar(indice) {
  // BUG No se puede eliminar si tiene cursos asociados (mostrar mensaje)
  let alumnoSeleccionado = alumnos.find(alumno => alumno.id === indice);
  console.debug("click eliminar alumno %o", alumnoSeleccionado);
  // TODO Cambiar Alert por un Modal
  const mensaje = `¿Estas seguro que quieres eliminar  a ${
    alumnoSeleccionado.nombre + " con id " + alumnoSeleccionado.id
  } ?`;

  if (confirm(mensaje)) {
    const url = alumnosApi + alumnoSeleccionado.id;
    console.debug("url a eliminar " + url);
    getAlumno("DELETE", url, undefined);
  }
}

function getAlumno(metodo, url, datos) {
  //BUG No funciona para todas las peticiones. Posible causante del error CORS cuando desarrollo en local. REAHACER POR COMPLETO
  //TODO Añadir mensajes de confirmación de las operaciones CRUD para el usuario
  ajax(metodo, url, datos)
    .then(data => {
      //pedimos de nuevo todos los alumnos para pasarselos al listado
      ajax("GET", alumnosApi, undefined)
        .then(data => {
          console.trace("promesa resolve");
          alumnos = data;
          listarAlumnos(alumnos);
        })
        .catch(error => {
          console.warn("promesa rejectada");
          alert(error.informacion);
        });
    })
    .catch(error => {
      console.warn("promesa rejectada");
      alert(error.informacion);
    });
}

/**
 * Carga todas las imagen de los avatares
 */
function initGallery() {
  let divGallery = document.getElementById("avatarGallery");
  for (let i = 1; i <= 10; i++) {
    divGallery.innerHTML += `<div id="avatar-item" class="m-2 view overlay rounded-circle" onclick="selectAvatar(event)">
                                <img width="90"  
                                class="border img-fluid rounded-circle" 
                                data-path="img/avatar${i}.png"
                                src="img/avatar${i}.png"
                                style="border-width: 3px !important;">
                              </div>
                              `;
  }
}

function selectAvatar(evento) {
  //console.trace("click avatar");
  const avatares = document.querySelectorAll("#avatarGallery img");
  //Recorremos todas las imagenes para eliminar la clase
  avatares.forEach(el => el.classList.remove("border-primary"));
  evento.target.classList.add("border-primary");
  //Tomamos el avatar de un input oculto
  let elAvatar = document.getElementById("inputAvatar");
  //@see: https://developer.mozilla.org/es/docs/Learn/HTML/como/Usando_atributos_de_datos
  elAvatar.value = evento.target.dataset.path;
}
function verCursos(indice) {
  if (indice >= 0) {
    // Pedimos los datos del alumno seleccionado
    alumnoSeleccionado = alumnos.find(alumno => alumno.id === indice);
  }
 console.trace("cargar cursos");
 //const url = endpoint + "cursos/?filtro=" + filtro;
 ajax("GET", cursosApi, undefined)
   .then(data => {
     cursos = data;
     // cargar cursos en clist
     let cList = document.getElementById("clist");
     cList.innerHTML = "";
     cursos.forEach(
       curso =>
         (cList.innerHTML += `
            <li class="list-group-item py-2" onclick="asignarCurso(event, ${alumnoSeleccionado.id},${curso.id})">
            <h3 class="w-50">${curso.nombre}<i class="fas fa-cart-plus w-50 text-right text-black-50"></i></h3>
            </li>
                            `)
     );
     cargarAlumnos();
   })
   .catch(error => alert("No se pueden cargar cursos" + error));
}
function listarCursos() {
  // pintar cursos del alumno
  acList.innerHTML = "";
    ajax("GET", cursosApi, undefined)
      .then(data => {
        cursos = data;
        // cargar cursos en lista
        acList.innerHTML = "";
        alumnoSeleccionado.cursos.forEach(curso => {
          acList.innerHTML += `
            <li class="list-group-item py-2" onclick="eliminarCurso(event, ${alumnoSeleccionado.id},${curso.id})">
            <h3 class="w-50">${curso.nombre}<i class="fas fa-trash w-50 text-right text-black-50"></i></h3>
            </li>
            `;
        });
        //seleccionar(alumnoSeleccionado.id);
      })
      .catch(error => alert("No se pueden cargar cursos" + error));
  

} //listarCursos()

function asignarCurso(event, idAlumno, idCurso) {
  console.info(" idAlumno " + idAlumno + " idCurso " + idCurso);
  
  const url = endpoint + "personas/" + idAlumno + "/curso/" + idCurso;
  
  ajax("POST", url, undefined)
    .then(data => {
      console.debug(data.informacion);
      //TODO Cambiar alert por ventana modal
      alert("Curso añadido con exito");
      cargarAlumnos();
    })
    .catch(error => alert(error.informacion));
} //asignarCurso

/**
 *
 * @param {*} idAlumno
 * @param {*} idCurso
 */
function eliminarCurso(event, idAlumno, idCurso) {
  console.debug(`click eliminarCurso idAlumno=${idAlumno} idCurso=${idCurso}`);
  //TODO pedir la confirmacion del usuario
  const url = endpoint + "personas/" + idAlumno + "/curso/" + idCurso;
  ajax("DELETE", url, undefined)
    .then(data => {
      //  event.target.parentElement.style.display = 'none';
      cursoParaEliminar = event.target.parentElement.parentNode;
      cursoParaEliminar.classList.add("animated", "slideOutRight", "fast");
      if (cursoParaEliminar.parentNode.hasChildNodes()) {
        // Si el ul tiene hijos elimina el li
        cursoParaEliminar.parentNode.removeChild(cursoParaEliminar);
      }
      cargarAlumnos();
    })
    .catch(error => alert(error));
} //eliminarCurso

function cargarAlumnos() {
  //TODO insertar la peticion en un metodo que funcione, de momento lo harcodeo
    console.trace("cargarAlumnos");
    const url = endpoint + "personas/";
    
    const promesa = ajax("GET", url, undefined);
      promesa
        .then(data => {
          console.trace("promesa resolve");
          personas = data;
          listarAlumnos(personas);
        })
        .catch(error => {
          console.warn("promesa rejectada");
          alert(error);
        });
  
}