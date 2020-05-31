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

	//private static String SQL_GET_ALL   = "SELECT id, nombre, imagen, precio FROM curso ORDER BY id DESC LIMIT 100;";
	private static String SQL_GET_ALL   = 
			"SELECT\n" + 
			"c.id as id, c.nombre as nombre, c.imagen as imagen, c.precio as precio, p.nombre as profesor\n" + 
			"FROM curso c LEFT JOIN profesor_has_curso phc ON c.id = phc.curso_id\n" + 
			"LEFT JOIN profesor p ON p.id = phc.profesor_id LIMIT 100;";
	
	//private static String SQL_GET_BY_ID   = "SELECT id, nombre, precio, imagen FROM curso WHERE id = ?; ";
	private static String SQL_GET_BY_ID   = 
			"SELECT\\n\" + \n" + 
			"c.id as id, c.nombre as nombre, c.imagen as imagen, c.precio as precio, p.nombre as profesor\\n\" + \n" + 
			"FROM curso c LEFT JOIN profesor_has_curso phc ON c.id = phc.curso_id\\n\" + \n" + 
			"WHERE id = ?";
	
	private static CursoDao INSTANCE = null;
	
	private CursoDao() {
		super();
	}
	
	//Singleton
	public synchronized static CursoDao getInstance() {
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
		Curso registro = null;
		try (Connection con = ConnectionManager.getConnection();
				PreparedStatement pst = con.prepareStatement(SQL_GET_BY_ID);
		) {
			
			pst.setInt(1, id);
			LOGGER.info(pst.toString());
			
			try( ResultSet rs = pst.executeQuery() ){			
				
				if( rs.next() ) {					
					registro = mapper(rs);
				}else {
					throw new Exception("Registro no encontrado para id = " + id);
				}
			}
			
			
		} catch (SQLException e) {

			e.printStackTrace();
		}

		return registro;
	}

	@Override
	public Curso insert(Curso pojo) throws Exception, SQLException {
		throw new Exception("sin implementar");

	}

	@Override
	public Curso update(Curso pojo) throws Exception, SQLException {
		throw new Exception("sin implementar");

	}

	@Override
	public Curso delete(int id) throws Exception, SQLException {
		throw new Exception("sin implementar");

	}
	
	// Metodo de mapeo de los datos
	private Curso mapper( ResultSet rs ) throws SQLException {
		Curso c = new Curso();
		c.setId( rs.getInt("id") );
		c.setNombre( rs.getString("nombre"));
		c.setImagen( rs.getString("imagen"));
		c.setPrecio( rs.getFloat("precio"));
		c.setProfesor( rs.getString("profesor"));
		//LOGGER.warning(rs.getString("profesor"));;
		return c;
	}
}
