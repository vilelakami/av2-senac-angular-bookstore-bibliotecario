import { Component, inject, OnInit } from '@angular/core';
import { AutorService } from '../../services/autor';
import { Autor } from '../../models/autor';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule],
  selector: 'app-autores',
  styleUrl: './autores.css',
  templateUrl: './autores.html',
})
export class Autores implements OnInit {
  private autorService = inject(AutorService);
  autores: Autor[] = [];
  novoAutor: Autor = { nome: '', nacionalidade: '', anoNascimento: 0 };

// chamando a rota listar do autorService e atribuindo o resultado a autores e mostrando na tela com nginit
  ngOnInit() {
    this.autorService.listar().subscribe(dados => {
      this.autores = dados;
    });
  }

  // método salvar que chama a rota criar do autorService e atribuindo o resultado a autores e mostrando na tela com nginit
  salvar() {
    if (this.novoAutor.id) {
      // se eu receber um id novo ao editar um autor, então eu chamo a rota editar do autorService e atribuindo o resultado a autores e mostrando na tela com nginit
      this.autorService.editar(this.novoAutor).subscribe(autorEditado => {
        this.autores = this.autores.map(l => l.id === autorEditado.id ? autorEditado : l);
        this.novoAutor = { nome: '', nacionalidade: '', anoNascimento: 0 };
      });
    } else {
      // se eu não receber um id novo ao criar um autor, então eu chamo a rota criar do autorService e atribuindo o resultado a autores e mostrando na tela com nginit
      this.autorService.criar(this.novoAutor).subscribe(autor => {
        this.autores = [...this.autores, autor];
        this.novoAutor = { nome: '', nacionalidade: '', anoNascimento: 0 };
      });
    }
  }

  // metodo excluir que chama a rota excluir do autorService e atribuindo o resultado a autores e mostrando na tela com nginit
  excluir(id: number){
    this.autorService.excluir(id).subscribe(() => {
      this.autores = this.autores.filter(autor => autor.id !== id);
    });
  }

  // metodo editar que chama a rota editar do autorService e atribuindo o resultado a autores e mostrando na tela com nginit
  preencherFormulario(autor: Autor){
    this.novoAutor = { ...autor };
  }
}
