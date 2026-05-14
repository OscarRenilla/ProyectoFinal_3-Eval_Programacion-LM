package com.miGaleria.mi_Galeria.service;

import com.miGaleria.mi_Galeria.model.Tarjeta;
import com.miGaleria.mi_Galeria.repository.TarjetaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TarjetaService {

    private final TarjetaRepository repo;

    public TarjetaService(TarjetaRepository repo) {
        this.repo = repo;
    }

    public List<Tarjeta> findAll() {
        return repo.findAll();
    }

    public Tarjeta save(Tarjeta t) {
        return repo.save(t);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }
}