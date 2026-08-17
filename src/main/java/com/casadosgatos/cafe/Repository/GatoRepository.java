package com.casadosgatos.cafe.Repository;

import com.casadosgatos.cafe.Enum.StatusGatos;
import com.casadosgatos.cafe.Model.Gato;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GatoRepository extends JpaRepository<Gato, Long> {
    List<Gato> findByStatus(StatusGatos status);
}