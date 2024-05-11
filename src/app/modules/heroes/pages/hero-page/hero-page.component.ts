import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { Hero } from '../../interfaces/hero.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, switchMap } from 'rxjs';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styleUrls: ['./hero-page.component.scss']
})
export class HeroPageComponent implements OnInit  {

  public hero?: Hero;

  constructor(
    private heroesServices: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.activatedRoute.params
    .pipe(
      // delay(500),
      switchMap( ({id}) => this.heroesServices.getHeroById(id) )
    ).subscribe( hero => {
      if(!hero) return this.router.navigateByUrl('/heroes/list');

      this.hero = hero;
      return;

    })

  }

  goBack(): void {
    this.router.navigateByUrl('/heroes/list');
  }

}
