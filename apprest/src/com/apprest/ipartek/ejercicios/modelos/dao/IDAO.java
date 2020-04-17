package com.apprest.ipartek.ejercicios.modelos.dao;

import java.sql.SQLException;
import java.util.List;

public interface IDAO<P> {

	List<P> getAll();
	P getById(int id) throws Exception;
	P insert(P pojo) throws Exception, SQLException;
	P update(P pojo) throws Exception, SQLException;
	P delete(int id) throws Exception, SQLException;

	
}
