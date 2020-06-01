function listarAlumnos() {
  console.debug("Listar alumnos...")
  // reset para alumno
  let alumno = {
    id: 0,
    nombre: "sin nombre",
    avatar: "img/avatar1.png",
    sexo: "h",
  };
  document.getElementById("inputId").value = alumno.id;
  document.getElementById("inputNombre").value = alumno.nombre;
  document.getElementById("inputAvatar").value = alumno.avatar;
  document.getElementById("checkHombre").checked = "h";
  //petición get
  axios
    .get(alumnosApi)
    .then((response) => {
      console.info(response);
      aList.innerHTML = "";
      alumnos = response.data;
      //TODO asignacion temporal, alumno tiene que ser persona en todo el documento
      // Asignamos
      personas = alumnos;

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

            <a onclick="editarAlumno(${
              alumno.id
            })" class="pr-2 pl-0" data-toggle="modal" data-target="#formularioAlumno"><i class="fas fa-edit"> </i></a>

            <a onclick="listarCursos(${
              alumno.id
            })" class="pr-2 pl-0" data-toggle="modal" data-target="#comprarCursos"><i class="fas fa-cart-plus"> </i></a>

            </div>
          </div>
        </div>
     `;
      }); // Fin de innerHTML
    })
    .catch((error) => console.error(error));
}
function crearAlumno() {
  console.log("click en alumno para crear");
}

/**
 * initGallery()
 * Carga todas las imagen de los avatares
 * onclick="selectAvatar(event)
 * Define el avatar que se ha seleccionado pasando el evento al que se ha hecho click
 */
function initGallery() {
  let newDivGallery = document.getElementById("new-avatarGallery");
  let editDivGallery = document.getElementById("edit-avatarGallery");
  for (let i = 1; i <= 10; i++) {
    newDivGallery.innerHTML += `<div id="new-avatar-item" class="m-2 view overlay rounded-circle" onclick="selectAvatar(event)">
                                <img width="90"  
                                class="border img-fluid rounded-circle" 
                                data-path="img/avatar${i}.png"
                                src="img/avatar${i}.png"
                                style="border-width: 3px !important;">
                              </div>
                              `;
    editDivGallery.innerHTML += `<div id="edit-avatar-item" class="m-2 view overlay rounded-circle" onclick="selectAvatar(event)">
                                <img width="75"  
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
  const newAvatares = document.querySelectorAll("#new-avatarGallery img");
  const editAvatares = document.querySelectorAll("#edit-avatarGallery img");
  //Recorremos todas las imagenes para eliminar la clase
  newAvatares.forEach((el) => el.classList.remove("border-primary"));
  editAvatares.forEach((el) => el.classList.remove("border-primary"));
  evento.target.classList.add("border-primary");
  //Tomamos el avatar del input oculto
  //@see: https://developer.mozilla.org/es/docs/Learn/HTML/como/Usando_atributos_de_datos
  let elAvatar = document.getElementById("inputAvatar");
  elAvatar.value = evento.target.dataset.path;
  let editElAvatar = document.getElementById("edit-inputAvatar");
  editElAvatar.value = evento.target.dataset.path;
}

/**
 * guardarNuevoAlumno
 * Se ejecuta desde el moda #crearAlumno
 */
function guardarNuevoAlumno() {
  console.log("click guardar");
  // Valores de Añadir alumno nuevo
  let newId = document.getElementById("inputId").value;
  let newNombre = document.getElementById("inputNombre").value;
  let newAvatar = document.getElementById("inputAvatar").value;
  let newGenero = document.getElementById("checkHombre").checked ? "h" : "m";

  let alumno = {
    id: newId,
    nombre: newNombre,
    avatar: newAvatar,
    sexo: newGenero,
  };
  //Crear registro
  console.log("alumno a crear: %o", alumno);
  axios
    .post(alumnosApi, alumno)
    .then((response) => {
      console.info(response);
      listarAlumnos();
    })
    .catch((error) => {
      if (error.response.status == 409) {
        alert("No se permiten nombre duplicados");
      } else if (error.response.status == 400) {
        alert("Revise los datos");
      }
      console.info(error.message);
    });
}
/**
 * guardarNuevoAlumno
 * Se ejecuta desde el moda #formularioAlumno
 */
