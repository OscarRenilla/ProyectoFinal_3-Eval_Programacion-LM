package com.miGaleria.mi_Galeria.service;

import com.miGaleria.mi_Galeria.model.Tarjeta;

import java.util.List;

public interface TarjetaService {

    List<Tarjeta> listarTarjetas();

    List<Tarjeta> buscarPorTitulo(String titulo);

    Tarjeta obtenerPorId(Long id);

    Tarjeta crearTarjeta(Tarjeta tarjeta);

    Tarjeta actualizarTarjeta(Long id, Tarjeta tarjeta);

    void eliminarTarjeta(Long id);
}