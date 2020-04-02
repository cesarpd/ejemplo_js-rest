// console.info('Para ver en el depurador del navegador');
// console.debug('Debug');
// console.trace('trace');
// console.warn('warn');
// console.error('error');

let elH1 = document.getElementById('title');
let elH2 = document.getElementById('subtitle');
elH1.style.color = 'orangered';
elH2.classList.add('color-blue');
// cargar lista dinamicamente
let elist = document.getElementById('list');
for (let i=0; i < 4; i++){
  elist.innerHTML += `<li>Item ${i}</li>`;
}
