import { Component, inject, OnInit, signal } from '@angular/core';
import { LivroService } from '../../services/livro';
import { Livro } from '../../models/livro';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule],
  selector: 'app-livros',
  styleUrl: './livros.css',
  templateUrl: './livros.html',
})
export class Livros implements OnInit {
  private livroService = inject(LivroService);
  livros = signal<Livro[]>([]);
  novoLivro: Livro = { titulo: '', autor: '', ano: 0, imagem: '' };

  // chamando a rota listar do livroService e atribuindo o resultado a livros e mostrando na tela com nginit
  ngOnInit() {
    this.livroService.listar().subscribe(dados => {
      this.livros.set(dados);
    });
  }

  // método salvar que chama a rota criar do livroService e atribuindo o resultado a livros e mostrando na tela com nginit
  salvar() {
    if (this.novoLivro._id) {
      // se eu receber um _id novo ao editar um livro, então eu chamo a rota editar do livroService e atribuindo o resultado a livros e mostrando na tela com nginit
      this.livroService.editar(this.novoLivro).subscribe(livroEditado => {
        this.livros.set(this.livros().map(l => l._id === livroEditado._id ? livroEditado : l));
        this.novoLivro = { titulo: '', autor: '', ano: 0, imagem: ''};
      });
    } else {
      // se eu não receber um _id novo ao criar um livro, então eu chamo a rota criar do livroService e atribuindo o resultado a livros e mostrando na tela com nginit
      this.livroService.criar(this.novoLivro).subscribe(livro => {
        this.livros.set([...this.livros(), livro]);
        this.novoLivro = { titulo: '', autor: '', ano: 0, imagem: ''};
      });
    }
  }

  // metodo excluir que chama a rota excluir do livroService e atribuindo o resultado a livros e mostrando na tela com nginit
  excluir(id: string) {
    this.livroService.excluir(id).subscribe(() => {
      this.livros.set(this.livros().filter(l => l._id !== id));
    });
  }

  // metodo editar que chama a rota editar do livroService e atribuindo o resultado a livros e mostrando na tela com nginit
  preencherFormulario(livro: Livro){
    this.novoLivro = { ...livro };
  }
}
