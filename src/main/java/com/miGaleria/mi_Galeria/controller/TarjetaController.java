package com.miGaleria.mi_Galeria.controller;


import com.miGaleria.mi_Galeria.model.Tarjeta;
import com.miGaleria.mi_Galeria.service.TarjetaService;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
public class TarjetaController {

    private final TarjetaService tarjetaService;

    public TarjetaController(TarjetaService tarjetaService) {
        this.tarjetaService = tarjetaService;
    }

    @GetMapping("/tarjetas")
    public ResponseEntity<List<Tarjeta>> listarTarjetas() {
        return ResponseEntity.ok(tarjetaService.listarTarjetas());
    }

    @GetMapping("/tarjetas/buscar")
    public ResponseEntity<List<Tarjeta>> buscarPorTitulo(@RequestParam String titulo) {
        return ResponseEntity.ok(tarjetaService.buscarPorTitulo(titulo));
    }

    @GetMapping("/tarjetas/{id}")
    public ResponseEntity<Tarjeta> obtenerTarjeta(@PathVariable Long id) {
        Tarjeta tarjeta = tarjetaService.obtenerPorId(id);
        if (tarjeta == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(tarjeta);
    }

    @PostMapping("/tarjetas")
    public ResponseEntity<Tarjeta> crearTarjeta(@RequestBody Tarjeta tarjeta) {
        Tarjeta nueva = tarjetaService.crearTarjeta(tarjeta);
        return ResponseEntity.ok(nueva);
    }

    @PutMapping("/tarjetas/{id}")
    public ResponseEntity<Tarjeta> actualizarTarjeta(
            @PathVariable Long id,
            @RequestBody Tarjeta tarjeta) {
        Tarjeta actualizada = tarjetaService.actualizarTarjeta(id, tarjeta);
        if (actualizada == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(actualizada);
    }

    @DeleteMapping("/tarjetas/{id}")
    public ResponseEntity<Void> eliminarTarjeta(@PathVariable Long id) {
        tarjetaService.eliminarTarjeta(id);
        return ResponseEntity.noContent().build();
    }
}