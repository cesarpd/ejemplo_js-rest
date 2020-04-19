// TODO Poner la llamada a AJAX en el metodo de listarAlumnos
//const endpoint = "http://localhost:8080/com.apprest.ipartek.ejercicios/api/personas/";
const endpoint = "http://192.168.0.35:8080/com.apprest.ipartek.ejercicios/api/personas/";
const eList = document.getElementById('alist');

let alumnos = [];

window.addEventListener('load', init())

function init() {
  console.debug('Documennt loaded...')
  //Listeners del formulario
  listener();
  
  // Ajax Request con Promesas
  const con = ajax("GET", endpoint, undefined);
  con.then (data => {
    //console.debug('Peticion aceptada')
    alumnos = data;
    listarAlumnos(alumnos);
  }).catch(error => {
    console.log('error al acceder a los datos')
  })
  
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
//TODO Usar avatar de la base de datos
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

}// listarAlumnos()


function editar(indice) {
  
  let alumnoSeleccionado = {
    id: 0,
    nombre: "sin nombre",
    avatar: "img/avatar1.png",
    sexo: "h"
  };

  if (indice >= 0) {
    alumnoSeleccionado = alumnos[indice];
  }
    console.debug('click editar alumno %o', alumnoSeleccionado);    

    //rellernar formulario
    document.getElementById("indice").value = indice;
    document.getElementById("inputId").value = alumnoSeleccionado.id;
    document.getElementById("inputNombre").value = alumnoSeleccionado.nombre;
    document.getElementById("inputAvatar").value = alumnoSeleccionado.avatar;

    //Genero del alumno
    let genero = alumnoSeleccionado.sexo;
    let checkHombre = document.getElementById('checkHombre');
    let checkMujer = document.getElementById('checkMujer');

    if (genero == "h") {
      checkHombre.checked = 'checked';
      checkMujer.checked = '';
  
    } else {
      checkHombre.checked = '';
      checkMujer.checked = 'checked';
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
    // Crear registro
    ajax('POST', endpoint, alumno)
      .then(data => {
        //TODO Cambiar alerta por un modal
        alert("Añadido alumno " + alumno.nombre);
        // conseguir de nuevo todos los alumnos
        ajax("GET", endpoint, undefined)
          .then(data => {
            console.trace('promesa resolve');
            alumnos = data;
            listarAlumnos(alumnos);

          }).catch(error => {
            console.warn('promesa rejectada');
            alert(error);
          });

      })
      .catch(error => {
        console.warn('promesa rejectada');
        alert(error);
      });
  } else {
    // Editar registro
    const url = endpoint + alumno.id;
    ajax('PUT', url, alumno)
      .then(data => {
        //Pedimos de nuevo los alumnos
        ajax('GET', endpoint, undefined)
          .then(data => {
            alumnos = data;
            listarAlumnos(alumnos);
          
          }).catch(error =>{
            alert(error);
          })
        //Fin de la peticion del objeto
      }).catch(error => {
        alert(error);
      });//Fin del PUT
  }
}

// function crear() {
// }

function eliminar(indice) {
  let alumnoSeleccionado = alumnos[indice];
  console.debug("click eliminar alumno %o", alumnoSeleccionado);
  // TODO Cambiar Alert por un Modal
  const mensaje = `¿Estas seguro que quieres eliminar  a ${alumnoSeleccionado.nombre} ?`;

  if (confirm(mensaje)) {
    const url = endpoint + alumnoSeleccionado.id;
    ajax("DELETE", url, undefined)
      .then(data => {
        //pedimos de nuevo todos los alumnos para pasarselos al listado
        ajax("GET", endpoint, undefined)
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

