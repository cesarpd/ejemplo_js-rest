package com.apprest.ipartek.ejercicios.modelos;

import javax.validation.constraints.NotEmpty;

public class Profesor extends Persona{

	public Profesor() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Profesor(int id, String nombre, @NotEmpty String avatar, String sexo) {
		super(id, nombre, avatar, sexo);
		// TODO Auto-generated constructor stub
	}

}
