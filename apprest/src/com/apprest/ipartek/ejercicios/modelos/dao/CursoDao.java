package com.apprest.ipartek.ejercicios.modelos.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

import com.apprest.ipartek.ejercicios.modelos.Curso;

public class CursoDao implements IDAO<Curso> {

	private static final Logger LOGGER = Logger.getLogger(CursoDao.class.getCanonicalName());

	private static String SQL_GET_ALL   = "SELECT id, nombre, imagen, precio FROM curso ORDER BY id DESC LIMIT 100;";
	
	private static CursoDao INSTANCE = null;
	
	private CursoDao() {
		super();
	}
	
	//Singleton
	public synchronized static CursoDao getInstancia() {
		if (INSTANCE == null) {
			INSTANCE = new CursoDao();
		}
		return INSTANCE;
	}
	
	// Metodos a implementar
	@Override
	public List<Curso> getAll() {
		LOGGER.info("getAll Cursos");
		ArrayList<Curso> registros = new ArrayList<Curso>();
		try (Connection con = ConnectionManager.getConnection();
				PreparedStatement pst = con.prepareStatement(SQL_GET_ALL);
				ResultSet rs = pst.executeQuery();

		) {

			LOGGER.info(pst.toString());
			
			while( rs.next() ) {				
				registros.add( mapper(rs) );				
			}
			
			
		} catch (SQLException e) {

			e.printStackTrace();
		}

		return registros;
	}

	@Override
	public Curso getById(int id) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Curso insert(Curso pojo) throws Exception, SQLException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Curso update(Curso pojo) throws Exception, SQLException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Curso delete(int id) throws Exception, SQLException {
		// TODO Auto-generated method stub
		return null;
	}
	
	// Metodo de mapeo de los datos
	private Curso mapper( ResultSet rs ) throws SQLException {
		Curso c = new Curso();
		c.setId( rs.getInt("id") );
		c.setNombre( rs.getString("nombre"));
		c.setImagen( rs.getString("imagen"));
		c.setPrecio( rs.getFloat("precio"));
		return c;
	}
}
