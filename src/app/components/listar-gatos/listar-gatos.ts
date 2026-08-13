import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Gato } from '../../models/gato.model';
import { GatoService } from '../../services/gato';

@Component({
  selector: 'app-listar-gatos',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './listar-gatos.html',
  styleUrl: './listar-gatos.css'
})
export class ListarGatos implements OnInit {
  gatos = signal<Gato[]>([]);
  carregando = signal(true);
  mensagemErro = signal('');

  constructor(private gatoService: GatoService) {}

  ngOnInit(): void {
    this.gatoService.listar().subscribe({
      next: (gatos: Gato[]) => {
        this.gatos.set(gatos);
        this.carregando.set(false);
      },
      error: (erro: any) => {
        console.error('Erro ao listar gatos:', erro);
        this.mensagemErro.set('Não foi possível carregar a lista de gatos.');
        this.carregando.set(false);
      }
    });
  }
}