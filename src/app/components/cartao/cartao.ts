import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card'; //importando o modulo do card do material design

@Component({
  imports: [MatCardModule], //passando pro componente
  selector: 'app-cartao',
  styleUrl: './cartao.css',
  templateUrl: './cartao.html',
})
export class Cartao {}
