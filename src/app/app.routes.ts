import { Routes } from '@angular/router';
import { CadastrarGato } from './components/cadastrar-gato/cadastrar-gato';
import { ListarGatos } from './components/listar-gatos/listar-gatos';
import { DetalheGato } from './components/detalhe-gato/detalhe-gato';

export const routes: Routes = [
  { path: 'cadastrar-gato', component: CadastrarGato },
  { path: 'gatos', component: ListarGatos },
  { path: 'gatos/:id', component: DetalheGato },
];