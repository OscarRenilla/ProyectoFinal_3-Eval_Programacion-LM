package com.miGaleria.mi_Galeria.repository;

import com.miGaleria.mi_Galeria.model.Tarjeta;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TarjetaRepository extends JpaRepository<Tarjeta, Long> {

    List<Tarjeta> findByTituloContainingIgnoreCase(String titulo);
}