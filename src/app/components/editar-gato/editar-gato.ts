import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GatoRequest } from '../../models/gato.model';
import { GatoService } from '../../services/gato';

@Component({
  selector: 'app-editar-gato',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './editar-gato.html',
  styleUrl: './editar-gato.css'
})
export class EditarGato implements OnInit {
  form: FormGroup;
  gatoId!: number;

  carregando = true;
  enviando = false;
  mensagemSucesso = '';
  mensagemErro = '';

  sexoOptions = ['MACHO', 'FEMEA'];
  statusOptions = ['DISPONIVEL', 'EM_ADOCAO', 'ADOTADO', 'TRANSFERIDO'];

  constructor(
      private fb: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private gatoService: GatoService
  ) {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      foto: [''],
      cor: ['', Validators.required],
      sexo: ['', Validators.required],
      idade: [0, [Validators.required, Validators.min(0)]],
      peso: [0, [Validators.required, Validators.min(0)]],
      biografia: [''],
      status: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.gatoId = Number(this.route.snapshot.paramMap.get('id'));

    this.gatoService.buscarPorId(this.gatoId).subscribe({
      next: (gato) => {
        this.form.patchValue(gato);
        this.carregando = false;
      },
      error: (erro: any) => {
        console.error('Erro ao carregar gato para edição:', erro);
        this.mensagemErro = 'Não foi possível carregar os dados do gato.';
        this.carregando = false;
      }
    });
  }

  salvar(): void {
    if (this.form.invalid) {
      this.mensagemErro = 'Preencha todos os campos obrigatórios corretamente.';
      return;
    }

    this.enviando = true;
    this.mensagemSucesso = '';
    this.mensagemErro = '';

    const gatoRequest: GatoRequest = this.form.value;

    this.gatoService.atualizar(this.gatoId, gatoRequest).subscribe({
      next: () => {
        this.mensagemSucesso = 'Gato atualizado com sucesso!';
        this.enviando = false;
        this.router.navigate(['/gatos', this.gatoId]);
      },
      error: (erro: any) => {
        console.error('Erro ao atualizar gato:', erro);
        this.mensagemErro = 'Não foi possível salvar as alterações. Verifique o console.';
        this.enviando = false;
      }
    });
  }
}