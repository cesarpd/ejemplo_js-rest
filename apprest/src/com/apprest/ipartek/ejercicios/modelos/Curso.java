package com.apprest.ipartek.ejercicios.modelos;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

public class Curso {
	private int id;
	@Size( min=2, max = 255, message = "minimo 2 maximo 255 carcateres")
	private String nombre;
	@NotEmpty
	private String imagen;
	@NotEmpty
	private Float precio;
	
	public Curso(int id, @Size(min = 2, max = 255, message = "minimo 2 maximo 255 carcateres") String nombre,
			@NotEmpty String imagen, @NotEmpty Float precio) {
		setId(id);
		setNombre(nombre);
		setImagen(imagen);
		setPrecio(precio);
	}

	public Curso() {
		super();
		this.id = 0;
		this.nombre = "";
		this.imagen = "default.png";
		this.precio = (float) 0;
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

	public Float getPrecio() {
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

	public void setPrecio(Float precio) {
		this.precio = precio;
	}

	@Override
	public String toString() {
		return "Curso [id=" + id + ", nombre=" + nombre + ", imagen=" + imagen + ", precio=" + precio + "]";
	}
	

}