function guardarAlumno() {
  console.log("click guardar");

  // Valores de Editar Alumno existente
  let editId = document.getElementById("edit-inputId").value;
  let editNombre = document.getElementById("edit-inputNombre").value;
  let editAvatar = document.getElementById("edit-inputAvatar").value;
  let editGenero = document.getElementById("edit-checkHombre").checked
    ? "h"
    : "m";
  // Editar registro
  let alumno = {
    id: editId,
    nombre: editNombre,
    avatar: editAvatar,
    sexo: editGenero,
  };
  //console.log("alumno a editar: %o", alumno);
  const url = alumnosApi + alumno.id;
  // Peticion PUT
  axios
    .put(url, alumno)
    .then((response) => {
      console.info(response);
      listarAlumnos();
    })
    .catch((error) => {
      if (error.response.status == 409) {
        alert("No se permiten nombre duplicados");
      } else if (error.response.status == 400) {
        alert("Revise los datos");
      }
      console.info(error.message);
    });
}

function editarAlumno(indice) {
  // Pedimos los datos del alumno seleccionado
  let alumnoSeleccionado = alumnos.find((alumno) => alumno.id === indice);  
  console.log("el alumno es : %o", alumnoSeleccionado);
  listarCursosAlumno(alumnoSeleccionado);
  //rellernar formulario
  //document.getElementById("indice").value = indice;
  document.getElementById("edit-inputId").value = alumnoSeleccionado.id;
  document.getElementById("edit-inputNombre").value = alumnoSeleccionado.nombre;
  document.getElementById("edit-inputAvatar").value = alumnoSeleccionado.avatar;

  //Genero del alumno
  let genero = alumnoSeleccionado.sexo;
  let checkHombre = document.getElementById("edit-checkHombre");
  let checkMujer = document.getElementById("edit-checkMujer");

  if (genero == "h") {
    checkHombre.checked = "checked";
    checkMujer.checked = "";
  } else {
    checkHombre.checked = "";
    checkMujer.checked = "checked";
  }
  //seleccionar Avatar
  const avatares = document.querySelectorAll("#edit-avatarGallery img");
  avatares.forEach((el) => {
    el.classList.remove("border-primary");
    if (alumnoSeleccionado.avatar == el.dataset.path) {
      el.classList.add("border-primary");
    }
  });
}

function eliminar(indice) {
  // TODO No se puede eliminar si tiene cursos asociados (mostrar mensaje)
  let alumnoSeleccionado = alumnos.find((alumno) => alumno.id === indice);
  console.debug("click eliminar alumno %o", alumnoSeleccionado);
  // TODO Cambiar Alert por un Modal
  const mensaje = `¿Estas seguro que quieres eliminar  a ${
    alumnoSeleccionado.nombre + " con id " + alumnoSeleccionado.id
  } ?`;

  if (confirm(mensaje)) {
    const url = alumnosApi + alumnoSeleccionado.id;
    console.debug("url a eliminar " + url);
    axios
      .delete(url)
      .then((response) => {
        console.info(response);
        listarAlumnos();
      })
      .catch((error) => {
        if (error.response.status == 409) {
          alert(
            "No se puede eliminar, es posible que el alumno tenga cursos asignados"
          );
        } else if (error.response.status == 400) {
          alert("Revise los datos");
        }
        console.info(error.message);
      });
  }
}
/**
 * Actualiza la vista de personas con el valor recibido del filtro
 * @param {*} personas 
 */
function maquetarLista(personas) {
  // Vaciamos la lista
  console.debug(personas);
  aList.innerHTML = "";
  // Mensaje para el filtro sin resultado
  if (Object.keys(personas).length == 0) {
    aList.innerHTML = "No hay resultados que mostrar";
  }
  personas.forEach((persona) => {
    aList.innerHTML += `
      <div class="col-lg-4 col-sm-6 mb-5 px-5">
         <div class="row d-flex align-items-center">
          <div class="col-5 avatar w-100 white d-flex justify-content-center align-items-center">
           <img src="${
             persona.avatar
           }" class="img-fluid rounded-circle z-depth-1" />
          </div>
         <div class="col-7">
           <h3 class=" h5 font-weight-bold pt-2">${persona.nombre}</h3>
        
            <h6 class="font-weight-light py-0">
            ${
              persona.sexo == "h"
                ? '<i class="fas fa-mars"></i><span> Hombre </span>'
                : '<i class="fas fa-venus"></i><span> Mujer </span>'
            } 
            </h6>

            <a class= "pr-2 pl-0"><i onclick= "eliminar(${
              persona.id
            })" class= "fas fa-ban"></i></a>

            <a onclick="editarPersona(${
              persona.id
            })" class="pr-2 pl-0" data-toggle="modal" data-target="#formularioPersona"><i class="fas fa-edit"> </i></a>

            <a onclick="listarCursos(${
              persona.id
            })" class="pr-2 pl-0" data-toggle="modal" data-target="#comprarCursos"><i class="fas fa-plus"> </i></a>

            </div>
          </div>
        </div>
     `;
  }); // Fin de innerHTML
}