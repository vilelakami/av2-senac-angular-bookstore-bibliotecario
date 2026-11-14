import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Livro } from '../models/livro';

@Injectable({ providedIn: 'root' })
export class LivroService {
  private http = inject(HttpClient);
  private url = 'http://localhost:3000/livros';

  listar() {
    // o angular vai fazer uma requisição para o backend e vai retornar uma lista de livros
    return this.http.get<Livro[]>(this.url);
  }

  // rota create para fazre um post no backend
  criar(livro: Livro) {
    return this.http.post<Livro>(this.url, livro);
  }

  // rota para excluir um livro
  excluir(id: number){
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  // rota pro put
  editar(livro: Livro){
    return this.http.put<Livro>(`${this.url}/${livro.id}`, livro);
  }
}