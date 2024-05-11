import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'heroes-hero-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit{


  ngOnInit(): void {
    if(!this.hero) throw new Error('Hero is required');
  }

  @Input()
  public hero!: Hero;

}
