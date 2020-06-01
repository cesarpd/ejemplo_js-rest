/**
 * Inicializacion de
 * Variables Globales 
 */

const endpoint = "http://localhost:8080/apprest/api/";
const profesoresApi = endpoint + "personas/profesores/";
const cursosApi = endpoint + "cursos/";

const aList = document.getElementById("alist");
const cList = document.getElementById("clist");
const acList = document.getElementById("aclist");

//const errorTab = document.getElementById("error-tab");
//const errorText = document.getElementById("error-text");

let alumnos = [];
let cursos = [];

/**
 * Inicialización de la App
 */
window.addEventListener("load", init());

function init() {
  console.debug("Document loaded...");
  listener();
  listarPersonas();
  initGallery();

}