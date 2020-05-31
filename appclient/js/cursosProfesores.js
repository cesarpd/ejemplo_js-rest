
//BUG El boton cerrar debe refrescar los datos o puede generar un error

function listarCursosProfesor(personaSeleccionada) {
  //let alumnoAeditar = alumnos.find((alumno) => alumno.id === personaSeleccionada.id);
  console.debug("Persona a editar %o", personaSeleccionada);
  console.log(personaSeleccionada.cursos.length);

  // pintar cursos del alumno
  let listaCursosProfesor = document.getElementById("aclist");
  listaCursosProfesor.innerHTML = "";
  /**
   * Volvemos a pedir los datos de los profesores para poder mantener la funcionalidad 
   * de Guardar y Cerrar
   * De esta forma podemos eliminar cursos de forma dinámica pero deshacer la edicion de los 
   * datos personales del profesor.
   */
  axios
    .get(profesoresApi)
    .then((response) => {
      personas = response.data;
      let persona = personas.find(
        (persona) => persona.id === personaSeleccionada.id
      );
      if (persona.cursos.length === 0) {
        listaCursosProfesor.innerHTML = `
            <p>No tienes ningun curso.</p>
            `;
      } else {
        persona.cursos.forEach((curso) => {
          listaCursosProfesor.innerHTML += `
            <li>
              ${curso.nombre}
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
       //BUG Al usar el evento añadimos el codigo html tambien en el listado de los cursos del profesor listarCursosProfesor(). Aunque no se sobreescriba de inmediato no es bonito
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

function eliminarCurso(personaId, cursoId, event) {
  //let personaSeleccionado = personas.find((persona) => persona.id === personaId);
  //console.debug("curso eliminado del persona %o", personaSeleccionado);
  const url = profesoresApi + personaId + "/curso/" + cursoId;
  axios
    .delete(url)
    .then((response) => {
      let mensaje = response.data.informacion;
      alert(mensaje);
      // Cambio visual para mostrar que se ha seleccionado
      event.target.parentElement.parentElement.innerHTML = `
                                  <a class="btn btn-success comprar-curso" href="#" role="button"
                                  >
                                    <i class="fas fa-cart-plus fa-5x deep-orange-lighter-hover"></i>
                                  </a>
        `; 
      //Pedimos los datos actualizados
      //TODO recibir el objeto directamente sin tener que buscarlo
      axios
        .get(profesoresApi)
        .then((response) => {
          let personas = response.data;
          let personaAeditar = personas.find((persona) => persona.id === personaId);
          listarCursosProfesor(personaAeditar);
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

