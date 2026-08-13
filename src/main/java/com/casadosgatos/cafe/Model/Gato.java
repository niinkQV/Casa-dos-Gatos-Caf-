package com.casadosgatos.cafe.Model;

import com.casadosgatos.cafe.Enum.Sexo;
import com.casadosgatos.cafe.Enum.StatusGatos;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Gato {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String nome;

  private String foto;

  private String cor;

  @Enumerated(EnumType.STRING)
  private Sexo sexo;

  private Integer idade;

  private Double peso;

  @Column(length = 1000)
  private String biografia;

  @Enumerated(EnumType.STRING)
  private StatusGatos status;
}