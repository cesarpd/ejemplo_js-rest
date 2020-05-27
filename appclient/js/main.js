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
  const url = alumnosApi;

  axios.get(url).then(function (personas) {
    console.info(personas);
    aList.innerHTML = "";
    alumnos = personas.data;

    alumnos.forEach(alumno => 
    {
     aList.innerHTML += `
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
     `; 
    });

    // for (let i = 0; i < alumnos.length; i++) {
    //   let alumno = alumnos[i];
    //   aList.innerHTML += ` <div class="d-flex flex-column">
    //             <p class="pt-1 pb-4"><strong>${alumno.nombre}</strong>
    //             ${alumno.id}</p>
    //         </div>`;
    // }
  });
}
