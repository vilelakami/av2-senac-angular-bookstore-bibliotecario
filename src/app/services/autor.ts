import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Autor } from '../models/autor';

@Injectable({ providedIn: 'root' })
export class AutorService {
  private http = inject(HttpClient);
  private url = 'http://localhost:3000/autores';

  listar() {
    // o angular vai fazer uma requisição para o backend e vai retornar uma lista de autores
    return this.http.get<Autor[]>(this.url);
  }

  // rota create para fazre um post no backend
  criar(autor: Autor) {
    return this.http.post<Autor>(this.url, autor);
  }

  // rota para excluir um autor
  excluir(id: number){
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  // rota pro put
  editar(autor: Autor){
    return this.http.put<Autor>(`${this.url}/${autor.id}`, autor);
  }
}