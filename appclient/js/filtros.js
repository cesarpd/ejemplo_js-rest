/**
 * Inicializamos los listener de index.hml
 * selector de sexo y busqueda por nombre
 * @see function filtro
 */
let selectorSexo = document.getElementById("selectorSexo");
let inputNombre = document.getElementById("selectorNombre");
//Reset para los valores de formulario
selectorSexo.value = "t";
inputNombre.value = "";

function listener() {
  selectorSexo.addEventListener("change", filtro);
  inputNombre.addEventListener("keyup", filtro);  
} // listener

/**
 * Filtra las personas cuando se buscan por sexo y nombre
 */
function filtro() {

  const sexo = selectorSexo.value;
  const nombre = inputNombre.value.trim().toLowerCase();

  //console.trace(`filtro sexo=${sexo} nombre=${nombre}`);
  console.debug("personas %o", personas);

  //creamos una copia para no modificar el original
  let personasFiltradas = personas.map((el) => el);

  //filtrar por sexo, si es 't' todos no hace falta filtrar
  if (sexo == "h" || sexo == "m") {
    personasFiltradas = personasFiltradas.filter((el) => el.sexo == sexo);
    //console.debug("filtrado por sexo %o", personasFiltradas);
  }

  //filtrar por nombre buscado
  if (nombre != " ") {
    personasFiltradas = personasFiltradas.filter((el) =>
      el.nombre.toLowerCase().includes(nombre)
    );
    //console.debug("filtrado por nombre %o", personasFiltradas);
  }

  maquetarLista(personasFiltradas);

  selectorSexo.value = "t";
  inputNombre.value = "";
} // filtro
