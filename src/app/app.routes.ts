// depois de criar os componentes eu importo eles aqui para poder usar no app.routes.ts
import { Routes } from '@angular/router';
import { Home } from './page/home/home';
import { Livros } from './page/livros/livros';
import { Autores } from './page/autores/autores';

// aqui deixo os caminhos para cada componente, assim quando o usuário clicar no link ele vai para o componente correto
export const routes: Routes = [
  { path: '', component: Home },
  { path: 'livros', component: Livros },
  { path: 'autores', component: Autores },
];
