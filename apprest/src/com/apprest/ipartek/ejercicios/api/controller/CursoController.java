package com.apprest.ipartek.ejercicios.api.controller;

import java.util.ArrayList;
import java.util.logging.Logger;

import javax.servlet.ServletContext;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import com.apprest.ipartek.ejercicios.modelos.Curso;
import com.apprest.ipartek.ejercicios.modelos.dao.CursoDao;

@Path("/cursos")
@Produces("application/json")
@Consumes("application/json")

public class CursoController {
	@Context
	private ServletContext context;

	private static final Logger LOGGER = Logger.getLogger(CursoController.class.getCanonicalName());
	
	private static CursoDao cursoDao = CursoDao.getInstance();

	
	@GET
	public Response getAll(){
		LOGGER.info("API: GetAll");
		ArrayList<Curso> registros = (ArrayList<Curso>) cursoDao.getAll();
		Response response = Response.status(Status.OK).entity(registros).build();

		return response;
		
	}
}
