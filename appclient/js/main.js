// TODO Poner la llamada a AJAX en el metodo de listarAlumnos
const endpoint = "http://localhost:8080/com.apprest.ipartek.ejercicios/api/personas/";
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
}

/*
 * Inicializamos los listener de index.html 
 */
function listener() {
  let selectorSexo = document.getElementById('selectorSexo');
  let selectorNombre = document.getElementById('selectorNombre');

  selectorSexo.addEventListener('change', function () {
    eList.innerHTML = ''; // vaciar html 

    const sexo = selectorSexo.value;
    //console.debug('cambiado select ' + sexo);
    if ('t' != sexo) {
      const alumnosFiltrados = alumnos.filter(el => el.sexo == sexo);
      listarAlumnos(alumnosFiltrados);
    } else {
      listarAlumnos(alumnos);
    }
  });

  selectorNombre.addEventListener('keyup', function () {
    eList.innerHTML = ''; // vaciar html 
    const nombreBuscado = selectorNombre.value;
    //console.debug('tecla pulsada ' + nombre);
    if (nombreBuscado) {
      const alumnosFiltrados = alumnos.filter(el => el.nombre.toLowerCase().includes(nombreBuscado));
      listarAlumnos(alumnosFiltrados);
    } else {
      listarAlumnos(alumnos);
    }
  
  });

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
           <img src="https://randomuser.me/api/portraits/lego/${index}.jpg"
        class="img-fluid rounded-circle z-depth-1" />
          </div>
         <div class="col-7">
        <h5 class="font-weight-bold pt-2">${alumno.nombre}</h5>
        <h6 class="font-weight-light py-0">${alumno.sexo}</h6>

        <a class= "pr-2 pl-0"><i onclick= "eliminar(${index})" class= "fas fa-ban"></i></a>

        <a onclick="editar(${index})" class="pr-2 pl-0" data-toggle="modal" data-target="#fullHeightModalRight"><i class="fas fa-edit"> </i></a>
            </div>
          </div>
        </div>
        `)
    );

}// listarAlumnos()

function eliminar(indice) {
  let alumnoSeleccionado = alumnos[indice];
  console.debug('click eliminar alumno %o', alumnoSeleccionado);
  // TODO Cambiar Alert por un Modal 
  const mensaje = `¿Estas seguro que quieres eliminar  a ${alumnoSeleccionado.nombre} ?`;
  
  if (confirm(mensaje)) {
    const url = endpoint + alumnoSeleccionado.id;
    listarAlumnos(metodo, url, datos);

    // ajax('DELETE', url, undefined)
    //   .then(data => {
    //     //pedimos de nuevo todos los alumnos para pasarselos al listado
    //     ajax("GET", endpoint, undefined)
    //       .then(data => {
    //         console.trace('promesa resolve');
    //         alumnos = data;
    //         listarAlumnos(alumnos);

    //       }).catch(error => {
    //         console.warn('promesa rejectada');
    //         alert(error);
    //       });
    //   })
    //   .catch(error => {
    //     console.warn('promesa rejectada');
    //     alert(error);
    //   });

  }
}
function editar(indice) {
  // TODO Cambiar el contenedor por un Modal a pantalla completa
  // TODO Añadir Avatar

  let alumnoSeleccionado = alumnos[indice];
    console.debug('click editar alumno %o', alumnoSeleccionado);    

    //rellernar formulario
    document.getElementById("indice").value = indice;
    document.getElementById("inputId").value = alumnoSeleccionado.id;
    document.getElementById("inputNombre").value = alumnoSeleccionado.nombre;

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
}

function guardar() {
  //TODO Añadir Avatar
    console.trace("click guardar");
    let avatar = "avatar0.png";
    let id = document.getElementById("inputId").value;
    let nombre = document.getElementById("inputNombre").value;
    //let indice = document.getElementById("indice").value;
  
    let genero = 't';
  
    let alumno = {
      "id":id,
      "nombre": nombre,
      "avatar":avatar,
      "sexo": genero
    };

    const url = endpoint + personalbar.id;
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

function crear() {
  //TODO Añadir Avatar
  //TODO Limpiar valores del formulario al crear
    console.trace("click crear");
    let avatar = "avatar0.png";
    let id = document.getElementById("inputIdc").value;
    let nombre = document.getElementById("inputNombrec").value;
    let genero = document.getElementById("selectorGeneroc").value;
    
    let alumno = {
      "id":id,
      "nombre": nombre,
      "avatar":avatar,
      "sexo": genero
    };

    ajax('POST', endpoint, alumno)
      .then(data => {

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

      

}


