package com.apprest.ipartek.ejercicios.modelos.dao;

import java.sql.Connection;
import java.util.logging.Logger;

import javax.naming.InitialContext;
import javax.sql.DataSource;

public class ConnectionManager {
	private static final Logger LOGGER = Logger.getLogger(ConnectionManager.class.getCanonicalName());
	private static Connection conn;

	public static Connection getConnection() {

		conn = null;

		try {
			InitialContext ctx = new InitialContext();
			DataSource ds = (DataSource) ctx.lookup("java:comp/env/jdbc/mydb");

			if (ds == null) {
				LOGGER.info("Data source no encontrado");
				throw new Exception("Data source no encontrado!");
			}

			conn = ds.getConnection();

		} catch (Exception e) {

			//TODO logger
			e.printStackTrace();
		}

		return conn;

	}
}
