/**
 * Inicializacion de
 * Variables Globales 
 */


const endpoint = "http://localhost:8080/apprest/api/";
const alumnosApi = endpoint + "personas/";
const cursosApi = endpoint + "cursos/";

const aList = document.getElementById("alist");
const cList = document.getElementById("clist");

window.addEventListener("load", init());

function init() {
  console.debug("Documennt loaded...");
  listarAlumnos();
}
function listarAlumnos() {

  axios.get(alumnosApi).then( response => {
    console.info(response);

    aList.innerHTML = "";
    alumnos = response.data;
    alumnos.forEach((alumno) => {
      aList.innerHTML += `
      <div class="col-lg-4 col-sm-6 mb-5 px-5">
         <div class="row d-flex align-items-center">
          <div class="col-5 avatar w-100 white d-flex justify-content-center align-items-center">
           <img src="${
             alumno.avatar
           }" class="img-fluid rounded-circle z-depth-1" />
          </div>
         <div class="col-7">
           <h3 class=" h5 font-weight-bold pt-2">${alumno.nombre}</h3>
        
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
     `;
    }); // Fin de innerHTML
  }).catch(error => console.error(error));
}
function crearAlumno() {
  initGallery();
  console.log('click en alumno para crear')
}

/**
 * initGallery()
 * Carga todas las imagen de los avatares
 * onclick="selectAvatar(event)
 * Define el avatar que se ha seleccionado pasando el evento al que se ha hecho click
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
  avatares.forEach((el) => el.classList.remove("border-primary"));
  evento.target.classList.add("border-primary");
  //Tomamos el avatar del input oculto
  let elAvatar = document.getElementById("inputAvatar");
  //@see: https://developer.mozilla.org/es/docs/Learn/HTML/como/Usando_atributos_de_datos
  elAvatar.value = evento.target.dataset.path;
}

/**
 * guardarAlumno
 */

function guardarAlumno() {
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

  if (id == 0) {
    //Crear registro
    console.log("alumno a crear: %o", alumno);
    axios.post(alumnosApi, alumno).then(response =>{
      if (response.status == 200 || response.status == 201) {
        console.info(response);
        listarAlumnos();
      } else {
        console.error("ERROR: conflictos: " + response.informacion);
        
      }
    });

  } else {
    // Editar registro
    console.log("alumno a editar: %o", alumno);
    const url = alumnosApi + alumno.id;
  }

  
}