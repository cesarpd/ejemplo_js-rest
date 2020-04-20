const alumnosApi = "http://192.168.0.35:8080/com.apprest.ipartek.ejercicios/api/personas/";
const cursosApi = "http://192.168.0.35:8080/com.apprest.ipartek.ejercicios/api/cursos/";
 

const eList = document.getElementById('alist');
const cList = document.getElementById('clist');

let alumnos = [];
let cursos = [];

window.addEventListener('load', init())

function init() {
  console.debug('Documennt loaded...')
  //Listeners del formulario
  listener();
  
  // Ajax Request con Promesas
  getAlumno('GET', alumnosApi, undefined);
  getCurso('GET', cursosApi, undefined);
  
  initGallery();
}

/*
 * Inicializamos los listener de index.html 
 */
function listener() {
  let selectorSexo = document.getElementById('selectorSexo');
  let selectorNombre = document.getElementById('selectorNombre');

  selectorSexo.addEventListener('change', filtrar);
  selectorNombre.addEventListener('keyup', filtrar);
}
function filtrar(){
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
      (alumno, index) =>
        (eList.innerHTML += `
        <div class="col-lg-4 col-sm-6 mb-5 px-5">
         <div class="row d-flex align-items-center">
          <div class="col-5 avatar w-100 white d-flex justify-content-center align-items-center">
           <img src="${alumno.avatar}"
        class="img-fluid rounded-circle z-depth-1" />
          </div>
         <div class="col-7">
        <h5 class="font-weight-bold pt-2">${alumno.nombre}</h5>
        <h6 class="font-weight-light py-0">${alumno.sexo}</h6>

        <a class= "pr-2 pl-0"><i onclick= "eliminar(${index})" class= "fas fa-ban"></i></a>

        <a onclick="editar(${index})" class="pr-2 pl-0" data-toggle="modal" data-target="#formularioAlumno"><i class="fas fa-edit"> </i></a>
            </div>
          </div>
        </div>
        `)
    );

}//listarAlumnos()
function listarCursos(cursos) {
  cList.innerHTML = ""; // vaciar html
  cursos.forEach(
    (curso, index) =>
      (cList.innerHTML += `   
                <div class="col-12 mb-4">
                  <div class="card z-depth-0 bordered border-light">
                    <div class="card-body p-0">
                      <div class="row mx-0">
                        <div class="col-md-8 grey lighten-4 rounded-left pt-4">
                          <p class="font-weight-light text-muted mb-4">${curso.id}</p>
                          <h5 class="font-weight-bold">${curso.nombre}</h5>
                        </div>
                        <div class="col-md-4 text-center pt-4">
                          <p class="h1 font-weight-normal">${curso.precio}€</p>
                          <p class="h5 font-weight-light text-muted mb-4">Precio</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>      
      `)
  );
}//listarCursos()


function editar(indice) {
  cursosTab = document.getElementById("hide-if-new");
  //Ocultamos la pestaña de los cursos
  cursosTab.classList.add("d-none");
  let alumnoSeleccionado = {
    id: 0,
    nombre: "sin nombre",
    avatar: "img/avatar1.png",
    sexo: "h"
  };

  if (indice >= 0) {
    // Mostramos la pestaña de los cursos
    cursosTab.classList.add("d-block");
    alumnoSeleccionado = alumnos[indice];
  }
  console.debug("click editar alumno %o", alumnoSeleccionado);

  //rellernar formulario
  document.getElementById("indice").value = indice;
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
  
  let genero = document.getElementById("checkHombre").checked ? "h":"m";
  
    let alumno = {
      id:id,
      nombre: nombre,
      avatar:avatar,
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
  let alumnoSeleccionado = alumnos[indice];
  console.debug("click eliminar alumno %o", alumnoSeleccionado);
  // TODO Cambiar Alert por un Modal
  const mensaje = `¿Estas seguro que quieres eliminar  a ${alumnoSeleccionado.nombre} ?`;

  if (confirm(mensaje)) {
    const url = alumnosApi + alumnoSeleccionado.id;
    getAlumno('DELETE', url, undefined)
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
function getCurso(metodo, url, datos) {
  //TODO Añadir mensajes de confirmación de las operaciones CRUD para el usuario
      ajax(metodo, url, datos)
      .then(data => {
        //pedimos de nuevo todos los cursos para pasarselos al listado
        ajax("GET", cursosApi, undefined)
          .then(data => {
            console.trace("promesa resolve");
            cursos = data;
            listarCursos(cursos);
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

