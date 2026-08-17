import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Gato, StatusGato } from '../../models/gato.model';
import { GatoService } from '../../services/gato';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-listar-gatos',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './listar-gatos.html',
  styleUrl: './listar-gatos.css'
})
export class ListarGatos implements OnInit {
  gatos = signal<Gato[]>([]);
  carregando = signal(true);
  mensagemErro = signal('');
  filtroStatus = signal<StatusGato | ''>('');
  statusOptions = Object.values(StatusGato);

  constructor(private gatoService: GatoService) {}

  ngOnInit(): void {
    this.carregar();
  }

  carregar(): void {
    this.carregando.set(true);
    this.mensagemErro.set('');

    const statusSelecionado = this.filtroStatus();

    const requisicao = statusSelecionado
        ? this.gatoService.buscarPorStatus(statusSelecionado)
        : this.gatoService.listar();

    requisicao.subscribe({
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

  aoMudarFiltro(): void {
    this.carregar();
  }

}