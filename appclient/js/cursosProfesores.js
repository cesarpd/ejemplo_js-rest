//BUG alumnoSeleccionado debe de actualizarse con un nueva consulta a la API. Asi se actualizaran los resultados
//BUG El boton cerrar debe refrescar los datos o puede generar un error

function listarCursosProfesor(personaSeleccionada) {
  //let alumnoAeditar = alumnos.find((alumno) => alumno.id === personaSeleccionada.id);
  console.debug("AlumnoAeditar %o", personaSeleccionada);

  // pintar cursos del alumno
  let listaCursosProfesor = document.getElementById("aclist");
  listaCursosProfesor.innerHTML = "";

  if (personaSeleccionada.cursos.length === 0) {
    listaCursosProfesor.innerHTML = `
      <p>No tienes ningun curso.</p>
      `;
  } else {
    //let alumnoAeditar = alumnos.find((alumno) => alumno.id === personaSeleccionada.id)
    personaSeleccionada.cursos.forEach((curso) => {
      listaCursosProfesor.innerHTML += `
        <li>
          ${curso.nombre}
          <i class="fas fa-trash" onclick='eliminarCurso(${personaSeleccionada.id},${curso.id},event)'></i>
        </li>`;
    });
  }
}

function listarCursos(indice) {
  //petición Get para cursos
  cList.innerHTML = "";
  axios
    .get(cursosApi)
    .then((response) => {
      console.log("respuesta del servidor: %o", response);
      console.log("cursos", response.data);
      cList.innerHTML = "";
      cursos = response.data;
      cursos.forEach((curso) => {
        cList.innerHTML += `
                      <div class="col-12 mb-4">
                        <div class="card z-depth-0 bordered border-light">
                          <div class="card-body p-0">
                            <div class="row mx-0">
                              <div class="col-md-8 grey lighten-4 rounded-left p-4 d-flex flex-row justify-content-start">
                                
                                <img src="img/cursos/undefined.jpg" class="img-fluid z-depth-1" width="90">
                                <h2 class="font-weight-bold px-5">${
                                  curso.nombre
                                }</h2>
                                </div>
                              <div class="col-md-4 text-center py-4 d-flex flex-row justify-content-around">
                                <div>
                                  <p class="h5 font-weight-light text-muted mb-0 mt-2">Precio</p>
                                  <p class="h1 font-weight-normal">${
                                    curso.precio
                                  }€</p>
                                </div>
                                <div>
                                  <a class="btn btn-success comprar-curso" href="#" role="button"
                                  onClick="asignarCurso( ${indice}, ${curso.id},event, '')">
                                    <i class="fas fa-cart-plus fa-5x deep-orange-lighter-hover"></i>
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div> 
        `;
      });
      
    }).catch((error) => {
      cList.innerHTML = `
        <h3>ERROR ${error.response.status}</h3
        <p>Se ha porducido un error al cargar los datos</p>
      `;
      console.error(error);
    }); 
}

function asignarCurso(personaId, cursoId, event) {

   const url = profesoresApi + personaId + "/curso/" + cursoId;
   axios
     .post(url)
     .then((response) => {
       let mensaje = response.data.informacion;
       alert(mensaje);
      event.target.parentElement.parentElement.innerHTML = `
                                  <a class="btn btn-info comprar-curso" href="#" role="button"
                                  onClick="eliminarCurso( ${personaId}, ${cursoId}, event)">
                                    <i class="fas fa-cart-plus fa-5x deep-orange-lighter-hover"></i>
                                  </a>
        `; 
      listarPersonas();
     })
     .catch((error) => {
       console.error(error)
       let mensaje = error.response.data.informacion;
       alert(mensaje);
    });
  
}

function eliminarCurso(alumnoId, cursoId, event) {
  //let alumnoSeleccionado = alumnos.find((alumno) => alumno.id === alumnoId);
  //console.debug("curso eliminado del alumno %o", alumnoSeleccionado);
  const url = alumnosApi + alumnoId + "/curso/" + cursoId;
  axios
    .delete(url)
    .then((response) => {
      let mensaje = response.data.informacion;
      alert(mensaje);
      //Pedimos los datos actualizados
      //TODO recibir el objeto directamente sin tener que buscarlo
      axios
        .get(alumnosApi)
        .then((response) => {
          let alumnos = response.data;
          let alumnoAeditar = alumnos.find((alumno) => alumno.id === alumnoId);
          listarCursosAlumno(alumnoAeditar);
        })
        .catch((error) => {
          console.error(error);
          let mensaje = error.response.data.informacion;
          alert(mensaje);
        });//Fin de GET
      })
    .catch((error) => {
      console.error(error);
      let mensaje = error.response.data.informacion;
      alert(mensaje);
    });// Fin de DELETE
}

