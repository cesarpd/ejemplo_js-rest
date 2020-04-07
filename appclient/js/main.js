window.addEventListener('load', init())

function init() {
  console.debug('Documennt loaded...')
  
  // Para el Ajax Request
  const url = 'http://localhost:8080/AlumnosRestService/api/personas/';
  const xhr = new XMLHttpRequest();
  listaAlumnos(url, xhr);
  //filtroAlumnos(url, xhr);

  document.getElementById('selectorSexo').onchange = function () {
    let value = this.value;
    //console.log('selected: ' + value );
    // Para el Ajax Request
    const url = 'http://localhost:8080/AlumnosRestService/api/personas/';
    const xhr = new XMLHttpRequest();
  // Metodo asincrono en donde se aloja todo el código
  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      //console.info('GET ' + url);

      const jsonRes = JSON.parse(this.responseText);
      //console.debug(jsonRes);

      const alumnos = jsonRes.results;

      let eList = document.getElementById('alist');
      eList.innerHTML = '';
      if (value == "m" || value == "h" ) {
      const alumnoFiltrado = alumnos.filter( e => e.gender == value);
      alumnoFiltrado.forEach(alumno => {
        eList.innerHTML += `
        <div class="col-lg-4 col-sm-6 mb-5 px-5">
          <div class="row d-flex align-items-center">
            <div class="col-5 avatar w-100 white d-flex justify-content-center align-items-center">
              < img src = "https://randomuser.me/api/portraits/lego/${a.id}.jpg"
              class="img-fluid rounded-circle z-depth-1" />
            </div>
            <div class="col-7">
              <h6 class="font-weight-bold pt-2">${alumno.nombre} </h6>
            </div>
          </div>
        </div>
        `;
      
        });
      } else {
        listaAlumnos(url, xhr);
      }
    }
  }
  //Peticion GET

  xhr.open('GET', url, true);
  xhr.send();



  }
  
}


function listaAlumnos(url, xhr) {
  
  // Metodo asincrono en donde se aloja todo el código
  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.info('GET ' + url);
      
      const jsonRes = JSON.parse(this.responseText);
      console.debug(jsonRes);
      
      const alumnos = jsonRes;
      
      let eList = document.getElementById('alist');
      eList.innerHTML = '';
      
      for (let i = 0; i < alumnos.length; i++) {
        const a = alumnos[i];
        eList.innerHTML += `
        <div class="col-lg-4 col-sm-6 mb-5 px-5">
        <div class="row d-flex align-items-center">
        <div class="col-5 avatar w-100 white d-flex justify-content-center align-items-center">
        <img src = "https://randomuser.me/api/portraits/lego/${a.id}.jpg"
        class="img-fluid rounded-circle z-depth-1" />
        </div>
        <div class="col-7">
        <h6 class="font-weight-bold pt-2">${a.nombre}</h6>
        <p class="text-muted">
        ${a.sexo}
        </p>
        </div>
        </div>
        </div>
        `;
        
        
      }
    }
  }
  //Peticion GET
  
  xhr.open('GET', url, true);
  xhr.send();
}// listaAlumnos()