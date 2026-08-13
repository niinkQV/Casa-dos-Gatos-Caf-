package com.casadosgatos.cafe.Repository;

import com.casadosgatos.cafe.Model.Gato;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GatoRepository extends JpaRepository<Gato, Long> {
}