package com.miGaleria.mi_Galeria.service;

import com.miGaleria.mi_Galeria.model.Tarjeta;
import com.miGaleria.mi_Galeria.repository.TarjetaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TarjetaServiceImpl implements TarjetaService {

    @Autowired
    private TarjetaRepository tarjetaRepository;

    @Override
    public List<Tarjeta> listarTarjetas() {
        return tarjetaRepository.findAll();
    }

    @Override
    public List<Tarjeta> buscarPorTitulo(String titulo) {
        return tarjetaRepository.findByTituloContainingIgnoreCase(titulo);
    }

    @Override
    public Tarjeta obtenerPorId(Long id) {
        return tarjetaRepository.findById(id).orElse(null);
    }

    @Override
    public Tarjeta crearTarjeta(Tarjeta tarjeta) {
        return tarjetaRepository.save(tarjeta);
    }

    @Override
    public Tarjeta actualizarTarjeta(Long id, Tarjeta tarjeta) {
        Tarjeta existente = tarjetaRepository.findById(id).orElse(null);
        if (existente == null) return null;

        existente.setTitulo(tarjeta.getTitulo());
        existente.setTexto(tarjeta.getTexto());

        return tarjetaRepository.save(existente);
    }

    @Override
    public void eliminarTarjeta(Long id) {
        tarjetaRepository.deleteById(id);
    }
}