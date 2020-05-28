/**
 * Inicializacion de
 * Variables Globales 
 */

const endpoint = "http://localhost:8080/apprest/api/";
const alumnosApi = endpoint + "personas/";
const cursosApi = endpoint + "cursos/";

const aList = document.getElementById("alist");
const cList = document.getElementById("clist");
const acList = document.getElementById("aclist");

let alumnos = [];
let cursos = [];

/**
 * Inicialización de la App
 */
window.addEventListener("load", init());

function init() {
  console.debug("Document loaded...");
  listarAlumnos();
  initGallery();
}