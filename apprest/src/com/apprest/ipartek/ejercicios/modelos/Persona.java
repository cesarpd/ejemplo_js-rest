package com.apprest.ipartek.ejercicios.modelos;

import javax.validation.constraints.NotEmpty;

public class Persona {
	private int id;
	private String nombre;
	@NotEmpty
	private String avatar;
	private String sexo;
	
	public Persona() {
		super();
		this.id = 0;
		this.nombre = "";		
		this.avatar = "avatar1.png";
		this.sexo = "";
	}
	
	public Persona(int id, String nombre, @NotEmpty String avatar, String sexo) {
		setId(id);
		setNombre(nombre);
		setAvatar(avatar);
		setSexo(sexo);
	}
	

	public int getId() {
		return id;
	}

	public String getNombre() {
		return nombre;
	}

	public String getAvatar() {
		return avatar;
	}

	public String getSexo() {
		return sexo;
	}

	public void setId(int id) {
		this.id = id;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public void setAvatar(String avatar) {
		this.avatar = avatar;
	}

	public void setSexo(String sexo) {
		this.sexo = sexo;
	}

	@Override
	public String toString() {
		return "Persona [id=" + id + ", nombre=" + nombre + ", avatar=" + avatar + ", sexo=" + sexo + "]";
	}
	
	
	
	
}
