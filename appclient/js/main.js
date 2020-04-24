//TODO Documentar el proyecto
//BUG Limpiar registro de Alumno y Selector de Cursos al Añadir Nuevo
/**
 * Inicializacion de
 * Variables Globales
 */
const endpoint = "http://192.168.0.33:8080/com.apprest.ipartek.ejercicios/api/";
const alumnosApi = endpoint + "personas/";
const cursosApi = endpoint + "cursos/";

<<<<<<< HEAD
const aList = document.getElementById("alist");
const cList = document.getElementById("clist");
const acList = document.getElementById("aclist");
=======
const eList = document.getElementById('alist');
const cList = document.getElementById('clist');
>>>>>>> parent of dd30671... mejoras asignación de cursos con bugs

let alumnos = [];
let cursos = [];

let alumnoSeleccionado = {
<<<<<<< HEAD
  id: 0,
  nombre: "sin nombre",
  avatar: "img/avatar1.png",
  sexo: "h",
  cursos: []
};
=======
    id: 0,
    nombre: "sin nombre",
    avatar: "img/avatar1.png",
    sexo: "h"
  };
>>>>>>> parent of dd30671... mejoras asignación de cursos con bugs

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
<<<<<<< HEAD
  aList.innerHTML = ""; // vaciar html
  alumnos.forEach(
    alumno =>
      (aList.innerHTML += `
=======
    eList.innerHTML = ''; // vaciar html 
    alumnos.forEach(
      alumno =>
        (eList.innerHTML += `
>>>>>>> parent of dd30671... mejoras asignación de cursos con bugs
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

            </div>
          </div>
        </div>
        `)
  );
} //listarAlumnos()

function editar(indice) {
  cursosTab = document.getElementById("hide-if-new");
  //Ocultamos la pestaña de los cursos
  cursosTab.classList.add("d-none");

  /**
   * Si se ha seleccionado un alumno lo mostramos
   * Si no es que se ha pulsado el boton de Añadir Nuevo
   */
  if (indice >= 0) {
    // Mostramos la pestaña de los cursos
    listarCursos();
    cursosTab.classList.add("d-block");
    // Pedimos los datos del alumno seleccionado
    alumnoSeleccionado = alumnos.find(alumno => alumno.id === indice);
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
  // pintar cursos del alumno
  let listaCursosAlumno = document.getElementById("aclist");
  listaCursosAlumno.innerHTML = "";
<<<<<<< HEAD
  alumnoSeleccionado.cursos.forEach(curso => {
    console.info(curso);
=======
  alumnoSeleccionado.cursos.forEach(el => {
>>>>>>> parent of dd30671... mejoras asignación de cursos con bugs
    listaCursosAlumno.innerHTML += `
        <li>
          ${el.nombre}
          <i class="fas fa-trash" onclick="eliminarCurso(event, ${alumnoSeleccionado.id},${el.id})"></i>
        </li>`;
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
          alert(error);
        });
    })
    .catch(error => {
      console.warn("promesa rejectada");
      alert(error);
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

function listarCursos() {
  ajax("GET", cursosApi, undefined)
    .then(data => {
      cursos = data;
      // cargar cursos en lista
      cList.innerHTML = "";
      cursos.forEach(
        curso =>
          (cList.innerHTML += `   
                      <div class="col-12 mb-4">
                        <div class="card z-depth-0 bordered border-light">
                          <div class="card-body p-0">
                            <div class="row mx-0">
                              <div class="col-md-8 grey lighten-4 rounded-left p-4 d-flex flex-row justify-content-start">
                                
                                <img src="img/cursos/undefined.jpg" class="img-fluid z-depth-1" width="90">
                                <h2 class="font-weight-bold px-5">${curso.nombre}</h2>
                                </div>
                              <div class="col-md-4 text-center py-4 d-flex flex-row justify-content-around">
                                <div>
                                  <p class="h5 font-weight-light text-muted mb-0 mt-2">Precio</p>
                                  <p class="h1 font-weight-normal">${curso.precio}€</p>
                                </div>
                                <div>
                                  <a class="btn btn-success comprar-curso" href="#" role="button"
                                  onClick="asignarCurso( 0, ${curso.id})">
                                    <i class="fas fa-cart-plus fa-5x deep-orange-lighter-hover"></i>
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>      
            `)
      );
      console.log("el ide del alumno es " + alumnoSeleccionado.id);
    })
    .catch(error => alert("No se pueden cargar cursos" + error));
} //listarCursos()

function asignarCurso(idAlumno = 0, idCurso) {
  idAlumno = idAlumno != 0 ? idAlumno : alumnoSeleccionado.id;

  console.debug(`click asignarCurso idAlumno=${idAlumno} idCurso=${idCurso}`);

  const url = endpoint + "personas/" + idAlumno + "/curso/" + idCurso;
  ajax("POST", url, undefined)
    .then(data => {
      //TODO Cambiar alert por un modal GLOBAL
<<<<<<< HEAD
      alert(data.informacion);
      const curso = data.data;
      document.getElementById("profile-tab").classList.remove("active");
      document.getElementById("home-tab").classList.add("active");
      acList.innerHTML += `<li class="animated bounceIn">  
                                ${curso.nombre}
                                <i class="fas fa-trash" onclick="eliminarCurso(event, ${idCurso},${curso.id})"></i>    
                            </li>`;
      //BUG necesitamos refrescar al alumno al insertar nuevo curso
      //editar(idAlumno);
=======
        alert(data.informacion);
>>>>>>> parent of dd30671... mejoras asignación de cursos con bugs
    })
    .catch(error => alert(error));
} //asignarCurso

/**
 *
 * @param {*} idAlumno
 * @param {*} idCurso
 */
function eliminarCurso(event, idAlumno, idCurso) {
<<<<<<< HEAD
  //BUG necesitamos refrescar al alumno antes de borra un curso
  console.debug(`click eliminarCurso idAlumno=${idAlumno} idCurso=${idCurso}`);
=======
  //BUG Hacer que se refresque la info del alumno
  console.debug(
    `click eliminarCurso idAlumno=${idAlumno} idCurso=${idCurso}`
  );
>>>>>>> parent of dd30671... mejoras asignación de cursos con bugs

  const url = endpoint + "personas/" + idAlumno + "/curso/" + idCurso;
  ajax("DELETE", url, undefined)
    .then(data => {
      alert("Curso Eliminado");

<<<<<<< HEAD
      event.target.parentElement.style.display = "none";
      event.target.parentElement.classList.add("animated", "bounceOut");
      //editar(idAlumno);
=======
      //  event.target.parentElement.style.display = 'none';
      // event.target.parentElement.classList.add("animated", "bounceOut");
        editar(idAlumno);
>>>>>>> parent of dd30671... mejoras asignación de cursos con bugs
    })
    .catch(error => alert(error));
} //eliminarCurso
