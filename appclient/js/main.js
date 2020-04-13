const url = 'http://127.0.0.1:5500/personas.json';
const eList = document.getElementById('alist');

let alumnos = [];
window.addEventListener('load', init())

function init() {
  console.debug('Documennt loaded...')
  //Listeners del formulario
  listener();
  // Ajax Request con Promesas
  const con = ajax("GET", url, undefined);
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

function listarAlumnos(listarAlumnos) {
    eList.innerHTML = ''; // vaciar html 

    listarAlumnos.forEach(
      (alumno, index) =>
        (eList.innerHTML += `
        <div class="col-lg-4 col-sm-6 mb-5 px-5">
         <div class="row d-flex align-items-center">
          <div class="col-5 avatar w-100 white d-flex justify-content-center align-items-center">
           <img src = "https://randomuser.me/api/portraits/lego/${index}.jpg"
        class="img-fluid rounded-circle z-depth-1" />
          </div>
         <div class="col-7">
        <h6 class="font-weight-bold pt-2">${alumno.nombre}</h6>

        <a class= "pr-2 pl-0" > <i onclick= "eliminar(${index})"
        class= "fas fa-ban"></i></a>
        <a class= "pr-2 pl-0"> <i onclick = "editar(${index})"
        class="fas fa-edit"> </i></a >
        </div>
        </div>
        </div>
        `)
    );


}// listarAlumnos()

function eliminar(indice) {
  let alumnoSeleccionado = alumnos[indice];
  console.debug('click eliminar alumno %o', alumnoSeleccionado);
  const mensaje = `¿Estas seguro que quieres eliminar  a ${alumnoSeleccionado.nombre} ?`;
  if (confirm(mensaje)) {

    //TODO mirar como remover de una posicion
    //alumnos = alumnos.splice(indice,1);
    alumnos = alumnos.filter(el => el.id != alumnoSeleccionado.id)
    listarAlumnos(alumnos);
    //TODO llamada al servicio rest

  }

}
function editar(indice) {


}