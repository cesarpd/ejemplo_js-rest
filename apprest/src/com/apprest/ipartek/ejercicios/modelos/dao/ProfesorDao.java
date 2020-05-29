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

public class ProfesorDao implements IDAO<Persona>{
	private static final Logger LOGGER = Logger.getLogger(ProfesorDao.class.getCanonicalName());
	
	private static ProfesorDao INSTANCE = null;
	//CONSULTAS SQL
	//GET ALL
	private static String SQL_GET_ALL = "SELECT \n" + 
				"p.id as persona_id , p.nombre as persona_nombre, p.avatar as persona_avatar, p.sexo as persona_sexo, \n" + 
				"c.id as curso_id, c.nombre as curso_nombre, c.precio as curso_precio, c.imagen as curso_imagen \n" + 
				"FROM profesor p \n" + 
				"LEFT JOIN curso c ON p.id = c.profesor_id \n" + 
				"LIMIT 100;";
	
	
	private static String SQL_INSERT    = "INSERT INTO profesor ( nombre, avatar, sexo) VALUES ( ?, ?, ? ); ";

	
	// SINGLETON
	private ProfesorDao() {
		super();
	}
	
	public synchronized static ProfesorDao getInstance() {
        if (INSTANCE == null) {
        	INSTANCE = new ProfesorDao();
        }
        return INSTANCE;
    }
	
	// Implementaciín de Metodos del DAO
	
	@Override
	public List<Persona> getAll() {
		// TODO Auto-generated method stub
		LOGGER.info("getAll");
		
		//ArrayList<Persona> registros = new ArrayList<Persona>();
		
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
		// TODO Auto-generated method stub
		return null;
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
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Persona delete(int id) throws Exception, SQLException {
		// TODO Auto-generated method stub
		return null;
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
//		int idCurso = rs.getInt("curso_id");
//		if ( idCurso != 0) {
//			Curso c = new Curso();
//			c.setId(idCurso);
//			c.setNombre(rs.getString("curso_nombre"));
//			c.setPrecio( rs.getFloat("curso_precio"));
//			c.setImagen(rs.getString("curso_imagen"));			
//			p.getCursos().add(c);
//		}	

		//actualizar hashmap
		hm.put(key, p);
		
	}
	
}
