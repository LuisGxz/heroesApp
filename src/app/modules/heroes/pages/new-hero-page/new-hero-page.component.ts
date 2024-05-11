import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


import { HeroesService } from '../../services/heroes.service';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { switchMap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';


import { imageUrlValidator } from '../../validations/imageUrlValidator';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-new-hero-page',
  templateUrl: './new-hero-page.component.html',
  styleUrls: ['./new-hero-page.component.scss']
})
export class NewHeroPageComponent implements OnInit {

  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    if (!this.router.url.includes('edit')) return;

    this.activatedRoute.params.pipe(
      switchMap(({ id }) => this.heroesService.getHeroById(id)),
    ).subscribe(hero => {
      if (!hero) return this.router.navigateByUrl('/heroes');
      this.heroForm.reset(hero);
      return;
    })
  }

  public heroForm = new FormGroup({
    id: new FormControl<string>(''),
    superhero: new FormControl<string>('', [Validators.required]),
    publisher: new FormControl<Publisher>(Publisher.DCComics, [Validators.required]),
    alter_ego: new FormControl('', [Validators.required]),
    first_appearance: new FormControl('', [Validators.required]),
    characters: new FormControl('', [Validators.required]),
    alt_img: new FormControl('', [Validators.required, imageUrlValidator()]),
  });


  public publishers = [
    {
      id: 'DC Comics',
      description: 'DC Comics'
    },
    {
      id: 'Marvel Comics',
      description: 'Marvel Comics'
    }
  ]

  get currentHero(): Hero {
    const hero = this.heroForm.value as Hero;

    return hero;
  }

  onSubmit(): void {
    if (this.heroForm.invalid) {
      this.showSnackbar('Form is invalid');
      return;
    };

    if (this.currentHero.id === '') {
      this.heroesService.addHero(this.currentHero)
        .subscribe(hero => {
          this.showSnackbar('Hero added successfully');
          this.router.navigateByUrl('/heroes/list');
        });

      return;
    }

    this.heroesService.updateHero(this.currentHero)
      .subscribe(hero => {
        this.showSnackbar('Hero updated successfully');
        this.router.navigateByUrl('/heroes/list');
      });

  }

  onConfirmDelete(): void {
    if (!this.currentHero.id) throw new Error('Hero id is required to delete a hero');

    Swal.fire({
      title: 'Are you sure?',
      text: `You are about to delete the Hero: ${this.currentHero.superhero}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.heroesService.deleteHeroById(this.currentHero.id)
          .subscribe(resp => {
            if (resp) {
              this.showSnackbar('Hero deleted successfully');
              this.router.navigateByUrl('/heroes/list');
            } else {
              this.showSnackbar('Error deleting hero');
            }
          });
      }
    });

  }


  showSnackbar(message: string): void {
    this.snackbar.open(message, 'Close', {
      duration: 2500
    });
  }


}