package com.apprest.ipartek.ejercicios.modelos.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.logging.Logger;

import com.apprest.ipartek.ejercicios.modelos.Curso;
import com.apprest.ipartek.ejercicios.modelos.Persona;

public class PersonaDao implements IDAO<Persona> {
	
	private static final Logger LOGGER = Logger.getLogger(PersonaDao.class.getCanonicalName());
	
	private static PersonaDao INSTANCE = null;
	// Consultas SQL
	
	//GET
	private static String SQL_GET_ALL = "SELECT  p.id as persona_id, p.nombre as persona_nombre, p.avatar as persona_avatar, p.sexo as persona_sexo, c.id as curso_id, c.nombre as curso_nombre, c.imagen as curso_imagen, c.precio as curso_precio \n" + 
			"FROM persona p LEFT JOIN persona_has_curso phc ON p.id = phc.persona_id \n" + 
			"LEFT JOIN curso c ON c.id = phc.curso_id LIMIT 500;";

	private static String SQL_GET_BY_ID = " SELECT  p.id as persona_id, p.nombre as persona_nombre, p.avatar as persona_avatar, p.sexo as persona_sexo, c.id as curso_id, c.nombre as curso_nombre, c.imagen as curso_imagen, c.precio as curso_precio \n" + 
			"			\"FROM persona p LEFT JOIN persona_has_curso phc ON p.id = phc.persona_id \\n\" + \n" + 
			"			\"LEFT JOIN curso c ON c.id = phc.curso_id WHERE p.id = ?;";

	//CRUD
	//private static String SQL_GET_ALL   = "SELECT id, nombre, avatar, sexo FROM persona ORDER BY id DESC LIMIT 500; ";
	//private static String SQL_GET_BY_ID = "SELECT id, nombre, avatar, sexo FROM persona WHERE id = ?; ";
	private static String SQL_DELETE    = "DELETE FROM persona WHERE id = ?; ";
	private static String SQL_INSERT    = "INSERT INTO persona ( nombre, avatar, sexo) VALUES ( ?, ?, ? ); ";
	private static String SQL_UPDATE    = "UPDATE persona SET nombre = ?, avatar = ?,  sexo = ? WHERE id = ?; ";
	
	
	private PersonaDao() {
		super();
	}
	
	public synchronized static PersonaDao getInstance() {
        if (INSTANCE == null) {
        	INSTANCE = new PersonaDao();
        }
        return INSTANCE;
    }
	
	// Implementaciín de Metodos del DAO
	@Override
	public List<Persona> getAll() {
		// TODO Auto-generated method stub
		LOGGER.info("getAll");
		
		ArrayList<Persona> registros = new ArrayList<Persona>();
		
		HashMap<Integer, Persona> hmPersonas = new HashMap<Integer, Persona>();
		
		try (Connection con = ConnectionManager.getConnection();
				PreparedStatement pst = con.prepareStatement(SQL_GET_ALL);
				ResultSet rs = pst.executeQuery();

		) {

			LOGGER.info(pst.toString());
			
			while( rs.next() ) {				
				//registros.add( mapper(rs) );
				mapper(rs, hmPersonas);
			}
			
			
		} catch (SQLException e) {

			e.printStackTrace();
		}

		return new ArrayList<Persona> (hmPersonas.values());
	}



	@Override
	public Persona getById(int id) throws Exception {
		LOGGER.info("getById");
		Persona registro = null;
		try (Connection con = ConnectionManager.getConnection();
				PreparedStatement pst = con.prepareStatement(SQL_GET_BY_ID);
		) {

			pst.setInt(1, id);
			LOGGER.info(pst.toString());
			
			try( ResultSet rs = pst.executeQuery() ){
				
				HashMap<Integer, Persona> hmPersonas = new HashMap<Integer, Persona>();

				if( rs.next() ) {					
					mapper(rs, hmPersonas);					
					
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
	public Persona insert(Persona pojo) throws Exception, SQLException {
		LOGGER.info("insert");
		try (Connection con = ConnectionManager.getConnection();
				PreparedStatement pst = con.prepareStatement(SQL_INSERT, PreparedStatement.RETURN_GENERATED_KEYS);
		) {

			pst.setString(1, pojo.getNombre() );
			pst.setString(2, pojo.getAvatar() );
			pst.setString(3, pojo.getSexo() );
			LOGGER.info(pst.toString());
			
			//eliminamos la persona
			int affetedRows = pst.executeUpdate();	
			if (affetedRows == 1) {
				//recuperar ID generado automaticamente
				ResultSet rs = pst.getGeneratedKeys();
				if( rs.next()) {
					pojo.setId( rs.getInt(1) );
				}	
				
			}else {
				throw new Exception("No se puede crear registro " + pojo);
			}
			
		} catch (SQLException e) {

			throw new Exception("No se puede crear registro " + e.getMessage() );
		}

		return pojo;
	}

	@Override
	public Persona update(Persona pojo) throws Exception, SQLException {
		LOGGER.info("update");
		try (Connection con = ConnectionManager.getConnection();
				PreparedStatement pst = con.prepareStatement(SQL_UPDATE);
		) {

			pst.setString(1, pojo.getNombre() );
			pst.setString(2, pojo.getAvatar() );
			pst.setString(3, pojo.getSexo() );
			pst.setInt(4, pojo.getId() );
			LOGGER.info(pst.toString());
			
			//eliminamos la persona
			int affetedRows = pst.executeUpdate();	
			if (affetedRows != 1) {				
				throw new Exception("No se puede modificar registro " + pojo);
			}
			
		} catch (SQLException e) {

			throw new Exception("No se puede modificar registro " + e.getMessage() );
		}

		return pojo;
	}

	@Override
	public Persona delete(int id) throws Exception, SQLException {
		LOGGER.info("delete");
		Persona registro = null;
		
		//recuperar persona antes de eliminar
		registro = getById(id);
		
		try (Connection con = ConnectionManager.getConnection();
				PreparedStatement pst = con.prepareStatement(SQL_DELETE);
		) {

			pst.setInt(1, id);
			LOGGER.info(pst.toString());
			
			//eliminamos la persona
			int affetedRows = pst.executeUpdate();	
			if (affetedRows != 1) {
				throw new Exception("No se puede eliminar registro " + id);
			}
			
		} catch (SQLException e) {

			throw new SQLException("No se puede eliminar registro " + e.getMessage() );
		}

		return registro;
	
	}
	
	// Metodos
	private void mapper(ResultSet rs, HashMap<Integer,Persona> hm) throws SQLException {
		Integer key = rs.getInt("persona_id");
		
		Persona p = hm.get(key);
		if (p == null) {
			p = new Persona();
			p.setId(key);
			p.setNombre( rs.getString("persona_nombre"));
			p.setAvatar( rs.getString("persona_avatar"));
			p.setSexo( rs.getString("persona_sexo"));

		}

		// se añade el curso
		int idCurso = rs.getInt("curso_id");
		if ( idCurso != 0) {
			Curso c = new Curso();
			c.setId(idCurso);
			c.setNombre(rs.getString("curso_nombre"));
			c.setPrecio( rs.getFloat("curso_precio"));
			c.setImagen(rs.getString("curso_imagen"));			
			p.getCursos().add(c);
		}	

		//actualizar hashmap
		hm.put(key, p);
		
		
	}

}
