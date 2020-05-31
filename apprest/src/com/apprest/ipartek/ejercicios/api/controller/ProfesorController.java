package com.apprest.ipartek.ejercicios.api.controller;

import java.sql.SQLException;
import java.sql.SQLIntegrityConstraintViolationException;
import java.util.ArrayList;
import java.util.Set;
import java.util.logging.Logger;

import javax.servlet.ServletContext;
import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import com.apprest.ipartek.ejercicios.modelos.Curso;
import com.apprest.ipartek.ejercicios.modelos.Persona;
import com.apprest.ipartek.ejercicios.modelos.dao.CursoDao;
import com.apprest.ipartek.ejercicios.modelos.dao.ProfesorDao;

@Path("/personas/")
@Produces("application/json")
@Consumes("application/json")
public class ProfesorController {
	
	private static final Logger LOGGER = Logger.getLogger(PersonaController.class.getCanonicalName());
	
	private static ProfesorDao profesorDao = ProfesorDao.getInstance();
	private static CursoDao cursoDao = CursoDao.getInstance();
	private ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
	private Validator validator = factory.getValidator();

	@Context
	private ServletContext context;

	
	public ProfesorController() {
		super();
	}
	
	// Listar todos los profesores
	@GET
	@Path("profesores/")
	public ArrayList<Persona> getAll() {
		LOGGER.info("getAll");		
		// return personas;
		ArrayList<Persona> registros = (ArrayList<Persona>) profesorDao.getAll(); 
		return registros;
	}
	
	// Crear profesor
	@POST
	@Path("profesores/")
	public Response insert(Persona persona) {
		LOGGER.info("insert(" + persona + ")");
		Response response = Response.status(Status.INTERNAL_SERVER_ERROR).entity(null).build();

		// validar pojo
		Set<ConstraintViolation<Persona>> violations = validator.validate(persona);

		if (violations.isEmpty()) {

			try {
				profesorDao.insert(persona);
				response = Response.status(Status.CREATED).entity(persona).build();
				
			}catch (Exception e) {
				ResponseBody responseBody = new ResponseBody();
				responseBody.setInformacion("nombre duplicado");
				response = Response.status(Status.CONFLICT).entity(persona).build();
			}	

		} else {
			ArrayList<String> errores = new ArrayList<String>();
			for (ConstraintViolation<Persona> violation : violations) {
				errores.add(violation.getPropertyPath() + ": " + violation.getMessage());
			}

			response = Response.status(Status.BAD_REQUEST).entity(errores).build();
		}

		return response;

	}
	
	// Editar profesor
	@PUT
	@Path("profesores/{id: \\d+}")
	public Response update(@PathParam("id") int id, Persona persona) {
		LOGGER.info("update(" + id + ", " + persona + ")");		
		Response response = Response.status(Status.NOT_FOUND).entity(persona).build();

		Set<ConstraintViolation<Persona>> violations = validator.validate(persona);
		if (!violations.isEmpty()) {
			ArrayList<String> errores = new ArrayList<String>();
			for (ConstraintViolation<Persona> violation : violations) {
				errores.add(violation.getPropertyPath() + ": " + violation.getMessage());
			}
			response = Response.status(Status.BAD_REQUEST).entity(errores).build();
			
		}else {
			
			try {
				profesorDao.update(persona);
				response = Response.status(Status.OK).entity(persona).build();
			}catch (Exception e) {
				response = Response.status(Status.CONFLICT).entity(persona).build();
			}	
		}	
		return response;
	}
	
	// Borrar profesor
	@DELETE
	@Path("profesores/{id: \\d+}")
	public Response eliminar(@PathParam("id") int id) {
		LOGGER.info("eliminar(" + id + ")");

		Response response = Response.status(Status.INTERNAL_SERVER_ERROR).entity(null).build();
		Persona persona = null;
		
		try {
			profesorDao.delete(id);
			response = Response.status(Status.OK).entity(persona).build();
			
		}catch (SQLException e) {
			response = Response.status(Status.CONFLICT).entity(persona).build();
			
		}catch (Exception e) {
			response = Response.status(Status.NOT_FOUND).entity(persona).build();
		}
		return response;
	}
	
	// Asignar curso a profesor
	@POST
	@Path("profesores/{idPersona}/curso/{idCurso}")
	public Response asignarCurso(@PathParam("idPersona") int idPersona, @PathParam("idCurso") int idCurso) {
		LOGGER.info("asignarCurso idPersona=" + idPersona + " idCurso= " + idCurso);
		Response response = Response.status(Status.INTERNAL_SERVER_ERROR).entity(null).build();
		ResponseBody responseBody = new ResponseBody();

			try {
				profesorDao.asignarCurso(idPersona, idCurso);
				
				responseBody.setInformacion("curso asigando con exito");
				response = Response.status(Status.CREATED).entity(responseBody).build();
			
			} catch (SQLException e) {
				// Capturamos los errores de conflicto
				
//				LOGGER.info("**********************************************");
//				LOGGER.info("SQL Error Type : " + e.getClass().getName());
//				LOGGER.info("Error Message  : " + e.getMessage());
//				LOGGER.info("Error Code     : " + e.getErrorCode());
//				LOGGER.info("SQL State      : " + e.getSQLState());
//				LOGGER.info("**********************************************");

				if (e instanceof SQLIntegrityConstraintViolationException) {
					// Usamos el codigo de error en lugar del estado por ser mas preciso
					if (e.getErrorCode() == 1062) {
						
						if (e.getMessage().contains("PRIMARY")) { // Si es error de clave primaria es que el profesor ya tiene curso
			            	responseBody.setInformacion("Solo puedes tener un curso asignado");
			            	//System.out.println(responseBody);
							
						} else if (e.getMessage().contains("UNIQUE")) { // Si es error de clave unica es que los cursos no pueden asignarse a mas de un profesor
				            responseBody.setInformacion("Este curso ya está asignado a un profesor");
				            System.out.println(responseBody);
						}
					// Resolvemos otro tipo de errores de conflicto	
					} else {
						responseBody.setInformacion("Error de conflicto, no se puede asignar este curso");
						responseBody.setData(e);
					}
				}
				    System.out.println(responseBody);
					response = Response.status(Status.CONFLICT).entity(responseBody).build();
				
				
			} catch (Exception e) {
				responseBody.setInformacion(e.getMessage());
				response = Response.status(Status.NOT_FOUND).entity(responseBody).build();
			}
			
			return response;
	}

	
	// Desasignar curso al profesor
	@DELETE
	@Path("profesores/{idPersona}/curso/{idCurso}")
	public Response eliminarCurso(@PathParam("idPersona") int idPersona, @PathParam("idCurso") int idCurso) {
		LOGGER.info("eliminarCurso idPersona=" + idPersona + " idCurso= " + idCurso);
		Response response = Response.status(Status.INTERNAL_SERVER_ERROR).entity(null).build();
		ResponseBody responseBody = new ResponseBody();

		try {		
			profesorDao.eliminarCurso(idPersona, idCurso);
			Persona p = profesorDao.getById(idPersona);
			
			responseBody.setInformacion("curso eliminado con exito");
			responseBody.setData(p);
			response = Response.status(Status.OK).entity(responseBody).build();
			
		} catch (Exception e) {			
				responseBody.setInformacion(e.getMessage());
				response = Response.status(Status.NOT_FOUND).entity(responseBody).build();
		}

		return response;

	}

}
