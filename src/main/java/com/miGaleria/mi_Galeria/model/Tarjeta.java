package com.miGaleria.mi_Galeria.model;

import jakarta.persistence.*;

@Entity
@Table(name = "tbl_tarjetas")
public class Tarjeta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String titulo;

    @Column(nullable = false, length = 500)
    private String texto;

    @Column(length = 255)
    private String imagen;

    public Tarjeta() {
    }

    public Tarjeta(String titulo, String texto, String imagen) {
        this.titulo = titulo;
        this.texto = texto;
        this.imagen = imagen;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getTexto() {
        return texto;
    }

    public void setTexto(String texto) {
        this.texto = texto;
    }

    public String getImagen() {
        return imagen;
    }

    public void setImagen(String imagen) {
        this.imagen = imagen;
    }
}