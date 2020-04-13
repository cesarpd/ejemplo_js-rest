/**
 * llamada ajax en vanilla javascript
 * @param {*} metodo 
 * @param {*} url 
 * @param {*} datos en formato json para el request body
 * @return Promise
 */
function ajax(metodo, url, datos) {

  return new Promise((resolve, reject) => {

    console.debug(`promesa ajax metodo ${metodo} - ${url}`);
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {

      if (this.readyState == 4) {

        if (this.status == 200 || this.status == 201) {

          let jsonData = JSON.parse(this.responseText);
          console.debug("jsonData: " + jsonData);
          // exito
          resolve(jsonData);
        } else {
          // error
          console.debug("error en la peticion");
          reject(Error(this.status));
        }
      } // readyState == 4

    }; // onreadystatechange

    xhttp.open(metodo, url, true);
    xhttp.send();
  });
}