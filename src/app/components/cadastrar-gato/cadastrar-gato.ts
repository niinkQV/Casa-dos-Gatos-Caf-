import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GatoRequest } from '../../models/gato.model';
import { GatoService } from '../../services/gato';

@Component({
  selector: 'app-cadastrar-gato',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './cadastrar-gato.html',
  styleUrl: './cadastrar-gato.css'
})
export class CadastrarGato {
  form: FormGroup;
  enviando = false;
  mensagemSucesso = '';
  mensagemErro = '';

  sexoOptions = ['MACHO', 'FEMEA'];
  statusOptions = ['DISPONIVEL', 'ADOTADO'];

  constructor(
    private fb: FormBuilder, 
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
      status: ['']
    });
  }

  cadastrar(): void {
    if (this.form.invalid) {
      this.mensagemErro = 'Preencha todos os campos obrigatórios corretamente.';
      return;
    }

    this.enviando = true;
    this.mensagemSucesso = '';
    this.mensagemErro = '';

    const gatoRequest: GatoRequest = this.form.value;

    this.gatoService.cadastrar(gatoRequest).subscribe({
      next: (resposta: any) => {
        console.log('Gato cadastrado:', resposta);
        this.mensagemSucesso = `Gato cadastrado com sucesso! ID: ${resposta.id}`;
        
        this.form.reset({ idade: 0, peso: 0, status: '' });
        this.enviando = false;
      },
      error: (erro: any) => {
        console.error('Erro ao cadastrar gato:', erro);
        this.mensagemErro = 'Não foi possível cadastrar o gato. Verifique o console.';
        this.enviando = false;
      }
    });
  }
}