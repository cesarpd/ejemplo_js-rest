let peliculas = {
  "listado": [{
    "id": 1,
    "nombre": "El sexto sentido",
    "director": "M. Night Shyamalan",
    "clasificacion": "Drama"
  },
  {
    "id": 2,
    "nombre": "Pulp Fiction",
    "director": "Tarantino",
    "clasificacion": "Acción"
  },
  {
    "id": 3,
    "nombre": "Todo Sobre Mi Madre",
    "director": "Almodobar",
    "clasificacion": "Drama"
  }
  ]
};

let eList = document.getElementById('lista');

for (let i = 0; i < peliculas.listado.length; i++) {
  let listado = peliculas.listado[i];
  //console.log(`peliculas: ${listado.nombre}`);
  //Creamos los elementos html
  let id = document.createElement('li')
  let nombre = document.createElement('li')
  let director = document.createElement('li')
  let clasificacion = document.createElement('li')
  // asignamos los valores
  id.textContent = listado.id;
  nombre.textContent = listado.nombre;
  director.textContent = listado.director;
  clasificacion.textContent = listado.clasificacion;
  //añadimos el resultado al contenedor
  eList.appendChild(id)
  eList.appendChild(nombre)
  eList.appendChild(director)
  eList.appendChild(clasificacion)
  
}
