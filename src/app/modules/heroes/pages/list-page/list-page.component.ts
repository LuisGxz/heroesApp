import { Component, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss']
})
export class ListPageComponent implements OnInit {

  public heroes: Hero[] = [];

  constructor(private heroesService: HeroesService){
    
  }
  ngOnInit(): void {
    this.heroesService.getHeroes()
    .subscribe(resp => {
      this.heroes = resp;

      console.log(this.heroes);
    });
  }

}
