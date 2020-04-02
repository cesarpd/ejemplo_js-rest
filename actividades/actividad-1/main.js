let campoTexto = document.getElementById('texto')
let campoParra = document.getElementById('parrafo')
let eboton = document.getElementById('boton')


eboton.addEventListener('click', function mostrarNombre(e) {
  if (campoTexto.value === "" || campoTexto.value.lenght == 0) {
    alert("El campo esta vacio")
  } else {
    campoParra.innerHTML += `El texto de arriba es ${campoTexto.value}`;  }; 
})