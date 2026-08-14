import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GatoRequest } from '../../models/gato.model';
import { GatoService } from '../../services/gato';

@Component({
  selector: 'app-editar-gato',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './editar-gato.html',
  styleUrl: './editar-gato.css'
})
export class EditarGato implements OnInit {
  form: FormGroup;
  gatoId!: number;

  carregando = signal(true);
  enviando = signal(false);
  mensagemSucesso = signal('');
  mensagemErro = signal('');

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
        this.carregando.set(false);
      },
      error: (erro: any) => {
        console.error('Erro ao carregar gato para edição:', erro);
        this.mensagemErro.set('Não foi possível carregar os dados do gato.');
        this.carregando.set(false);
      }
    });
  }

  salvar(): void {
    if (this.form.invalid) {
      this.mensagemErro.set('Preencha todos os campos obrigatórios corretamente.');
      return;
    }

    this.enviando.set(true);
    this.mensagemSucesso.set('');
    this.mensagemErro.set('');

    const gatoRequest: GatoRequest = this.form.value;

    this.gatoService.atualizar(this.gatoId, gatoRequest).subscribe({
      next: () => {
        this.mensagemSucesso.set('Gato atualizado com sucesso!');
        this.enviando.set(false);
        this.router.navigate(['/gatos', this.gatoId]);
      },
      error: (erro: any) => {
        console.error('Erro ao atualizar gato:', erro);
        this.mensagemErro.set('Não foi possível salvar as alterações. Verifique o console.');
        this.enviando.set(false);
      }
    });
  }
}