package com.casadosgatos.cafe.Service;

import com.casadosgatos.cafe.DTOs.GatoRequestDTO;
import com.casadosgatos.cafe.DTOs.GatoResponseDTO;
import com.casadosgatos.cafe.Enum.StatusGatos;
import com.casadosgatos.cafe.Model.Gato;
import com.casadosgatos.cafe.Repository.GatoRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.casadosgatos.cafe.Exception.RecursoNaoEncontradoException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

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

    public List<GatoResponseDTO> listar() {
        return repository.findAll()
                .stream()
                .map(this::toResponseDTO)
                .toList();
    }

    public GatoResponseDTO buscarPorId(Long id) {
        Gato gato = repository.findById(id)
                .orElseThrow(() -> new RecursoNaoEncontradoException(
                        "Gato não encontrado com o id: " + id));

        return toResponseDTO(gato);
    }

    private GatoResponseDTO toResponseDTO(Gato gato) {
        return new GatoResponseDTO(
                gato.getId(),
                gato.getNome(),
                gato.getFoto(),
                gato.getCor(),
                gato.getSexo(),
                gato.getIdade(),
                gato.getPeso(),
                gato.getBiografia(),
                gato.getStatus()
        );
    }

    public List<GatoResponseDTO> buscarPorStatus(StatusGatos status) {
        return repository.findByStatus(status)
                .stream()
                .map(this::toResponseDTO)
                .toList();
    }

    public GatoResponseDTO atualizar(Long id, GatoRequestDTO dto) {
        Gato gato = repository.findById(id)
                .orElseThrow(() -> new RecursoNaoEncontradoException(
                        "gato não encontrado com o id: " + id));

        gato.setNome(dto.nome());
        gato.setFoto(dto.foto());
        gato.setCor(dto.cor());
        gato.setSexo(dto.sexo());
        gato.setIdade(dto.idade());
        gato.setPeso(dto.peso());
        gato.setBiografia(dto.biografia());

        if (dto.status() != null) {
            gato.setStatus(dto.status());
        }

        Gato atualizado = repository.save(gato);

        return toResponseDTO(atualizado);
    }
