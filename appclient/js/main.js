window.addEventListener('load', init())

function init() {
  console.debug('Documennt loaded...')
  const alumnos = [
    {
      "id": 1,
      "nombre": "Oconor",
      "avatar": "https://i.pravatar.cc/200?u=iptk0001",
      "sexo": "Hombre"
    },
    {
      "id": 2,
      "nombre": "Pepa",
      "avatar": "https://i.pravatar.cc/200?u=iptk0002",
      "sexo": "Mujer"
    },
    {
      "id": 3,
      "nombre": "Jose Mari",
      "avatar": "https://i.pravatar.cc/200?u=iptk0003",
      "sexo": "Otro"
    },    
    {
      "id": 4,
      "nombre": "Luis",
      "avatar": "https://i.pravatar.cc/200?u=iptk0004",
      "sexo": "Mujer"
    },
    {
      "id": 5,
      "nombre": "Ramona",
      "avatar": "https://i.pravatar.cc/200?u=iptk0005",
      "sexo": "Mujer"
    },
    {
      "id": 6,
      "nombre": "Maritere",
      "avatar": "https://i.pravatar.cc/200?u=iptk0006",
      "sexo": "Hombre"
    }    
]

// seleccionar la lista por id
let eList = document.getElementById('alist');
let eLoad = document.querySelector('#alist p');
eLoad.style.display='none';

for (let i = 0; i < alumnos.length; i++) {
  const a = alumnos[i];
  eList.innerHTML += `
   <div class="col-lg-4 col-sm-6 mb-5 px-5">
          <div class="row d-flex align-items-center">
            <div class="col-5 avatar w-100 white d-flex justify-content-center align-items-center">
              <img src="${a.avatar}"
                class="img-fluid rounded-circle z-depth-1" />
            </div>
            <div class="col-7">
              <h6 class="font-weight-bold pt-2">${a.nombre}</h6>
              <p class="text-muted">
                Sexo: ${a.sexo}
              </p>
            </div>
          </div>
        </div>
    `;

  
}

}
