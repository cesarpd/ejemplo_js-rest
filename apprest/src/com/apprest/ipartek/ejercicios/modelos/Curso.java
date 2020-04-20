package com.apprest.ipartek.ejercicios.modelos;

import javax.validation.constraints.NotEmpty;

public class Curso {
	private int id;
	@NotEmpty
	private String nombre;
	@NotEmpty
	private String imagen;
	@NotEmpty
	private Double precio;
	
	public Curso(int id, @NotEmpty String nombre, @NotEmpty String imagen, @NotEmpty Double precio) {
		super();
		this.id = id;
		this.nombre = nombre;
		this.imagen = imagen;
		this.precio = precio;
	}
	
	public Curso() {
		super();
		this.id = 0;
		this.nombre = "";
		this.imagen = "default.png";
		this.precio = 0.0;
	}

	public int getId() {
		return id;
	}

	public String getNombre() {
		return nombre;
	}

	public String getImagen() {
		return imagen;
	}

	public Double getPrecio() {
		return precio;
	}

	public void setId(int id) {
		this.id = id;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public void setImagen(String imagen) {
		this.imagen = imagen;
	}

	public void setPrecio(Double precio) {
		this.precio = precio;
	}

	@Override
	public String toString() {
		return "Curso [id=" + id + ", nombre=" + nombre + ", imagen=" + imagen + ", precio=" + precio + "]";
	}
	

}
