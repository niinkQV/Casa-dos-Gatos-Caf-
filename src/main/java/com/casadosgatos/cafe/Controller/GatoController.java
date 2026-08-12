package com.casadosgatos.cafe.Controller;

import com.casadosgatos.cafe.DTOs.GatoRequestDTO;
import com.casadosgatos.cafe.DTOs.GatoResponseDTO;
import com.casadosgatos.cafe.Service.GatoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
}