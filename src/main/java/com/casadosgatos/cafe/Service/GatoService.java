package com.casadosgatos.cafe.Service;

import com.casadosgatos.cafe.DTOs.GatoRequestDTO;
import com.casadosgatos.cafe.DTOs.GatoResponseDTO;
import com.casadosgatos.cafe.Enum.StatusGatos;
import com.casadosgatos.cafe.Model.Gato;
import com.casadosgatos.cafe.Repository.GatoRepository;
import org.springframework.stereotype.Service;

@Service
public class GatoService {

    private final GatoRepository repository;

    public GatoService(GatoRepository repository) {
        this.repository = repository;
    }

    public GatoResponseDTO cadastrar(GatoRequestDTO dto) {

        StatusGatos status = dto.status() != null
                ? dto.status()
                : StatusGatos.DISPONIVEL;

        Gato gato = Gato.builder()
                .nome(dto.nome())
                .foto(dto.foto())
                .cor(dto.cor())
                .sexo(dto.sexo())
                .idade(dto.idade())
                .peso(dto.peso())
                .biografia(dto.biografia())
                .status(status)
                .build();

        Gato salvo = repository.save(gato);

        return new GatoResponseDTO(
                salvo.getId(),
                salvo.getNome(),
                salvo.getFoto(),
                salvo.getCor(),
                salvo.getSexo(),
                salvo.getIdade(),
                salvo.getPeso(),
                salvo.getBiografia(),
                salvo.getStatus()
        );
    }
}