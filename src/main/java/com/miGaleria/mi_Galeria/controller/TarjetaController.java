package com.miGaleria.mi_Galeria.controller;

import com.miGaleria.mi_Galeria.model.Tarjeta;
import com.miGaleria.mi_Galeria.service.TarjetaService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tarjetas")
@CrossOrigin(origins = "*")
public class TarjetaController {

    private final TarjetaService service;

    public TarjetaController(TarjetaService service) {
        this.service = service;
    }

    @GetMapping
    public List<Tarjeta> getTarjetas() {
        return service.findAll();
    }

    @PostMapping
    public Tarjeta crear(@RequestBody Tarjeta tarjeta) {
        return service.save(tarjeta);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        service.delete(id);
    }
}