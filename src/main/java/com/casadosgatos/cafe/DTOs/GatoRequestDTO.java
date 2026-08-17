package com.casadosgatos.cafe.DTOs;


import com.casadosgatos.cafe.Enum.Sexo;
import com.casadosgatos.cafe.Enum.StatusGatos;

public record GatoRequestDTO(
        String nome, String foto, String cor, Sexo sexo, Integer idade, Double peso, String biografia,
        StatusGatos status
){}
