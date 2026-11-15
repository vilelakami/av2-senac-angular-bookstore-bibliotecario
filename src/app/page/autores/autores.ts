import { Component, inject, OnInit, signal } from '@angular/core'; // esse 'signal' é usado para persistir os dados na tela sem precisar dar f5
import { AutorService } from '../../services/autor';
import { Autor } from '../../models/autor';
import { FormsModule } from '@angular/forms';
// importnando componente reutilizavel
import { Cartao } from '../../components/cartao/cartao';
// importando componentes do material design para usá-los
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  imports: [FormsModule, Cartao, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule],
  selector: 'app-autores',
  styleUrl: './autores.css',
  templateUrl: './autores.html',
})
export class Autores implements OnInit {
  private autorService = inject(AutorService);
  autores = signal<Autor[]>([]);
  novoAutor: Autor = { nome: '', nacionalidade: '', anoNascimento: 0, imagem: '' };

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
        this.novoAutor = { nome: '', nacionalidade: '', anoNascimento: 0, imagem: '' };
      });
    } else {
      // se eu não receber um id novo ao criar um autor, então eu chamo a rota criar do autorService e atribuindo o resultado a autores e mostrando na tela com nginit
      this.autorService.criar(this.novoAutor).subscribe(autor => {
        this.autores.set([...this.autores(), autor]);
        this.novoAutor = { nome: '', nacionalidade: '', anoNascimento: 0, imagem: '' };
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
