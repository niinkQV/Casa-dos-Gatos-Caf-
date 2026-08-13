import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Gato } from '../../models/gato.model';
import { GatoService } from '../../services/gato';

@Component({
  selector: 'app-detalhe-gato',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './detalhe-gato.html',
  styleUrl: './detalhe-gato.css'
})
export class DetalheGato implements OnInit {
  gato: Gato | null = null;
  carregando = true;
  mensagemErro = '';

  constructor(
    private route: ActivatedRoute,
    private gatoService: GatoService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.gatoService.buscarPorId(id).subscribe({
      next: (gato: Gato) => {
        this.gato = gato;
        this.carregando = false;
      },
      error: (erro: any) => {
        console.error('Erro ao buscar gato:', erro);
        this.mensagemErro = erro.status === 404
          ? 'Gato não encontrado.'
          : 'Não foi possível carregar os dados do gato.';
        this.carregando = false;
      }
    });
  }
}