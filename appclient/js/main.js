window.addEventListener('load', init())

function init() {
  console.debug('Documennt loaded...')
  
  // Para el Ajax Request
  const url = 'https://randomuser.me/api/?results=9';
  const xhr = new XMLHttpRequest();
  listaAlumnos(url, xhr);
  //filtroAlumnos(url, xhr);

  document.getElementById('selectorSexo').onchange = function () {
    let value = this.value;
    //console.log('selected: ' + value );
    // Para el Ajax Request
    const url = 'https://randomuser.me/api/?results=9';
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
      if (value == "male" || value == "female" ) {
      const alumnoFiltrado = alumnos.filter( e => e.gender == value);
      alumnoFiltrado.forEach(alumno => {
        eList.innerHTML += `
        <div class="col-lg-4 col-sm-6 mb-5 px-5">
          <div class="row d-flex align-items-center">
            <div class="col-5 avatar w-100 white d-flex justify-content-center align-items-center">
              <img src="${alumno.picture.medium}"
              class="img-fluid rounded-circle z-depth-1" />
            </div>
            <div class="col-7">
              <h6 class="font-weight-bold pt-2">${alumno.name.first} ${alumno.name.last}</h6>
              <p class="text-muted">
              ${alumno.gender}
              </p>
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
      //console.debug(jsonRes);
      
      const alumnos = jsonRes.results;
      
      let eList = document.getElementById('alist');
      eList.innerHTML = '';
      
      for (let i = 0; i < alumnos.length; i++) {
        const a = alumnos[i];
        eList.innerHTML += `
        <div class="col-lg-4 col-sm-6 mb-5 px-5">
        <div class="row d-flex align-items-center">
        <div class="col-5 avatar w-100 white d-flex justify-content-center align-items-center">
        <img src="${a.picture.medium}"
        class="img-fluid rounded-circle z-depth-1" />
        </div>
        <div class="col-7">
        <h6 class="font-weight-bold pt-2">${a.name.first} ${a.name.last}</h6>
        <p class="text-muted">
        ${a.gender}
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