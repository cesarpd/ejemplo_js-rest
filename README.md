![](https://github.com/cesarpd/ejemplo_js-rest/blob/master/resources/header.png)

# ejemplo_js-rest

![](https://github.com/cesarpd/ejemplo_js-rest/blob/master/resources/vista-previa-ui.gif)

## Descripción de la aplicación
Ejemplo de aplicación js que se conecta a una API en java.
La aplicación consiste en un directorio de Alumnos y Cursos en la que se pueden realizar las siguientes operaciones:

__Para Alumnos__
+ Listar Alumnos 
+ Agregar Alumnos 
+ Eliminar Alumnos 
+ Editar Alumnos

__Para Profesor__
+ Listar Profesor 
+ Agregar Profesor 
+ Eliminar Profesor 
+ Editar Profesor 

__Para Cursos__
+ Listar Cursos 
+ Asignar Cursos al Alumno 
+ Eliminar Cursos del Alumno 
+ Asignar Cursos al Profesor 
+ Eliminar Cursos del Profesor 

### Tags
[ACTIVIDAD_16](https://github.com/cesarpd/ejemplo_js-rest/releases/tag/v1.1-beta.1 "Operaciones CRUD básicas para alumnos")

[ACTIVIDAD_15](https://github.com/cesarpd/ejemplo_js-rest/releases/tag/v1.1-beta.1 "Operaciones CRUD básicas para alumnos")

[!!! Entrega ejercicio alumnos](https://github.com/cesarpd/ejemplo_js-rest/releases/tag/v1.0 "Operaciones CRUD básicas para alumnos")

### Versión
[v1.1-beta.1 - Operaciones CRUD básicas para alumnos y cursos](https://github.com/cesarpd/ejemplo_js-rest/releases/tag/v1.1-beta.1 "Operaciones CRUD básicas para alumnos y cursos")

[v1.0 - Operaciones CRUD básicas para alumnos](https://github.com/cesarpd/ejemplo_js-rest/releases/tag/v1.0 "Operaciones CRUD básicas para alumnos")

[v3.1 - Operaciones CRUD básicas para alumnos y profesores](https://github.com/cesarpd/ejemplo_js-rest/releases/tag/v3.1 "Operaciones CRUD básicas para alumnos y profesores")

## Estructura del proyecto

El proyecto utiliza __Java 1.8__ como lenguaje de servidor y __ECMAScript__ como lenguaje de cliente. 

![](https://github.com/cesarpd/ejemplo_js-rest/blob/master/resources/ui-1.png)

### AppCliente
  > La aplicación cliente utiliza __HTML5__,__CSS3__ y __javascript__ 

  #### Dependencias
  Se requiere de un unico Framework como dependencia que a su vez utiliza varias librerias y frameworks para funcionar:

  ##### FRAMEWORK MAESTRO
  [MATERIAL DESIGN BOOTSTRAP -- mdbootstrap.com](https://mdbootstrap.com/docs/jquery/getting-started/installation-guide/ "mdbootstrap.com")
  
  ##### LIBRERIAS ADICIONALES
  Se ha utilizado la libreria Axios (Promise based HTTP client for the browser and node.js)
  [AXIOS](https://github.com/axios/axios "axios")
  
  ###### ESTRUCTURA
  >./appclient/css/mdb
  >./appclient/vendor/js/axios
  >./appclient/vendor/js/mdb/lib

    ==================
    * Axios          =
    * Bootstrap 4.0  =
    * Fontawesome    =
    * JQuery         =
    * popper         =
    * Datatables     =
    ...
   
   
     
  #### Configuración
  Se debe apuntar el cliente al servicio REST local cambiando la url al principio del documento main:
  >./appclient/js/main.js
  ```javascript
    const endpoint = "http://localhost:8080/com.apprest.ipartek.ejercicios/api/";
  ```

### AppRest
  La aplicación de servidor está escrita en __java 1.8__ con Maven como gestor de paquetes. Se pueden consultar las dependencias en:
  >./appclient/apprest/pom.xml

  Es necesario instalarla base de datos del proyecto. Un archivo de importación se puede encontrar en:
  >./appclient/scrpt-db.sql

#### Detalle API rest
##### Alumnos
  @GET ALL Personas (Alumnos)
  > http://localhost:8080/com.apprest.ipartek.ejercicios/api/personas/alumnos/
  
  @POST Personas (Alumnos)
  > http://localhost:8080/com.apprest.ipartek.ejercicios/api/personas/alumnos/

  ```javascript
    {
      "id": 1,
      "nombre": "Nombre",
      "avatar": "img/avatar1.png",
      "sexo": "h",
      "cursos": [
        {
          "id": 1,
          "nombre": "Java",
          "imagen": "default.png",
          "precio": 100.0
          "profesor": "Profe 1"
        }
      ]
    }
  ```
  @PUT Persona (Alumno)
  > http://localhost:8080/com.apprest.ipartek.ejercicios/api/personas/alumnos/${id}

  @DELETE Persona (Alumno)
  > http://localhost:8080/com.apprest.ipartek.ejercicios/api/personas/alumnos/${id}

  @GET ALL Cursos
  > http://localhost:8080/com.apprest.ipartek.ejercicios/api/cursos/

  @POST Curso en Persona (Alumno)
  > http://localhost:8080/com.apprest.ipartek.ejercicios/api/personas/alumnos/${idPersona}/curso/${idCurso}

  @DELETE Curso en Persona (Alumno)
  > http://localhost:8080/com.apprest.ipartek.ejercicios/api/personas/alumnos/${idPersona}/curso/${idCurso}



##### Profesores
  @GET ALL Personas (Profesores)
  > http://localhost:8080/com.apprest.ipartek.ejercicios/api/personas/profesores/
  
  @POST Personas (Profesores)
  > http://localhost:8080/com.apprest.ipartek.ejercicios/api/personas/profesores/

  ```javascript
    {
      "id": 1,
      "nombre": "Nombre",
      "avatar": "img/avatar1.png",
      "sexo": "h",
      "cursos": [
        {
          "id": 1,
          "nombre": "Java",
          "imagen": "default.png",
          "precio": 100.0
          "profesor": "Profe 1"
        }
      ]
    }
  ```
  @PUT Persona (Profesor)
  > http://localhost:8080/com.apprest.ipartek.ejercicios/api/personas/profesores/${id}

  @DELETE Persona (Profesor)
  > http://localhost:8080/com.apprest.ipartek.ejercicios/api/personas/profesores/${id}

  @GET ALL Cursos
  > http://localhost:8080/com.apprest.ipartek.ejercicios/api/cursos/

  @POST Curso en Persona (Profesor)
  > http://localhost:8080/com.apprest.ipartek.ejercicios/api/personas/profesores/${idPersona}/curso/${idCurso}

  @DELETE Curso en Persona (Profesor)
  > http://localhost:8080/com.apprest.ipartek.ejercicios/api/personas/profesores/${idPersona}/curso/${idCurso}

  ##### Cursos
  @GET ALL Cursos
  > http://localhost:8080/com.apprest.ipartek.ejercicios/api/cursos/
