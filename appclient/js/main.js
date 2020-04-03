window.addEventListener('load', init())

function init() {
  console.debug('Documennt loaded...')
  const url = 'https://randomuser.me/api/?results=9';

  // Ajax Request
  let xhr = new XMLHttpRequest();
  // Metodo asincrono en donde se aloja todo el código
  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.info('GET ' + url);
      
      const jsonRes = JSON.parse(this.responseText);    
      console.debug(jsonRes);

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

// seleccionar la lista por id
// let eLoad = document.querySelector('#alist p');
// eLoad.style.display='none';

// for (let i = 0; i < alumnos.length; i++) {
//   const a = alumnos[i];
//   eList.innerHTML += `
//    <div class="col-lg-4 col-sm-6 mb-5 px-5">
//           <div class="row d-flex align-items-center">
//             <div class="col-5 avatar w-100 white d-flex justify-content-center align-items-center">
//               <img src="${a.avatar}"
//                 class="img-fluid rounded-circle z-depth-1" />
//             </div>
//             <div class="col-7">
//               <h6 class="font-weight-bold pt-2">${a.nombre}</h6>
//               <p class="text-muted">
//                 Sexo: ${a.sexo}
//               </p>
//             </div>
//           </div>
//         </div>
//     `;

  
// }

}
