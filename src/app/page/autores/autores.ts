import { Component, inject, OnInit, signal } from '@angular/core';
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
  autores = signal<Autor[]>([]);
  novoAutor: Autor = { nome: '', nacionalidade: '', anoNascimento: 0 };

// chamando a rota listar do autorService e atribuindo o resultado a autores e mostrando na tela com nginit
  ngOnInit() {
    this.autorService.listar().subscribe(dados => {
      this.autores.set(dados);
    });
  }

  // método salvar que chama a rota criar do autorService e atribuindo o resultado a autores e mostrando na tela com nginit
  salvar() {
    if (this.novoAutor._id) {
      // se eu receber um id novo ao editar um autor, então eu chamo a rota editar do autorService e atribuindo o resultado a autores e mostrando na tela com nginit
      this.autorService.editar(this.novoAutor).subscribe(autorEditado => {
        this.autores.set(this.autores().map(a => a._id === autorEditado._id ? autorEditado : a));
        this.novoAutor = { nome: '', nacionalidade: '', anoNascimento: 0 };
      });
    } else {
      // se eu não receber um id novo ao criar um autor, então eu chamo a rota criar do autorService e atribuindo o resultado a autores e mostrando na tela com nginit
      this.autorService.criar(this.novoAutor).subscribe(autor => {
        this.autores.set([...this.autores(), autor]);
        this.novoAutor = { nome: '', nacionalidade: '', anoNascimento: 0 };
      });
    }
  }

  // metodo excluir que chama a rota excluir do autorService e atribuindo o resultado a autores e mostrando na tela com nginit
  excluir(id: string){
    this.autorService.excluir(id).subscribe(() => {
      this.autores.set(this.autores().filter(autor => autor._id !== id));
    });
  }

  // metodo editar que chama a rota editar do autorService e atribuindo o resultado a autores e mostrando na tela com nginit
  preencherFormulario(autor: Autor){
    this.novoAutor = { ...autor };
  }
}
