package com.casadosgatos.cafe.Controller;

import com.casadosgatos.cafe.DTOs.GatoRequestDTO;
import com.casadosgatos.cafe.DTOs.GatoResponseDTO;
import com.casadosgatos.cafe.Enum.StatusGatos;
import com.casadosgatos.cafe.Service.GatoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/gatos")
@CrossOrigin(origins = "http://localhost:4200")
public class GatoController {

    private final GatoService service;

    public GatoController(GatoService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<GatoResponseDTO> cadastrar(
            @RequestBody GatoRequestDTO dto) {

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(service.cadastrar(dto));
    }
    @GetMapping
    public ResponseEntity<List<GatoResponseDTO>> listar() {
        return ResponseEntity.ok(service.listar());
    }

    @GetMapping("/{id}")
    public ResponseEntity<GatoResponseDTO> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(service.buscarPorId(id));
    }

    @GetMapping("/busca")
    public ResponseEntity<List<GatoResponseDTO>> buscarPorStatus(
            @RequestParam StatusGatos status) {

        return ResponseEntity.ok(service.buscarPorStatus(status));
    }

    @PutMapping("/{id}")
    public ResponseEntity<GatoResponseDTO> atualizar(
            @PathVariable Long id,
            @RequestBody GatoRequestDTO dto) {

        return ResponseEntity.ok(service.atualizar(id,dto));
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> remover(@PathVariable Long id) {
        service.remover(id);
        return ResponseEntity.noContent().build();
    }
}
