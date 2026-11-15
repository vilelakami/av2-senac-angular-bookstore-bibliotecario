import { Component } from '@angular/core';
// importando componenete reutilizavel
import { Cartao } from '../../components/cartao/cartao';
import { RouterLink } from '@angular/router';
// importando componentes do material design para usá-los
import { MatButtonModule } from '@angular/material/button';

@Component({
  imports: [Cartao, RouterLink, MatButtonModule], //passando pro componente
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {}
