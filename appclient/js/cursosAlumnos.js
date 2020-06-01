function listarCursosAlumno(alumnoSeleccionado){
  //let alumnoAeditar = alumnos.find((alumno) => alumno.id === alumnoSeleccionado.id);
  console.debug("AlumnoAeditar %o", alumnoSeleccionado);

  // pintar cursos del alumno
  let listaCursosAlumno = document.getElementById("aclist");
  listaCursosAlumno.innerHTML = "";
/**
   * Volvemos a pedir los datos de los alumnos para poder mantener la funcionalidad 
   * de Guardar y Cerrar
   * De esta forma podemos eliminar cursos de forma dinámica pero deshacer la edicion de los 
   * datos personales del alumno.
   */
  axios
    .get(alumnosApi)
    .then((response) => {
      personas = response.data;
      let persona = personas.find(
        (persona) => persona.id === alumnoSeleccionado.id
      );
      if (persona.cursos.length === 0) {
        listaCursosAlumno.innerHTML = `
            <p>No tienes ningun curso.</p>
            `;
      } else {
        persona.cursos.forEach((curso) => {
          listaCursosAlumno.innerHTML += `
            <li>
              Curso <strong>${curso.nombre}</strong> impartido por <strong>${curso.profesor==null ? "No tiene profesor asignado" : curso.profesor}</strong>
              <i class="fas fa-trash" onclick='eliminarCurso(${persona.id},${curso.id},event)'></i>
            </li>`;
        });
      }
    })
    .catch((error) => {
      console.error(error);
      let mensaje = error.response.data.informacion;
      alert(mensaje);
    }); //Fin de GET;
}

function listarCursos(indice) {
  //console.log("click en comprarCursos para: %o", alumnoSeleccionado);
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
                                <h2 class="font-weight-bold px-5">${curso.nombre}</h2>
                                </div>
                              <div class="col-md-4 text-center py-4 d-flex flex-row justify-content-around">
                                <div>
                                  <p class="h5 font-weight-light text-muted mb-0 mt-2">Precio</p>
                                  <p class="h1 font-weight-normal">${curso.precio}€</p>
                                </div>
                                <div>
                                  <a class="btn btn-success comprar-curso" href="#" role="button" onClick="asignarCurso( ${indice}, ${curso.id},event)">
                                    <i class="fas fa-cart-plus fa-5x deep-orange-lighter-hover" ></i>
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
   //let alumnoSeleccionado = alumnos.find((alumno) => alumno.id === personaId);
   //console.debug("curso asignado al alumno %o", alumnoSeleccionado);
   const url = alumnosApi + personaId + "/curso/" + cursoId;
   axios
     .post(url)
     .then((response) => {
       let mensaje = response.data.informacion;
       alert(mensaje);
      // event.target.parentElement.innerHTML = `
      //                             <a class="btn btn-info comprar-curso" href="#" role="button"
      //                             onClick="eliminarCurso( ${personaId}, ${cursoId}, event)">
      //                               <i class="fas fa-cart-plus fa-5x deep-orange-lighter-hover"></i>
      //                             </a>
      //   `;
      //event.stopPropagation();
      console.log("Target Node: " + event.target.nodeName);
      event.target.nodeName == "I"
        ? event.target.parentElement.classList.add("btn-info")
        : event.target.classList.add("btn-info");
      
      listarAlumnos();
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

