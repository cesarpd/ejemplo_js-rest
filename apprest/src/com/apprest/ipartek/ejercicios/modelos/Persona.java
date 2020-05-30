package com.apprest.ipartek.ejercicios.modelos;

import java.util.ArrayList;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

public class Persona {
	private int id;
	@Size( min=2, max = 50, message = "minimo 2 maximo 50 carcateres" )
	private String nombre;
	@NotEmpty
	private String avatar;
	//TODO regexp para "h" o "m"
	// @Pattern(regexp = "" )
	private String sexo;
	
	// Nuevo Array para almacenar los cursos
	private ArrayList<Curso> cursos;
	
	public Persona() {
		super();
		this.id = 0;
		this.nombre = "";		
		this.avatar = "avatar1.png";
		this.sexo = "";
		this.cursos = new ArrayList<Curso>();
	}
	
	public Persona(int id, String nombre, @NotEmpty String avatar, String sexo) {
		setId(id);
		setNombre(nombre);
		setAvatar(avatar);
		setSexo(sexo);
	}
	
	
	//Getter y setter de curso
	public ArrayList<Curso> getCursos(){
		return cursos;
	}
	public void  setCursos (ArrayList<Curso> cursos) {
		this.cursos = cursos;
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
		return "Persona [id=" + id + ", nombre=" + nombre + ", avatar=" + avatar + ", sexo=" + sexo + ", cursos="
				+ cursos + "]";
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((avatar == null) ? 0 : avatar.hashCode());
		result = prime * result + ((cursos == null) ? 0 : cursos.hashCode());
		result = prime * result + id;
		result = prime * result + ((nombre == null) ? 0 : nombre.hashCode());
		result = prime * result + ((sexo == null) ? 0 : sexo.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Persona other = (Persona) obj;
		if (avatar == null) {
			if (other.avatar != null)
				return false;
		} else if (!avatar.equals(other.avatar))
			return false;
		if (cursos == null) {
			if (other.cursos != null)
				return false;
		} else if (!cursos.equals(other.cursos))
			return false;
		if (id != other.id)
			return false;
		if (nombre == null) {
			if (other.nombre != null)
				return false;
		} else if (!nombre.equals(other.nombre))
			return false;
		if (sexo == null) {
			if (other.sexo != null)
				return false;
		} else if (!sexo.equals(other.sexo))
			return false;
		return true;
	}


	
	
	
	
}
