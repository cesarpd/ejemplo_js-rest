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
  // Creamos un ul por cada objeto contenido en listado
  let ulPelis = document.createElement('ul');
  eList.appendChild(ulPelis);
  // Añadimos las propiedades del objeto en una lista
  //console.log(Object.keys(peliculas.listado[i]));
  
  for (let n = 0; n < Object.keys(peliculas.listado[i]).length; n++) {
    //console.log(Object.keys(peliculas.listado[i]));
    
    let miPeli = {listado};

    let liPeli = document.createElement('li');
    // let liPeliId = document.createElement('li');
    // let liPeliNombre = document.createElement('li');
    // let liPeliDirector = document.createElement('li');
    // let liPeliClasificacion = document.createElement('li');
    
    // liPeliId.textContent = listado.id;
    // liPeliNombre.textContent = listado.nombre;
    // liPeliDirector.textContent = listado.director;
     liPeli.textContent = miPeli.id;
    console.log(miPeli[0]);
    
    ulPelis.appendChild(liPeli);
    // ulPelis.appendChild(liPeliId);
    // ulPelis.appendChild(liPeliNombre);
    // ulPelis.appendChild(liPeliDirector);
    // ulPelis.appendChild(liPeliClasificacion);
    
  }
}
