// console.info('Para ver en el depurador del navegador');
// console.debug('Debug');
// console.trace('trace');
// console.warn('warn');
// console.error('error');

let eList = document.getElementById('alist');
let eLoad = document.querySelector('#alist p');
for (let i = 1; i < 10; i++) {
  eLoad.style.display='none';
  eList.innerHTML += `
   <div class="col-lg-4 col-sm-6 mb-5 px-5">
          <div class="row d-flex align-items-center">
            <div class="col-5 avatar w-100 white d-flex justify-content-center align-items-center">
              <img src="https://i.pravatar.cc/200?u=iptk000${i}"
                class="img-fluid rounded-circle z-depth-1" />
            </div>
            <div class="col-7">
              <h6 class="font-weight-bold pt-2">Name ${i}</h6>
              <p class="text-muted">
                Description ${i} 
              </p>
            </div>
          </div>
        </div>
  
  `;

  
}
